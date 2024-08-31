import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
 
interface CustomRequest extends Request {
  id?: string;
}

 
const authGuard = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  try {
    if (!token)
      return res.status(401).json({ message: "Token not found", logout: true });

    const decoded = jwt.verify(token, process.env.JWT_KEY!) as jwt.JwtPayload;
    if (!decoded) {
      return res.status(401).json({ message: "Token invalid", logout: true });
    }

    req.id = decoded.id;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error", error: true });
  }
};



export default authGuard;
