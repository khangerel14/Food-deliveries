import { Request, Response } from "express";
import { UserModel } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req: Request, res: Response) => {
  try {
    await UserModel.create(req.body);
    return res.status(201).send({ success: true })
  } catch (error) {
    return res.status(500).send(error)
  }
}

export const logIn = async (req: Request, res: Response) => {
  try {
    const { useremail, password } = req.body;
    const user = await UserModel.findOne({ useremail }).select("+password");

    if (!user) {
      return res.status(404).send({ msg: "user not found" });
    }

    const isValid = bcrypt.compareSync(password, user.password as string);

    if (!isValid) {
      return res.status(400).send({ msg: "Email or password incorrect" });
    }
    const token = jwt.sign({ user }, "MY_SECRET_KEY");
    res.status(200).send({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error)
  }
};
