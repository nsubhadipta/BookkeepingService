"use strict";
const express = require("express");
const app = express();
const path = require('path');
const fs = require('fs');
const cors = require("cors");
const morgan = require('morgan');
const helmet = require("helmet");
const connectDB = require("./config/db");
require("dotenv").config();  
const PORT = process.env.PORT;

const router = express.Router();

const i18n = require('./i18nConfig');

//i18n middleware
app.use(i18n.init);

// Middleware to set the locale for each request
app.use((req, res, next) => {
  const locale = req.headers['accept-language'] || req.query.lang || 'en';
  req.setLocale(locale);
//   console.log('Current locale:', req.getLocale());
  next();
});


connectDB();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

// Test MultiLanguage
app.get('/', (req, res) => {
    res.send(req.__('user_registered')); // Use req.__ to access translations
});

app.get("/api/health", (req, res) => {
  try {
    res.json({ status: 1, msg: "Bookkeeping Backend Server is Running! 🚀" });
  } catch (error) {
    res.status(403).json({ error: "error occured", message: error });
  }
});

app.get("*", function (req, res) {
  res.status(404).send("🛑 Invalid URL..⚠️🚫");
});

app.listen(PORT, function () {
  console.log(`💻 Server running on port ${PORT} 🎉`);
});