import express from 'express';
import dotenv from 'dotenv';
dotenv.config();  
import { connect } from 'mongoose';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import shopRouter from './routes/shop.routes.js';
import itemRouter from './routes/item.routes.js';
import orderRouter from './routes/order.routes.js';


import http from 'http'
import { Server } from 'socket.io';
import { socketHandler } from './socket.js';
 const app = express();
// Ensure Express respects X-Forwarded-* headers (Render/Heroku/NGINX)
app.set('trust proxy', 1);
const server = http.createServer(app)



const io = new Server(server,{
    cors:{
      origin:[
        "https://campus-food-sonu-hfgk.onrender.com",
        "https://campus-food-sonu-hfgk.netlify.app",
        "http://localhost:5173",
      ],
      credentials:true,
      methods:['GET','POST','PUT','PATCH','DELETE','OPTIONS']
    }
})



app.set("io",io)

const port = process.env.PORT || 5000;
const corsOptions = {
  origin: [
    "https://campus-food-sonu-hfgk.onrender.com",
    "https://campus-food-sonu-hfgk.netlify.app",
    "http://localhost:5173",
  ],
  credentials: true,
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
};
app.use(cors(corsOptions))
// Ensure preflight for all routes
app.options('*', cors(corsOptions))

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/shop', shopRouter);
app.use('/api/item', itemRouter);
app.use('/api/order', orderRouter);

socketHandler(io)
server.listen(port,()=>{
    connectDB();
    console.log(`Server is running on port ${port}`);
})
