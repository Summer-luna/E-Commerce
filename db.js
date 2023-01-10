const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOOSE_URI);

module.exports = mongoose;