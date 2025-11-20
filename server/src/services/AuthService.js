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
    // 1. Basic validation
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // 2. Find the user
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    // 4. Generate JWT token
    const token = this.generateToken(user);

    // 5. Return user info + token
    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  }

  // Generate a JWT token for a user
  generateToken(user) {
    const payload = {
      id: user._id,
      email: user.email,
    };

    const secret = process.env.JWT_SECRET;

    return jwt.sign(payload, secret, {
      expiresIn: "7d", // token valid for 7 days
    });
  }
}
