import express from "express";
import cors from "cors";
import messagesRouter from "./routes/api/v1/messages.js";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// connect to MongoDB
mongoose.connect(process.env.MONGODB);

app.use("/api/v1/messages", messagesRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
