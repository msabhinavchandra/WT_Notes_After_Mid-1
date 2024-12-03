function validateInvoice(req, res, next) {
    const { customerName, billingAddress, items } = req.body;
    if (!customerName || !billingAddress || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid input data' });
    }
    next();
}

module.exports = validateInvoice;
