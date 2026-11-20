import mongoose from "mongoose";

mongoose.set('bufferCommands', false);

const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        console.warn("MONGODB_URI not set — running without MongoDB connection");
        return;
    }

    mongoose.connection.on('connected', () => console.log("Database Connected"));

    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`, {
            serverSelectionTimeoutMS: 5000,
        });
    } catch (err) {
        console.warn("MongoDB not connected — some features may not work:", err.message);
    }
};

export default connectDB;