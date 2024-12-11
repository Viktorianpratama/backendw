import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import userRoutes from './routes/userRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js';
import roomsRoutes from './routes/roomsRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

dotenv.config();
const app = express();

// Validasi jika Supabase URL atau Key tidak tersedia
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_KEY in environment variables');
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
console.log('Supabase initialized:', supabase);

app.use(cors({
  origin: 'http://localhost:5173',  // Atur sesuai dengan domain frontend Anda
}));

app.use(express.json());

// Routes
app.use('/api/users', userRoutes(supabase));
app.use('/api/payments', paymentRoutes(supabase));
app.use('/api/rooms', roomsRoutes(supabase));
app.use('/api', notificationRoutes(supabase));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Export the Express app as a serverless function
export default app;
  
