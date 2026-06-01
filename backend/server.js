import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

import route1 from './routes/CandRoute.js'
import route2 from './routes/gradeRoute.js'
import SupRoute from './routes/SupRoutes.js'
import route3 from './routes/report.js'

import authRoutes from './routes/auth.js';

const app = express();
     app.use(express.json());
     app.use(bodyParser.json());
     app.use(cors());
     dotenv.config();

     app.use("/api", route1);
     app.use("/api", route2);
     app.use("/api", SupRoute);
     app.use("/api", route3);
     app.use("/api/auth", authRoutes);

     const PORT = process.env.PORT || 8796;
     const MONGO = process.env.MONGO;
mongoose.connect(MONGO).then(()=>{
    console.log("database connected successfully on:", MONGO);
    app.listen(PORT, ()=>{
        console.log("Server runs via port:", PORT);
    })
}).catch((error)=>{
    console.log("Failed to load database cons | server crashed:", error);
});     