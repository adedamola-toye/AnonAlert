import jwt from "jsonwebtoken";

export async function verifyAnonChatToken(anonToken) {
  return new Promise((resolve, reject) => {
    jwt.verify(anonToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded);
    });
  });
}
