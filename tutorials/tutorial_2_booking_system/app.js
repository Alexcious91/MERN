const express = require("express")
const bodyParser = require("body-parser")
const { graphqlHTTP } = require("express-graphql")
const mongoose = require("mongoose")
const graphQlSchema = require("./graphql/schemas/index")
const graphQlResolvers = require("./graphql/resolvers/index")
const isAuth = require("./middleware/isAuth")

const app = express()
const port = 5000;

require("dotenv").config({ path: ".env" })

app.use(bodyParser.json())

app.use(isAuth)

app.use("/graphql", graphqlHTTP({
   schema: graphQlSchema,
   rootValue: graphQlResolvers,
   graphiql: true
}));


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ku3juzi.mongodb.net/event-booking?retryWrites=true&w=majority&appName=${process.env.MONGO_APP_NAME}`)
   .then(() => {
      app.listen(port, () => {
         console.log(`Server started listening at http://localhost:${port}`)
      })
      console.log("Connected to database")
   })
   .catch(error => {
      console.log(`Error connecting to database: ${error}`)
   })
