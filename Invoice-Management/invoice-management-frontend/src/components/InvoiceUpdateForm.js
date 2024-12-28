import React, { useState } from 'react';
import axios from 'axios';

function InvoiceUpdateForm({ invoice, onClose, onUpdate }) {
  const [formData, setFormData] = useState(invoice);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/invoices/${formData.invoiceNumber}`,
        formData
      );
      if (response.data.success) {
        alert('Invoice updated successfully!');
        onUpdate();
        onClose();
      } else {
        alert('Update failed.');
      }
    } catch (error) {
      console.error('Error updating invoice:', error);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content p-4">
        <h3>Update Invoice</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Customer Name</label>
            <input
              type="text"
              className="form-control"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Billing Address</label>
            <input
              type="text"
              className="form-control"
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="button" className="btn btn-secondary ms-2" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default InvoiceUpdateForm;
