import 'dotenv/config';
import mongoose from './db.js';
import app from './app.js';

const PORT = process.env.PORT || 3000;

mongoose.connection.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
