import express from "express";
import { getHealth, getPrivate, postHealth } from "./controllers/health.js";
import logger from "./middleware/logger.js";
import isVerifiesUser from "./middleware/isVerifiedUser.js";

const app = express();
const PORT = 8080;

// middleware to parse incoming request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.get("/health", getHealth);
app.post("/health", postHealth);
app.get("/private", isVerifiesUser, getPrivate);

app.listen(PORT, () => {
  console.log(`Server is running onn port ${PORT}`);
});
