var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/itunes_app");

module.exports.Book = require("./user");