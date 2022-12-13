import express from "express";
import { 
    isValidDomain, 
    signinUser,
    getAllUsers,
    isUser,
    addUser,
    updateUserPassword
} from "../../controllers/auth.js";

const router = express.Router();  
router.get("/is_valid_domain", isValidDomain);  
router.get("/signin", signinUser);  
router.get("/get_all_users", getAllUsers); 
router.get("/is_user", isUser);
router.post("/add_user", addUser);
router.post("/update_user_password", updateUserPassword);

export default router;