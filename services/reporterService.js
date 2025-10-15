//Service

import Reporter from "../model/Reporter";
import jwt from "jsonwebtoken";
require("dotenv").config();

export async function createReporter() {
  const newReporter = await Reporter.create({});
  const isNew = true;
  const payload = { reporterId: newReporter._id };

  //payload here is telling us the user the jwt token we are signing belongs to.
  const newToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1y",
  });
  return {
    reporterId: newReporter._id,
    newToken,
    isNew,
  };
}

export async function verifyToken(token) {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
}
