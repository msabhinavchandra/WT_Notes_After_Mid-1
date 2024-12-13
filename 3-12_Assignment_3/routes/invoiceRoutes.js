const express = require('express'); 
const Invoice = require('../models/invoice'); 
const router = express.Router(); 
 
router.get('/', async (req, res) => { 
    try { 
      const invoices = await Invoice.find(); 
      res.status(200).json({ success: true, data: invoices }); 
    } catch (err) { 
      res.status(500).json({ success: false, message: err.message 
}); 
    } 
  });   
 
router.post('/', async (req, res) => { 
    try { 
      const { customerName, billingAddress, items } = req.body; 

      // Validate required fields
      if (!customerName || !billingAddress || !items) {
        return res.status(400).json({
            success: false,
            message: 'Validation error: Missing required fields',
        });
    }
   
      // Calculate items' amounts and total amount 
      const calculatedItems = items.map(item => ({ 
        ...item, 
        amount: item.quantity * item.price, 
      })); 
      const totalAmount = calculatedItems.reduce((sum, item) => sum+ item.amount, 0); 
   
      // Determine next invoice number 
      const lastInvoice = await Invoice.findOne().sort({ invoiceNumber: -1 }); 
      const invoiceNumber = lastInvoice ? lastInvoice.invoiceNumber + 1 : 1; 
   
      const invoice = new Invoice({ 
        invoiceNumber, 
        customerName, 
        billingAddress, 
        items: calculatedItems, 
        totalAmount, 
      }); 
   
      const savedInvoice = await invoice.save(); 
      res.status(201).json({ success: true, data: savedInvoice, message: 'Invoice created' }); 
    } catch (err) { 
      res.status(500).json({ success: false, message: err.message }); } 
  }); 
   
router.get('/:id', async (req, res) => { 
    try { 
      const invoice = await Invoice.findOne({ invoiceNumber: req.params.id }); 
      if (!invoice) { 
        return res.status(404).json({ success: false, message: 'Invoice not found' }); 
      } 
      res.status(200).json({ success: true, data: invoice }); 
    } catch (err) { 
      res.status(500).json({ success: false, message: err.message 
}); 
    } 
  }); 
 
  router.put('/:id', async (req, res) => { 
    try { 
      const { customerName, billingAddress, items } = req.body; 
   
      // Recalculate totals 
      const calculatedItems = items.map(item => ({ 
        ...item, amount: item.quantity * item.price, })); 
      const totalAmount = calculatedItems.reduce((sum, item) => sum + item.amount, 0); 
   
      const updatedInvoice = await Invoice.findOneAndUpdate( 
        { invoiceNumber: req.params.id }, 
        { customerName, billingAddress, items: calculatedItems, totalAmount }, 
        { new: true, runValidators: true } 
      ); 
   
      if (!updatedInvoice) { 
        return res.status(404).json({ success: false, message: 'Invoice not found' }); 
      } 
   
      res.status(200).json({ success: true, data: updatedInvoice, message: 'Invoice updated' }); 
    } catch (err) { 
      res.status(500).json({ success: false, message: err.message 
}); 
    } 
  }); 
   
  router.delete('/:id', async (req, res) => { 
    try { 
      const deletedInvoice = await Invoice.findOneAndDelete({ invoiceNumber: req.params.id }); 
      if (!deletedInvoice) { 
        return res.status(404).json({ success: false, message: 'Invoice not found' }); 
      } 
      res.status(200).json({ success: true, data: deletedInvoice, message: 'Invoice deleted' }); 
    } catch (err) { 
      res.status(500).json({ success: false, message: err.message 
}); 
    } 
  }); 
   
  module.exports = router;