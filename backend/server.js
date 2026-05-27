require('dotenv').config();
const connectDB = require('./src/db/db');
const app = require('./src/app');

const PORT = process.env.PORT || 3000;


const startServer = async () => {
  try {
   
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server is running cleanly on port ${PORT}`);
    });
  } catch (error) {
    console.error("Critical server launch sequence failure:", error.message);
    process.exit(1); 
  }
};

startServer();