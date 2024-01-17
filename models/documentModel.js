const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/Docforge")
.then(() => console.log("Database connected"))
.catch((err) => console.error(err))

const documentSchema = mongoose.Schema({
    _id: String,
    data: Object
}, {timestamps: true});

const documentModel = mongoose.model("docs", documentSchema);

module.exports  = documentModel;