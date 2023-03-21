const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const app = express();
const mongoose = require("mongoose");

dotenv.config();
//mongoose.set("strictQuery", true)

//connect mongoose
mongoose.connect("mongodb://127.0.0.1:27017/store",
    {useNewUrlParser: true, useUnifiedTopology: true}
)
//middlewares
app.use(express.json());//body parser
app.use(morgan("common"));
app.use(helmet());
app.use("/api/auth", authRoute);



app.listen(8800,()=>{
    console.log("api is created");
})