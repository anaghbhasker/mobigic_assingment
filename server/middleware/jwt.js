import jwt from "jsonwebtoken";

export async function generateAuthToken(user) {
    const jwtSecretKey = process.env.JWT_SECRET;
    const token = jwt.sign(
      { _id: user._id, username: user.username },
      jwtSecretKey
    );
    return token;
  }

  export async function verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const username = decoded.username;
      return username;
    } catch (err) {
      console.log(err.message);
    }
  }

  export async function verifyUserId(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded._id;
      return userId;
    } catch (err) {
      console.log(err.message);
    }
  }