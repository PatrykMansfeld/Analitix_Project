import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `Successfully connected to MongoDB: ${conn.connection.host}`.magenta
        .underline
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export { connectDb };
