import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import shopRouter from './routes/shop.routes.js';
import itemRouter from './routes/item.routes.js';
import orderRouter from './routes/order.routes.js';

import http from 'http';
import { Server } from 'socket.io';
import { socketHandler } from './socket.js';

const app = express();
const server = http.createServer(app);

// 🔑 Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "https://campus-food-sonu-hfgk.onrender.com", // Frontend Render domain
    credentials: true,
    methods: ['POST', 'GET']
  }
});
app.set("io", io);

// 🔑 Middlewares
app.use(cors({
  origin: "https://campus-food-sonu-hfgk.onrender.com", // same domain
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// 🔑 Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/shop', shopRouter);
app.use('/api/item', itemRouter);
app.use('/api/order', orderRouter);

// 🔑 Socket Handler
socketHandler(io);

const port = process.env.PORT || 5000;

// ✅ Start Server only after DB connects
const startServer = async () => {
  try {
    await connectDB(); // pehle DB connect hoga
    server.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Server start failed:", error.message);
    process.exit(1); // exit if DB not connected
  }
};

startServer();
