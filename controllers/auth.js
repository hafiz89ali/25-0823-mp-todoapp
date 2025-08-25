import database from "../database/connection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function registerUser(req, res) {
  const insertUserSQL =
    "INSERT INTO users (username,email,password)VALUES($1,$2,$3) RETURNING id";
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  // Check all fields are present
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  //   Check password and confirmPassword match
  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  // Check valid email using regex
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email." });
  }

  // Convert password to hash using bcryptjs
  // genSaltSync(10) generates a random salt of 10 rounds
  // 10 rounds of 2^10 iterations
  // Every increment of the ropunds doubles the time it takes to hash the password
  // https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#bcrypt
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // After all the data are valid then insert user into database
  // Store the hashed password in the database
  try {
    const resDb = await database.query(insertUserSQL, [
      username,
      email,
      hashedPassword,
    ]);
    const userId = resDb.rows[0].id;
    const resData = {
      message: "User registered successfully",
      data: {
        userId: userId,
        username: username,
        email: email,
      },
    };
    return res.status(201).json(resData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function loginUser(req, res) {
  const selectUserSQL = "SELECT * FROM users WHERE email = $1";
  const email = req.body.email;
  const password = req.body.password;

  // Check all fields are present
  if (!email || !password) {
    return res.status(400).json({ error: "Invalid email." });
  }

  // Get user from database email
  try {
    const resDb = await database.query(selectUserSQL, [email]);
    if (resDb.rows.length === 0) {
      // ***Why are we not using not found error?
      // ***For sequrity reasons, we don't want to tell the user if the email is not found
      // ***We want to keep the error message generic and not give away any information
      return res.status(401).json({ error: "Invalid email or password." });
    }
    const user = resDb.rows[0];
    const dbPassword = user.password;

    // Compare the password with the hashed password in the database
    const isPasswordMatch = bcrypt.compareSync(password, dbPassword);

    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Create jwt token and send it to the user.
    // tokenData must not include password or any sensitive information
    // This is an encoded token which can be decoded by anyone
    const tokenData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET);

    const resData = {
      message: "Login successful",
      token: token,
    };
    return res.status(200).json(resData);
  } catch {
    error;
  }
  {
    return res.status(500).json({ error: error.message });
  }
}

const authController = {
  registerUser,
  loginUser,
};

export default authController;
