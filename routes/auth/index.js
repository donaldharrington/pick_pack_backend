import express from "express";
import { 
    isValidDomain, 
    signinUser,
} from "../../controllers/auth.js";

const router = express.Router();
router.get("/is_valid_domain", isValidDomain);
router.post("/signin", signinUser);

export default router;