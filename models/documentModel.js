const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_DB_URL)
.then(() => console.log("Database connected"))
.catch((err) => console.error(err))

const documentSchema = mongoose.Schema({
    _id: String,
    data: Object
}, {timestamps: true});

const documentModel = mongoose.model("docs", documentSchema);

module.exports  = documentModel;