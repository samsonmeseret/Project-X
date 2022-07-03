const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const patientRouter = require("./route/patientRouter");
const bookingRouter = require("./route/bookingRouter");
const authRouter = require("./route/AuthRouter");
const expenseRouter = require("./route/expenseRouter");
const globalErrorHanddler = require("./middlewares/errorHanddler");
const notFound = require("./route/notFound");
const AppError = require("./utils/AppError");
const CatchAsync = require("./utils/CatchAsync");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const port = 4000 || process.env.PORT;
const app = express();

//Secure the Header
app.use(helmet());
app.use(cors());
//Limit the requsts from the same IP's....protections against {DDOS & brute forse attacts}
const Limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, Please try again in an hour",
});
app.use("/", Limiter);
app.use(express.json({ limit: "10kb" }));
//Data Sanitization against NoSQL query injections
app.use(mongoSanitize());

//Data Sanitizations aganist XSS attacs
app.use(xss());

//Prevent Parameter Polution

app.use(
  hpp({
    whitelist: [
      "expenseName",
      "approval",
      "sort",
      "bookingId",
      "firstname",
      "middlename",
      "lastname",
      "cardNumber",
      "sex",
      "field",
    ],
  })
);
app.use(authRouter);
app.use(bookingRouter);
app.use(patientRouter);
app.use(expenseRouter);

app.use(notFound);

app.use(globalErrorHanddler);

const start = CatchAsync(async (uri, port) => {
  await mongoose.connect(uri);
  console.log("Database connected Succesfully!");
  app.listen(port, console.log(`server running on port: ${port}`));
});

start(process.env.MONGO_URI, port);
