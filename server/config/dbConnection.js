import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB connected.");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

export default connectDb;
