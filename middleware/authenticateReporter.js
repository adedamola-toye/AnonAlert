/* import reporterService from "../services/reporterService";
//const REPORTER_COOKIE_NAME = 'reporterToken';

export async function authenticateReporter(req, res, next) {
  const token = req.cookies.AnonAlert_Reporter_Token;
  let reporterId;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized token" });
  }
  try {
    const decoded = await reporterService.verifyToken(token);
    reporterId = decoded.reporterId;
    req.reporterId = reporterId;
    next();
  } catch (error) {
    console.error(error);
    res.clearCookie('AnonAlert_Reporter_Token')
    return res.status(403).json({ 
            message: "Session expired or invalid. Please check your tracking ID manually." 
        });
  }
}
 */