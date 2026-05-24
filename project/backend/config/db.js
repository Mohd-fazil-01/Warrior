// // import mongoose from 'mongoose';

// // export const connectDB = async () => {
// //   try {
// //     const conn = await mongoose.connect(process.env.MONGODB_URI);
// //     console.log(`[DATABASE] MongoDB Connected Successfully: ${conn.connection.host}`);
// //   } catch (error) {
// //     console.error(`[DATABASE ERROR] MongoDB Connection Failed: ${error.message}`);
// //     console.warn(`[DATABASE WARNING] Server remains active. Please check network/DNS configs.`);
// //   }
// // };







// import mongoose from 'mongoose';

// export const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_URI, {
//       family: 4
//     });

//     console.log(`[DATABASE] MongoDB Connected Successfully: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`[DATABASE ERROR] MongoDB Connection Failed: ${error.message}`);
//     console.warn(`[DATABASE WARNING] Server remains active. Please check network/DNS configs.`);
//   }
// };









import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://Sufiyan:Sufiyan@cluster0.obvvpnc.mongodb.net/user', {
    });

    console.log(`[DATABASE] Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[DATABASE ERROR] ${error.message}`);
  }
};