import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  serviceId: {
    type: String,
    required: true
  },
  serviceTitle: {
    type: String,
    required: true
  },
  tierName: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  mobile: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    trim: true,
    default: 'Tactical Order Request'
  },
  message: {
    type: String,
    trim: true
  },
  cartItems: {
    type: [cartItemSchema],
    required: true,
    validate: [
      (arr) => arr.length > 0,
      'Order must contain at least one item'
    ]
  },
  totalAmount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
