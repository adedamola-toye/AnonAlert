import jwt from 'jsonwebtoken'
export async function generateAnonChatToken(reportId){
     const token = jwt.sign({reportId}, process.env.JWT_SECRET, {
          expiresIn: "30m",
        });
        return token
}