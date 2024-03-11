import express from "express";
import { logIn, signUp } from "../controllers/User";
import { encrypt } from "../middleware";

const user = express.Router();

user.route("/signUp").post(encrypt, signUp);
user.route("/logIn").post(logIn)

export { user }