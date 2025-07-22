import mongoose from 'mongoose';

const mongoURI = 'mongodb://admin:secret@localhost:27017/your_database_name?authSource=admin'; 

mongoose.connect(mongoURI);

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

export default mongoose;
