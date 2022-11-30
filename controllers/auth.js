
export const signinUser = async (req, res, next) => {
  try {
    res.json({msg: "Login Success"});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

