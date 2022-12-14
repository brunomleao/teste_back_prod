const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const { CustomError } = require("./utils/lib");
const errController = require("./controllers/errController");
const categoryRouter = require("./routers/categoryRouter");
const tagsRouter = require("./routers/tagsRouter");
const usersRouter = require("./routers/usersRouter");
////////////////////////////////////////////////////////////////////////

const app = express();

/**
 * general purpose middleware
 */
app.use(express.json()); // parses request body
app.use(cors());
if (process.env.NODE_ENV == "development") app.use(morgan("dev")); // http requests logger

/**
 * routers middleware
 */
app.use("/api/category", categoryRouter);
app.use("/api/tags", tagsRouter);
app.use("/api/users", usersRouter);
app.all("/*", (req, res, next) =>
  next(new CustomError(`Invalid path: ${req.originalUrl}`, 404))
);

/**
 * global error handling middleware
 */
app.use(errController);

module.exports = app;
