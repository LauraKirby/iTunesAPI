var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/itunes_app");

module.exports.User = require("./user");