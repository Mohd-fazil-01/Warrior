// // // import Order from '../models/Order.js';

// // // // @desc    Create a new tactical order
// // // // @route   POST /api/orders
// // // // @access  Public
// // // export const createOrder = async (req, res) => {
// // //   try {
// // //     const { name, email, mobile, subject, message, cartItems, totalAmount } = req.body;

// // //     // Core validation checks
// // //     if (!name || !email || !mobile) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         error: 'Missing required credentials: name, email, and mobile are mandatory.'
// // //       });
// // //     }

// // //     if (!cartItems || cartItems.length === 0) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         error: 'Missing order items: cartItems array cannot be empty.'
// // //       });
// // //     }

// // //     if (totalAmount === undefined) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         error: 'Missing financial parameters: totalAmount is mandatory.'
// // //       });
// // //     }

// // //     // Save the order to the database
// // //     const newOrder = await Order.create({
// // //       name,
// // //       email,
// // //       mobile,
// // //       subject,
// // //       message,
// // //       cartItems,
// // //       totalAmount
// // //     });

// // //     console.log(`[ORDER SUCCESS] New order created successfully! ID: ${newOrder._id}`);

// // //     res.status(201).json({
// // //       success: true,
// // //       message: 'Transmission successfully authenticated and stored in tactical database.',
// // //       order: newOrder
// // //     });

// // //   } catch (error) {
// // //     console.error(`[ORDER ERROR] Failed to create order: ${error.message}`);
// // //     res.status(500).json({
// // //       success: false,
// // //       error: 'Internal encryption server fault. Transmission failed.',
// // //       message: error.message
// // //     });
// // //   }
// // // };









// // import Order from '../models/Order.js';
// // import { transporter } from '../config/mailer.js';

// // export const createOrder = async (req, res) => {
// //   try {
// //     const { name, email, mobile, subject, message, cartItems, totalAmount } = req.body;

// //     if (!name || !email || !mobile) {
// //       return res.status(400).json({
// //         success: false,
// //         error: 'Missing required credentials'
// //       });
// //     }

// //     if (!cartItems || cartItems.length === 0) {
// //       return res.status(400).json({
// //         success: false,
// //         error: 'Cart empty'
// //       });
// //     }

// //     // 1. Save order in DB
// //     const newOrder = await Order.create({
// //       name,
// //       email,
// //       mobile,
// //       subject,
// //       message,
// //       cartItems,
// //       totalAmount
// //     });

// //     // 2. Format email content
// //     const mailContent = `
// //       New Order Received 🚀

// //       Name: ${name}
// //       Email: ${email}
// //       Mobile: ${mobile}
// //       Subject: ${subject}

// //       Message: ${message}

// //       Total Amount: ₹${totalAmount}

// //       Items:
// //       ${cartItems.map(item =>
// //         `- ${item.serviceTitle} (${item.tierName}) - ₹${item.price}`
// //       ).join("\n")}
// //     `;

// //     // 3. Send Email
// //     await transporter.sendMail({
// //       from: process.env.EMAIL_USER,
// //       to: process.env.EMAIL_USER, // ya kisi admin email pe bhej sakta hai
// //       subject: `New Order from ${name}`,
// //       text: mailContent,
// //     });

// //     console.log("EMAIL SENT SUCCESSFULLY");

// //     res.status(201).json({
// //       success: true,
// //       message: 'Order saved + email sent successfully',
// //       order: newOrder
// //     });

// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({
// //       success: false,
// //       error: 'Server error',
// //       message: error.message
// //     });
// //   }
// // };





















// import { transporter } from "../config/mailer.js";

// export const createOrder = async (req, res) => {
//   try {
//     const { name, email, mobile, subject, message, cartItems, totalAmount } = req.body;

//     if (!name || !email || !mobile) {
//       return res.status(400).json({
//         success: false,
//         error: "Missing required fields"
//       });
//     }

//     const mailContent = `
// NEW ORDER RECEIVED 🚀

// Name: ${name}
// Email: ${email}
// Mobile: ${mobile}
// Subject: ${subject || "N/A"}

// Message: ${message || "N/A"}

// Total Amount: ₹${totalAmount || 0}

// Items:
// ${cartItems?.map(item =>
//   `- ${item.serviceTitle} (${item.tierName}) - ₹${item.price}`
// ).join("\n")}
// `;

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: process.env.EMAIL_USER,
//       subject: `New Order from ${name}`,
//       text: mailContent,
//     });
//     console.log("EMAIL:", process.env.EMAIL_USER);
// console.log("PASS:", process.env.EMAIL_PASS);

//     return res.status(200).json({
//       success: true,
//       message: "Order email sent successfully"
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// };























import Order from '../models/Order.js'; // 1. MongoDB मॉडल इम्पोर्ट किया
import { transporter } from "../config/mailer.js";

export const createOrder = async (req, res) => {
  try {
    const { name, email, mobile, subject, message, cartItems, totalAmount } = req.body;

    // वैलिडेशन चेक
    if (!name || !email || !mobile) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields"
      });
    }

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Cart cannot be empty"
      });
    }

    // 2. पहले MongoDB में डेटा सेव करें
    const newOrder = await Order.create({
      name,
      email,
      mobile,
      subject,
      message,
      cartItems,
      totalAmount
    });

    console.log(`[DB SUCCESS] Order saved with ID: ${newOrder._id}`);

    // 3. ईमेल का कंटेंट तैयार करें
    const mailContent = `
NEW ORDER RECEIVED 🚀

Order ID: ${newOrder._id}
Name: ${name}
Email: ${email}
Mobile: ${mobile}
Subject: ${subject || "N/A"}

Message: ${message || "N/A"}

Total Amount: ₹${totalAmount || 0}

Items:
${cartItems?.map(item =>
  `- ${item.serviceTitle} (${item.tierName}) - ₹${item.price}`
).join("\n")}
`;

    // 4. डेटाबेस में सेव होने के बाद ही मेल भेजें
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, 
      subject: `New Order #${newOrder._id} from ${name}`,
      text: mailContent,
    });

    console.log("EMAIL SENT SUCCESSFULLY");

    // 5. सक्सेस रिस्पांस भेजें
    return res.status(201).json({
      success: true,
      message: "Order saved in database and email sent successfully",
      order: newOrder
    });

  } catch (error) {
    console.error("[DB ERROR]:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message
    });
  }
};