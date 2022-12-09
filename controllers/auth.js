import { Auth, Shops, Customers  } from "shopify-admin-api";
import config from "../config/config.js";
import sqlite3  from 'sqlite3';

const shopDomain        = config.shopDomain;
const shopAccessToken   = config.shopAccessToken;

export const isValidDomain = async (req, res, next) => {
  try {
    const domain = req.query.domain; 
    const isValidUrl = await Auth.isValidShopifyDomain(domain)

    let shops = null;

    const service = new Shops(shopDomain, shopAccessToken);
    if ( isValidUrl ) shops = await service.get();

    res.json({ 
      status      : 1,
      msg         : "check Shopify domain validation", 
      isValidUrl  : isValidUrl,
      shops       : shops
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const signinUser = async (req, res, next) => {
  try {
    const email     = req.query.email; 
    const password  = req.query.password;      
    
    const service = new Customers(shopDomain, shopAccessToken);
    const customers = await service.list( { email: email } );

    if ( customers.length < 1 ) {
      res.json({ 
        status    : 0,
        msg       : "invalid email", 
      });
    } else {
      if ( customers[0]["email"] != email ) {
        res.json({ 
          status    : 0,
          msg       : "invalid email", 
        });
        return;
      }

      let db = new sqlite3.Database('./db/pickpack.db');    
      let sql = `SELECT * FROM pp_users WHERE email= ? `;
      db.all(sql, [email], (err, rows) => {
        if (err) { throw err; }
        if ( rows.length < 1 ) {
          res.json({ 
            status    : 1,
            msg       : "Not register to database", 
          });
        } else {
          let dpassword = rows[0]["password"];
          let full_name = rows[0]["full_name"];
          if ( dpassword != password ) {
            res.json({ 
              status    : 2,
              msg       : "Invalid password", 
            });
          } else {
            res.json({ 
              status    : 3,
              full_name : full_name, 
              msg       : "Success to login", 
            });
          }          
        }  
      });
      db.close();    
    } 
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    // open the database
    let db = new sqlite3.Database('./db/pickpack.db');
    
    let sql = `SELECT * FROM pp_users`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      res.json({
        msg: "get all users list",
        users: rows
      });

    });
    // close the database connection
    db.close();    
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const isUser = async (req, res, next) => {
  const email = req.query.email; 

  try {
    // open the database
    let db = new sqlite3.Database('./db/pickpack.db');
    
    let sql = `SELECT * FROM pp_users WHERE email=?`;
    db.all(sql, [email], (err, rows) => {
      if (err) {
        throw err;
      }

      if ( rows.length > 0 ) {
        res.json({
          state: 1,
          user: rows[0]
        });
      } else {
        res.json({
          state: 0,
          email: email
        });
      }     

    });
    // close the database connection
    db.close();    
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const addUser = async (req, res, next) => {
  const full_name = req.body.full_name; 
  const email = req.body.email; 
  const password = req.body.password; 

  if ( email == "" || password == "" ) {
    res.json({
      state: 0,
      msg: "Can't empty email or password"
    });
    return;
  }

  try {
    // open the database
    let db = new sqlite3.Database('./db/pickpack.db');
    
    let sql = `SELECT * FROM pp_users WHERE email=?`;
    db.all(sql, [email], (err, rows) => {
      if (err) {
        throw err;
      }

      if ( rows.length > 0 ) {
        res.json({
          state: 0,
          msg: "Exist email already"
        });
      } else {
        sql = `INSERT INTO pp_users (full_name, email, password) VALUES (?, ?, ?)`;
        db.all(sql, [full_name, email, password], (err, rows) => {
          if (err) {
            throw err;
          }
          res.json({
            state: 1,
            msg: "Added successfully"
          });   
        });
      }     

    });    
    // close the database connection
    db.close();    
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateUserPassword = async (req, res, next) => {
  const email = req.body.email; 
  const password = req.body.password; 

  if ( email === "" || password === "" ) {
    res.json({
      state: 0,
      msg: "Can't empty email or password"
    });
    return;
  }

  try {
    let db = new sqlite3.Database('./db/pickpack.db');
    
    let sql = `SELECT * FROM pp_users WHERE email= ? `;
    db.all(sql, [email], (err, rows) => {
      if (err) {
        throw err;
      }

      if ( rows.length < 1 ) {
        res.json({
          state: 0,
          msg: "Invalid email address"
        });
      } else {
        sql = `UPDATE pp_users SET password= ? WHERE email= ? `;
        db.all(sql, [password, email], (err, rows) => {
          if (err) {
            throw err;
          }
          res.json({
            state: 1,
            rows: sql, 
            msg: "Updated password"
          });   
        });
      }     
    });    
    // close the database connection
    db.close();    
  } catch (error) {
    console.log(error);
    next(error);
  }
};



