import { connect } from "mongoose";

export const dbConnection = async () => {
  try {
    await connect(String(process.env.DB_CNN));
    console.log("Server Connected to DB");
  } catch (error) {
    console.log(error);
    throw new Error("---------- Error to connect to DB Mongo Atlas ----------");
  }
};
