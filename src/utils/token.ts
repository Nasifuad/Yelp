import jwt from "jsonwebtoken";
import config from "../../config/config";
const generateToken = (userName: string): string => {
  return jwt.sign({ userName }, config.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export { generateToken };
