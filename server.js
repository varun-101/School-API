import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import router from './routes/schoolRoutes.js';

const app = express();

app.use(cors());
app.use(json());

// Routes
app.use('/api', router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 