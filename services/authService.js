import { registerSchema, loginSchema } from "../validation/schemas/authSchema";
import Organization from "../model/Organization";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validateOrThrow } from "../validation/validationHelper";

export async function registerService(info) {
  const value = validateOrThrow(registerSchema, info);

  const {
    name,
    email,
    phoneNo,
    password,
    categoriesHandled,
    statesCovered,
  } = value;
  try {
    const existingUser = await Organization.findOne({ email });

    if (existingUser) {
      const error = new Error(`User with email: ${email} already exists`);
      error.statusCode = 400;
      throw error;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const org = await Organization.create({
      name,
      email,
      phoneNo,
      passwordHash: hashedPassword,
      categoriesHandled: categoriesHandled,
      statesCovered: statesCovered,
    });
    return org;
  } catch (error) {
    throw error;
  }
}

export async function loginService(info) {
  const value = validateOrThrow(loginSchema, info);

  const {email, password } = value;
  try {
    const existingOrg = await Organization.findOne({ email });
    if (!existingOrg) {
      const error = new Error(`User with email: ${email} doesn't exist`);
      error.statusCode = 404;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, existingOrg.passwordHash);
    if (!isMatch) {
      const error = new Error(`Invalid login credentials - password`);
      error.statusCode = 401;
      throw error;
    }

    const payload = {
      orgId: existingOrg._id,
      name: existingOrg.name,
      email: existingOrg.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    
    return { token, payload };
  } catch (error) {
    throw error;
  }
}

