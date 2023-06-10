const mongoose = require("mongoose");
const { config } = require("./config");

const connection = mongoose.connect(config.mongoURL);

module.exports = { connection };
