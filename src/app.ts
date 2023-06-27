import express  from "express";
import routes from "./routes/index"
const cors = require('cors'); 
require('dotenv').config();

const app = express();

app.use(express.json());

const connectDB = require('./config/dbConect');

routes(app);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.DB_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();