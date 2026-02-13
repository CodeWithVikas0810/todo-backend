import express from "express"

import cors from "cors";
import {
    loginUser,
    SignupUser
} from "../controller/user.controller.js";



const router = express.Router();
router.use((req, res, next) => {
    console.log("Content-Type header:", req.headers['content-type']);
    console.log("Raw headers:", req.headers);
    next();
});



router.use(express.json())
router.use(cors())

router.post("/signup", SignupUser);
router.post("/login", loginUser)

router.post("/test", (req, res) => {
    console.log("Test endpoint hit");
    console.log("req.body:", req.body);
    res.json({ received: req.body });
});


export default router;