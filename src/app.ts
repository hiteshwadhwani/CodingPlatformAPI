import express, {Express} from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";


//Import Routes
import api from "./api/index"

// Import middelwares


// access environment variables
dotenv.config();

//initialize app with express
const app: Express | undefined = express();

//Load app middelware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());

// Serve all static files inside public directory
app.use("/static", express.static("public"));

// app.use(logRequestData)

//Routes handeling the request
app.use("/", api);
// app.use()
// app.use(errorHandlerMiddelware)

export default app;