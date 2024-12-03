const Invoice = require("../models/invoice");

// Create a new invoice
exports.createInvoice = async (req, res) => {
  try {
    const { customerName, billingAddress, items } = req.body;

    // Calculate total amount and item amounts
    let totalAmount = 0;
    items.forEach(item => {
      item.amount = item.quantity * item.price;
      totalAmount += item.amount;
    });

    // Generate invoice number (For simplicity, auto-increment here, or use your own logic)
    const invoiceNumber = await Invoice.countDocuments() + 1;

    const newInvoice = new Invoice({
      invoiceNumber,
      customerName,
      billingAddress,
      items,
      totalAmount,
      date: new Date(),
    });

    await newInvoice.save();

    res.status(201).json({
      success: true,
      data: newInvoice,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Read all invoices
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json({
      success: true,
      data: invoices,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Read a specific invoice by ID
exports.getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findOne({ invoiceNumber: id });

    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }

    res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update an invoice
exports.updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerName, billingAddress, items } = req.body;

    let totalAmount = 0;
    items.forEach(item => {
      item.amount = item.quantity * item.price;
      totalAmount += item.amount;
    });

    const updatedInvoice = await Invoice.findOneAndUpdate(
      { invoiceNumber: id },
      { customerName, billingAddress, items, totalAmount },
      { new: true }
    );

    if (!updatedInvoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }

    res.status(200).json({
      success: true,
      data: updatedInvoice,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete an invoice
exports.deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInvoice = await Invoice.findOneAndDelete({ invoiceNumber: id });

    if (!deletedInvoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }

    res.status(200).json({
      success: true,
      data: deletedInvoice,
      message: "Invoice deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
