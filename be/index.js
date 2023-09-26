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

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use("/uploads", express.static("./uploads"));  // upload folder should be in is in root directory of backed folder
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // upload folder should be in is in root directory of backed folder
mongoose.set('strictQuery', false);


// main().catch((err) => console.log(err));
try {
  await mongoose.connect(process.env.MONGOOSE_CONNECTION_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB Atlas");
} catch (error) {
  console.error("Error connecting to MongoDB Atlas:", error);
}


const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "https://facebook-colne-theta.vercel.app",
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
httpServer.listen(PORT, () => {
  console.log(`Server started on :${PORT}`);
});