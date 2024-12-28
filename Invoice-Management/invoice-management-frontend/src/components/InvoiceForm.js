import React, { useState } from 'react';

function InvoiceForm() {
  const [formData, setFormData] = useState({
    customerName: '',
    billingAddress: '',
    items: [{ itemName: '', quantity: 1, price: 0, amount: 0 }],
    totalAmount: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (index, field, value) => {
    const items = [...formData.items];
    items[index][field] = field === 'quantity' || field === 'price' ? parseFloat(value) : value;
    items[index].amount = items[index].quantity * items[index].price;
    const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
    setFormData({ ...formData, items, totalAmount });
  };

  const addItem = () => {
    setFormData({ ...formData, items: [...formData.items, { itemName: '', quantity: 1, price: 0, amount: 0 }] });
  };

  const removeItem = (index) => {
    const items = formData.items.filter((_, i) => i !== index);
    const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
    setFormData({ ...formData, items, totalAmount });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Invoice created successfully!');
        setFormData({
          customerName: '',
          billingAddress: '',
          items: [{ itemName: '', quantity: 1, price: 0, amount: 0 }],
          totalAmount: 0,
        });
      } else {
        alert('Failed to create invoice.');
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Invoice</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Customer Name</label>
          <input
            type="text"
            className="form-control"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Billing Address</label>
          <input
            type="text"
            className="form-control"
            name="billingAddress"
            value={formData.billingAddress}
            onChange={handleInputChange}
            required
          />
        </div>
        <h3>Items</h3>
        {formData.items.map((item, index) => (
          <div key={index} className="row g-3 align-items-center mb-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Item Name"
                value={item.itemName}
                onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                required
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                required
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                required
              />
            </div>
            <div className="col-md-2">
              <input type="text" className="form-control" value={item.amount} disabled />
            </div>
            <div className="col-md-2">
              <button type="button" className="btn btn-danger" onClick={() => removeItem(index)}>
                Remove
              </button>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary" onClick={addItem}>
          Add Item
        </button>
        <div className="mt-3">
          <h4>Total Amount: ${formData.totalAmount}</h4>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default InvoiceForm;
