import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export class AuthService {
  async register(email, password) {
    // 1. Basic validation
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // 3. Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 4. Create the user
    const user = await User.create({
      email,
      passwordHash,
    });

    // 5. Return a safe user object (no passwordHash)
    return {
      id: user._id,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  // Login an existing user (we will fill this soon)
  async login(email, password) {
    // TODO: check user exists, compare password, return JWT
    return { message: "login() not implemented yet" };
  }

  // Generate a JWT token for a user
  generateToken(user) {
    // TODO: implement JWT creation
    return "token_not_implemented";
  }
}
