import mongoose from "mongoose";

// Connect to MongoDB
const connectDB = async () => { 
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    mongoose.connection.on('connected', () => {
      console.log(`Connected to MongoDB`);
    });

    mongoose.connection.on('error', (err) => {
      console.error(`Error connecting to MongoDB: ${err.message}`);
      process.exit(1);
    });
  } catch (err) {
    console.error(`Error in connectDB: ${err}`);
    process.exit(1);
  }
}

export default connectDB;
