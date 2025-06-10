import { app } from "./app.js";
import dotenv from "dotenv";
import dbConnection from "./db/index.js";
const port = process.env.PORT || 4000;



dotenv.config({
  path: './.env',
})

dbConnection()
.then(() => {
  app.listen(port, () => console.log(`Server running on port ${port}`));
})
.catch(err => console.error(err));