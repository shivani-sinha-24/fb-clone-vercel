import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";

import userRoutes from './routes/user.js';
import postRoutes from './routes/post.js';
import conversationRoutes from './routes/conversation.js';
import messagesRoutes from './routes/messages.js';
import * as path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fileUpload from 'express-fileupload';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const absolutePath = path.resolve(__dirname, "..", "uploads");

mongoose.set('strictQuery', false);
const app = express();
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})

// app.use("/uploads", express.static("./uploads"));  // upload folder should be in is in root directory of backed folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // upload folder should be in is in root directory of backed folder

const conf = () => {
    
  //mongoose.connect('mongodb://localhost/admissionjockey');
  mongoose.connect(process.env.MONGOOSE_CONNECTION_LINK);
  // mongoose.connect('mongodb://localhost/edudb');
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
    // origin: "https://facebook-clone-gray-three.vercel.app",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE","HEAD"],
    preflightContinue:true,
    credentials:true,
    optionsSuccessStatus: 204
  },
  // allowEIO3:true,
});

io.on("connection", (socket) => {
  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  socket.on("newMessage", ({ newMsgObj, room }) => {
    if (newMsgObj) {
      // Log the received payload for debugging
      // console.log("Received new message:", newMsgObj);

      // Emit the message to the room
      io.in(room).emit("getLatestMessage", newMsgObj);
      
      // You can also save the message to your database here if needed
      // For example, if you have a MongoDB model for messages, you can save it.
    } else {
      // Handle invalid payload
      console.error("Invalid message payload:", newMsgObj);
      // You can also send an error message to the client if needed
      socket.emit("error", "Invalid message payload");
    }
  });

  // Add a generic error handler for the socket
  socket.on("error", (error) => {
    console.error("Socket error:", error);
  });
});
;

// io.on("connection", (socket) => {

//   socket.on("joinRoom",room => {
// 		socket.join(room)
//   })

//   socket.on("newMessage", ({newMsgObj, room}) => {
//     io.in(room).emit("getLatestMessage", newMsgObj)
//   })

// });

app.use("/user",userRoutes);
app.use("/post",postRoutes);
app.use("/conversation",conversationRoutes);
app.use("/message",messagesRoutes);

httpServer.listen(3009, () => {
  console.log("server started on port :3009");
});