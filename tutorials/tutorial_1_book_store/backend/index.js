import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { PORT, mongoURL } from "./config.js"
import router from "./routes/routes.js"

const app = express()

// parse json middleware
app.use(express.json())
app.use(cors())
app.use("/books", router)

// start server
app.listen(PORT, () => {
   console.log(`Server started listening at http://localhost:${PORT}`);
})

// connect to database
mongoose
   .connect(mongoURL)
   .then(() => {
      console.log("Connected to database successfully.")
   })
   .catch(error => {
      console.error(`Error connecting to database: ${error}`);
   })