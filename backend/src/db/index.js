import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const dbConnection = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    console.log('mongodb connect', `${connectionInstance.connection.host}`);
  } catch (error) {
    console.log('Error: ', error);
  }
};
export default dbConnection;
