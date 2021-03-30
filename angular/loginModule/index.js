const express = require("express");
const bodyParse = require("body-parser");
const dbConnection = require("./connection/db");

const path = require("path");

const cors = require("cors");

dbConnection.authenticate()
.then(()=>{
    console.log("connection has been established Sucessfully");
}).catch((err)=> console.error("unable to connect database", err))


const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "public")))

app.use(bodyParse.json())

app.use(bodyParse.urlencoded({
    extended:true
}))

app.use("/api/user", require("./api/user"));

app.get("/*",(req,res) => res.sendFile(path.join(__dirname, "public/index.html")))

app.listen(process.eventNames.PORT || 3000, () => console.log("Server is UP"))