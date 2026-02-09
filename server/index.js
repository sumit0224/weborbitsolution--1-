import dotenv from 'dotenv';
import app, { connectDb } from './app.js';

dotenv.config();

const PORT = Number(process.env.SERVER_PORT || 4000);

const start = async () => {
  try {
    await connectDb();
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server start failed:', error);
    process.exit(1);
  }
};

start();
