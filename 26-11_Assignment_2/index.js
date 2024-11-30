const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/invoicesDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define the schema for invoices
const schema = new mongoose.Schema({
    invoiceNumber: Number,
    customerName: String,
    billingAddress: String,
    items: [
        {
            itemName: String,
            quantity: Number,
            price: Number,
            amount: Number, // This will be calculated
        },
    ],
    totalAmount: Number, // This will also be calculated
});

// Create the model
const Invoice = mongoose.model('Invoice', schema);

// GET all invoices
app.get('/api/invoices', async (req, res) => {
    try {
        const invoices = await Invoice.find(); // Retrieve all invoices from MongoDB
        res.status(200).json(invoices);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.post('/api/invoices', async (req, res) => {
    try {
        const { invoiceNumber, customerName, billingAddress, items } = req.body;

        // Calculate the amount for each item and the total amount
        let totalAmount = 0;
        const updatedItems = items.map((item) => {
            const amount = item.quantity * item.price;
            totalAmount += amount;
            return { ...item, amount };
        });

        // Create a new invoice
        const newInvoice = new Invoice({
            invoiceNumber,
            customerName,
            billingAddress,
            items: updatedItems,
            totalAmount,
        });

        // Save to MongoDB
        const savedInvoice = await newInvoice.save();
        res.status(201).json(savedInvoice);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET an invoice by ID
app.get('/api/invoices/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const invoice = {
            invoiceNumber : 1,
            customerName : 'John Doe'
        }

        res.status(200).json(invoice);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
app.listen(4000, () => {
    console.log('Server listening on port 4000');
});