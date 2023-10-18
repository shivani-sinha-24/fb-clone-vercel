import * as dotenv from 'dotenv'
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import fileUpload from 'express-fileupload';
import * as path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js';
import conversationRoutes from './routes/conversation.js';
import messagesRoutes from './routes/messages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const absolutePath = path.resolve(__dirname, "..", "uploads");

mongoose.set('strictQuery', false);
const app = express();
app.use(fileUpload())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use("/uploads", express.static("./uploads"));  // upload folder should be in is in root directory of backed folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 

const conf = () => {
  // mongoose.connect(process.env.MONGOOSE_CONNECTION_LINK);
  mongoose.connect('mongodb+srv://shivanisinha24dec:dhuXRUNhkFjcUjkd@cluster0.e4bpyej.mongodb.net/?retryWrites=true&w=majority');  // mongoose connection link
  const db= mongoose.connection;
  db.on('error',console.error.bind('Unable to connect to the database'));
  db.once("open",function calback(){
      console.log("Connection has been established successfully!!");
  })
}
conf()

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST","PUT", "PATCH", "DELETE"],
    preflightContinue:true,
    credentials:true,
    optionsSuccessStatus: 204
  }
});

io.on("connection", (socket) => {

  socket.on("joinRoom",room => {
		socket.join(room)
  })

  socket.on("newMessage", ({newMsgObj, room}) => {
    io.in(room).emit("getLatestMessage", newMsgObj)
  })

});
app.use("/home",(req,res)=>{res.send("Hello")})
app.use("/user",userRoutes);
app.use("/post",postRoutes);
app.use("/conversation",conversationRoutes);
app.use("/message",messagesRoutes);

// const HOST = 'https://trial2-api.vercel.app';
const PORT = process.env.PORT || 3009;
// httpServer.listen(PORT, HOST, () => {
httpServer.listen(3009, () => {
  console.log(`Server started on :3009`);
});