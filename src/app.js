"use strict";
const express = require("express");
const app = express();
const helmet = require("helmet");
const connectDB = require("./config/db");
require("dotenv").config();  
const PORT = process.env.PORT;

const cors = require("cors");
const morgan = require('morgan');
const router = express.Router();


const path = require('path');
const fs = require('fs');

connectDB();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet()); 
app.use(morgan("common"));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', router);

//Dynamic Route Path
const routesPath = path.join(__dirname, '/routes');
const routeFiles = fs.readdirSync(routesPath);

routeFiles.forEach((routeFile) => {
  if (routeFile !== 'index.js' && routeFile.endsWith('.js')) {
    const routeModule = require(path.join(routesPath, routeFile));
    routeModule(router); 
  }
});



app.get("/api/health", (req, res) => {
  try {
    res.json({ status: 1, msg: "BookKeeping Service Running.." });
  } catch (error) {
    res.status(403).json({ error: "error occured", message: error });
  }
});

app.get("*", function (req, res) {
  res.status(404).send("Invalid URL..");
});

app.listen(PORT, function () {
  console.log(`Server running on port ${PORT}`);
});