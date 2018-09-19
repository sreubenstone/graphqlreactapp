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

const server = express();
server.use(cors());

passport.use(
  new FacebookStrategy(
    {
      clientID: "450892708651366",
      clientSecret: "43cede2cdbd7438b663ab04d1251ee01",
      callbackURL: "https://4ee85af9.ngrok.io/auth/facebook/callback"
    },

    async (accessToken, refreshToken, profile, cb) => {
      const { id, displayName } = profile;

      const fbUsers = await models.FbAuth.findAll({
        limit: 1,
        where: { fb_id: id }
      });

      console.log(fbUsers);
      console.log(profile);

      if (!fbUsers.length) {
        const user = await models.FbAuth.create();
        await models.FbAuth.create({
          fb_id: id,
          display_name: displayName,
          user_id: user.id
        });
      }

      cb(null, {});
    }
  )
);

server.use(passport.initialize());

server.get("/auth/facebook", passport.authenticate("facebook"));

server.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
    res.send("Auth good boy");
  }
);

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
