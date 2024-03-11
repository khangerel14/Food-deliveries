import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

async function hashPassword(password: string) {
  try {
    const SALT = 12;
    const salt = await bcrypt.genSalt(SALT);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err: any) {
    throw new Error(err.message);
  }
}

export const encrypt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;
  const hash = await hashPassword(password);

  req.body.password = hash;
  next();
};