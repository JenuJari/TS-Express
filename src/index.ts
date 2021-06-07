require('dotenv').config();
require('source-map-support').install();
process.on('unhandledRejection', console.log);

import express from "express";
import * as bodyParser from "body-parser";
import createError from "http-errors";

import dbConn from "./db";
import {getUserFromToken} from "./repo/auth";

/* routes imports */
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import webRoot from "./routes/webRoot";

const app = express();
const port = 5000;

/* initial configs */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/apis', async (req, res, next) => {
  try {
    let user = await getUserFromToken(req.headers.authorization);
    if (user && user.id) {
      app.set("user",user);
      next();
    }
  } catch (e) {
    return createError(503,e.message);
  }
});


app.use('/', webRoot);
app.use('/api/auth', authRouter);
app.use('/apis/user', userRouter);

/* unhandled routes */
app.use(function (_, __, next) {
  next(createError(404));
});

app.listen(port, async () => {
  // await dbConn.testConn();
  // await dbConn.getConnection().sync();
  console.log(`Example app listening at http://localhost:${port}`)
});
