import express from "express";
import { 
    signinUser,
} from "../../controllers/auth.js";

const router = express.Router();
router.post("/signin", signinUser);


export default router;