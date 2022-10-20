"use strict";
import express from 'express';
import morgan from 'morgan';
import { openDatabase } from './database.js';

import router from './router.js'
const app = express();
const port = 3002;

app.set("view engine", "pug");


// App middlewares
app.use(morgan("dev"));
app.use("/static", express.static("./static"));

// App routes
app.use("/", router);
app.use("/restos", router)

// App initialisation

// On attends d'être connecter à la base de données Mongo avant de servir la page
openDatabase().then((e) => {
  console.log("connected");
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
})
