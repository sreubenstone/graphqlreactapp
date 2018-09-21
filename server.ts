import express = require("express");
import cors = require("cors");
require("dotenv").config();
import graphqlHTTP = require("express-graphql");
import schema from "./schema/schema";
import passport from "passport";
import FacebookStrategy from "passport-facebook";
import { appendFile } from "fs";
import models = require("./models/index.js");
import * as session from "express-session";
const knexConfig = require("./db/knex");
const knex = require("knex")(knexConfig);
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');


const server = express();
server.use(cors());

// set up session cookies
server.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

// initialize passport
server.use(passport.initialize());
server.use(passport.session());

// // set view engine
// server.set('view engine', 'ejs');

// set up routes
server.use('/auth', authRoutes);

// create home route
server.get('/', (req, res) => {
  res.send('home');
});



// Binding express with graphql

server.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

server.listen(process.env.PORT, () => {
  console.log("express is listening for requests on port 4000");
});
