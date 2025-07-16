import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
//Database
import connectDB from './config/db.js';
//Routes 
import userRoutes from './routes/userRoute.js';
import todoRoutes from './routes/todoRoute.js';

//dot env config
dotenv.config();
//DB connection
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


//base route
app.get('/', (req, res) => {
  res.send('API is running...');
});


//routes of the backend
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
