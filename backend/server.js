import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app config 
const app = express();
const PORT = process.env.PORT || 3000;
connectDB()
connectCloudinary()

// middleware
app.use(express.json())
app.use(cors())

// api endpoints 
app.use('/api/admin',adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.get('/api/health',(req, res)=>{
    res.send('API WORKING')
})

// Graceful fallback when MongoDB is offline
app.use((err, req, res, next) => {
    if (err.name === 'MongooseError' || err.name === 'MongoNetworkError' || (err.message && err.message.includes('buffering timed out'))) {
        console.warn('[AI Studio] Database offline — returning mock empty response');
        if (req.method === 'GET') {
            return res.json(req.path.endsWith('s') || req.path.endsWith('s/') ? [] : {});
        }
        return res.status(503).json({ success: false, message: 'Service temporarily unavailable (database offline)' });
    }
    next(err);
});

// Serve Admin & Doctor Panel at /admin
const adminDistPath = path.resolve(__dirname, '../admin/dist');
app.use('/admin', express.static(adminDistPath));
app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(adminDistPath, 'index.html'));
});

// Serve Patient Frontend at /
const frontendDistPath = path.resolve(__dirname, '../frontend/dist');
app.use(express.static(frontendDistPath));
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDistPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => console.log("Server Started", PORT)) 

