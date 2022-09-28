const express = require("express")
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const routers = require("./Routes/studentRoutes")

app.use(express.json())

mongoose.connect(process.env.URI)
    .then(() => {
        app.listen((process.env.PORT), () => {
            console.log("Database Connected at port 3001")
        })
    })
    .catch((error) => {
        console.log("Connection to database failed", error)
    })


app.use('/project/', routers)