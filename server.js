import express from "express";
import mongoose from "mongoose";
import { urlShort, getOriginalUrl } from "./Controllers/url.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Ensure correct path

app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI, { dbName: "urlShort" }) // Use MongoDB Atlas
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.render("server.ejs", { shortUrl: null });
});

// Handle URL submission
app.post("/shorten", urlShort);

// Redirect to original URL using short URL
app.get("/:shortCode", getOriginalUrl);

export default app; // ✅ Required for Vercel deployment
