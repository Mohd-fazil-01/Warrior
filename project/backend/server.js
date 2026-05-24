// import express from 'express';
// import dns from "dns";
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { connectDB } from './config/db.js';
// import orderRoutes from './routes/orderRoutes.js';

// dns.setDefaultResultOrder("ipv4first");

// // Load environment variables
// dotenv.config();

// // Initialize MongoDB connection
// // connectDB();

// const app = express();

// // Middleware
// app.use(cors()); // Allow cross-origin requests from Vite React app
// app.use(express.json()); // Parse incoming JSON packets
// app.use(express.urlencoded({ extended: true }));

// // Routing API Handlers
// app.use('/api/orders', orderRoutes);

// // Root Endpoint Status check
// app.get('/', (req, res) => {
//   res.json({
//     success: true,
//     status: 'ONLINE',
//     system: 'WARRIOR-CYBER-OPS-BACKEND',
//     db: 'CONNECTED'
//   });
// });

// // Error handling middleware for undefined routes
// app.use((req, res, next) => {
//   res.status(404).json({
//     success: false,
//     error: `System route not found: ${req.originalUrl}`
//   });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log('===================================================');
//   console.log(`[SYSTEM] Express Operations Server Active on Port: ${PORT}`);
//   console.log(`[STATUS] Listening for secure transmissions...`);
//   console.log(`[API PATH] POST route active at http://localhost:${PORT}/api/orders`);
//   console.log('===================================================');
// });



















import dotenv from "dotenv";
dotenv.config(); // MUST be at top

import express from "express";
import dns from "dns";
import cors from "cors";

import orderRoutes from "./routes/orderRoutes.js";
import { connectDB } from "./config/db.js";

dns.setDefaultResultOrder("ipv4first");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= ROUTES =================
app.use("/api/orders", orderRoutes);

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.json({
    success: true,
    status: "ONLINE",
    system: "WARRIOR-CYBER-OPS-BACKEND",
    db: "DISABLED (EMAIL MODE)"
  });
});

// ================= 404 HANDLER =================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `System route not found: ${req.originalUrl}`
  });
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log("===================================================");
  console.log(`[SYSTEM] Express Server Active on Port: ${PORT}`);
  console.log(`[STATUS] Listening for secure transmissions...`);
  console.log(`[API PATH] POST http://localhost:${PORT}/api/orders`);
  console.log("===================================================");
});