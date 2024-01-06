const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Dmytro:zCK1EBuXxgOdlX1L@cluster0.o4hocu8.mongodb.net/books_reader?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connect success"))
  .catch((error) => console.log(error.message));
