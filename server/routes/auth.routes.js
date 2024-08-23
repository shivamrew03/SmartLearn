import express from "express";
import { teachersignup, teacherlogin, studentlogin, studentsignup, logout, test } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/studentsignup", (req, res) => {
    console.log("Signup route hit");
    studentsignup(req, res);
});

router.post("/studentlogin", (req, res) => {
    console.log("Login route hit");
    studentlogin(req, res);
});

router.post("/teachersignup", (req, res) => {
    console.log("Signup route hit");
    teachersignup(req, res);
});

router.post("/teacherlogin", (req, res) => {
    console.log("Login route hit");
    teacherlogin(req, res);
});

router.post("/logout", (req, res) => {
    console.log("Logout route hit");
    logout(req, res);
});

router.post("/test", (req, res) => {
    console.log("test route hit");
    test(req, res);
});

export default router;
