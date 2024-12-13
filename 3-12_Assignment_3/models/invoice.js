const mongoose = require('mongoose'); 
const itemSchema = new mongoose.Schema({ 
itemName: { type: String, required: true }, 
quantity: { type: Number, required: true, min: 1 }, 
  price: { type: Number, required: true, min: 0 }, 
  amount: { type: Number, required: true } 
}); 
 
const invoiceSchema = new mongoose.Schema({ 
  invoiceNumber: { type: Number, unique: true, required: true }, 
  customerName: { type: String, required: true }, 
  billingAddress: { type: String, required: true }, 
  date: { type: Date, default: Date.now }, 
  items: [itemSchema], 
  totalAmount: { type: Number, required: true } 
}); 
 
const Invoice = mongoose.model('Invoice', invoiceSchema); 
 
module.exports = Invoice; 