const ShortBookingId = require("short-unique-id");
const CatchAsync = require("../utils/CatchAsync");
const Booking = require("../model/booking");
const AppError = require("../utils/AppError");
const { StatusCodes } = require("http-status-codes");

exports.bookIn = CatchAsync(async (req, res, next) => {
  const Booked = new Booking({
    firstname: req.body.firstname,
    middlename: req.body.middlename,
    lastname: req.body.lastname,
    phone: req.body.phone,
    bookDate: req.body.bookDate,
    age: req.body.age,
    email: req.body.email,
    Address: req.body.Address,
  });

  await Booked.save();
  res.status(StatusCodes.OK).json({
    ID: Booked.bookingId,
    Booked,
  });
});

exports.findAllBooking = CatchAsync(async (req, res, next) => {
  const currentUser = req.user;
  let queryObject = {};
  const { bookingId, firstname, middlename, lastname } = req.query;

  if (bookingId) queryObject.bookingId = { $regex: bookingId, $options: "i" };
  if (firstname) queryObject.firstname = { $regex: firstname, $options: "i" };
  if (middlename)
    queryObject.middlename = { $regex: middlename, $options: "i" };
  if (lastname) queryObject.lastname = { $regex: lastname, $options: "i" };

  if (currentUser.role === "reception" || currentUser.role === "admin") {
    const booking = Booking.find(queryObject);

    Book = await booking;

    res.status(StatusCodes.OK).json({
      status: "success",
      data: Book,
    });
  } else {
    return next(
      new AppError(
        "you have no permission to access Booking",
        StatusCodes.BAD_REQUEST
      )
    );
  }
});

exports.deleteBooking = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  const currentUser = req.user;

  if (currentUser.role === "reception" || currentUser.role === "admin") {
    const deletedBooking = await Booking.findByIdAndDelete(
      { _id: id },
      { new: true }
    );

    res.status(StatusCodes.OK).json({
      status: "success",
      deleted: deletedBooking,
    });
  } else {
    return next(
      new AppError(
        "you have no permission to access Booking",
        StatusCodes.BAD_REQUEST
      )
    );
  }
});

exports.getSigleBook = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  const currentUser = req.user;

  if (currentUser.role === "reception" || currentUser.role === "admin") {
    const book = await Booking.findById({ _id: id });

    res.status(StatusCodes.OK).json({
      status: "success",
      data: book,
    });
  } else {
    return next(
      new AppError(
        "you have no permission to access Booking",
        StatusCodes.BAD_REQUEST
      )
    );
  }
});
