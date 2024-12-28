function validateInvoice(req, res, next) {
    const { customerName, billingAddress, items } = req.body;
  
    if (!customerName || !billingAddress || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'All required fields must be present' });
    }
  
    for (const item of items) {
      if (!item.itemName || item.quantity <= 0 || item.price <= 0) {
        return res.status(400).json({ error: 'Quantity and price must be positive numbers' });
      }
    }
  
    next();
  }
  
  module.exports = { validateInvoice };
  