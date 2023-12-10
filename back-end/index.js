require("dotenv").config({ path: "./.env" });

const express = require("express");
const routes = require("./routes");
const { dbInit } = require("./config/db");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const app = express();

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);

app.use(mongoSanitize());

app.use(xss());

app.get("/api/ping", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.use(cors());
app.use(express.json());
app.use(routes);

dbInit();

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
