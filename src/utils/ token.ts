import jwt from "jsonwebtoken";
import config from "../../config/config";
const generateToken = (id: string, userName: string): string => {
  return jwt.sign({ id, userName }, config.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export { generateToken };
