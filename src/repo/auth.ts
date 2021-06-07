import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

import User from "../models/user";

const cryptPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const comparePassword = (plainPass: string, hash: string): boolean => {
  const flag = bcrypt.compareSync(plainPass, hash);
  return flag;
};

export const getUserFromToken = async (token: string) => {
  const decoded = (await jwt.verify(token, process.env.JWT_SECRET)) as {
    expiry: string;
    uid: number;
  };
  if (!!decoded) {
    let expired = moment().diff(moment(decoded.expiry, "x"), "days") > 0;
    if (expired) {
      throw new Error("Auth token expired please renew it.");
    }
    let user = await User.findByPk(decoded.uid);
    if (user === null) throw new Error("Invalid Authorization token");
    return user;
  } else {
    throw new Error("Invalid Authorization token");
  }
};

type LoginArgs = {
  email: string;
  password: string;
};

export const login = async (data: LoginArgs) => {
  const user = await User.findOne({ where: { email: data.email } });
  console.log("🚀 ~ file: auth.ts ~ line 43 ~ login ~ user", user);
  if (user === null) throw new Error("User not found with provided email.");
  const isPasswordMatch = comparePassword(data.password, user.password);
  if (isPasswordMatch === false) throw new Error("Incorrect password.");

  const expiry = moment().add(process.env.TOKEN_EXPIRY, "days").format("x");
  const token = jwt.sign({ uid: user.id, expiry }, process.env.JWT_SECRET);

  return {
    user,
    token,
  };
};

type RegisterUserArgs = {
  password: string;
  firstName: string;
  lastName: string;
  email: string;
};

export const registerUser = async (data: RegisterUserArgs) => {
  const encPass = cryptPassword(data.password.toString());

  const [user, created] = await User.findOrCreate({
    where: { email: data.email },
    defaults: {
      first_name: data.firstName,
      last_name: data.lastName,
      type: "user",
    },
  });

  if (!created) {
    throw new Error(`User with ${data.email} email exist.`);
  }

  user.password = encPass;
  await user.save();

  const expiry = moment().add(process.env.TOKEN_EXPIRY, "day").format("x");
  const token = jwt.sign({ uid: user.id, expiry }, process.env.JWT_SECRET);
  return {
    user,
    token,
  };
};
