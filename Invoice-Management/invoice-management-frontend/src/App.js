import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList';
import InvoiceUpdateForm from './components/InvoiceUpdateForm';
import axios from 'axios';

function App() {
  const [invoices, setInvoices] = useState([]);
  const [editingInvoice, setEditingInvoice] = useState(null);

  // Fetch all invoices
  const fetchInvoices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/invoices');
      setInvoices(response.data.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  // Handle delete invoice
  const handleDelete = async (invoiceNumber) => {
    try {
      await axios.delete(`http://localhost:5000/api/invoices/${invoiceNumber}`);
      alert('Invoice deleted successfully!');
      fetchInvoices();
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };

  // Handle edit button click
  const handleEdit = (invoice) => {
    setEditingInvoice(invoice);
  };

  // Handle successful update
  const handleUpdate = () => {
    setEditingInvoice(null);
    fetchInvoices();
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <Router>
      <div className="container">
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Invoice Management</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/form">Create Invoice</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/list">View Invoices</Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route
            path="/form"
            element={<InvoiceForm onCreate={fetchInvoices} />}
          />
          <Route
            path="/list"
            element={
              <>
                <InvoiceList
                  invoices={invoices}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
                {/* Render update form when editingInvoice is not null */}
                {editingInvoice && (
                  <InvoiceUpdateForm
                    invoice={editingInvoice}
                    onUpdate={handleUpdate}
                    onClose={() => setEditingInvoice(null)}
                  />
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <InvoiceList
                  invoices={invoices}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
                {editingInvoice && (
                  <InvoiceUpdateForm
                    invoice={editingInvoice}
                    onUpdate={handleUpdate}
                    onClose={() => setEditingInvoice(null)}
                  />
                )}
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import InvoiceForm from './components/InvoiceForm';
// import InvoiceList from './components/InvoiceList';

// function App() {
//   return (
//     <Router>
//       <div className="container">
//         <nav className="navbar navbar-expand-lg navbar-light bg-light">
//           <Link className="navbar-brand" to="/">Invoice Management</Link>
//           <div className="collapse navbar-collapse">
//             <ul className="navbar-nav">
//               <li className="nav-item">
//                 <Link className="nav-link" to="/form">Create Invoice</Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/list">View Invoices</Link>
//               </li>
//             </ul>
//           </div>
//         </nav>

//         <Routes>
//           <Route path="/form" element={<InvoiceForm />} />
//           <Route path="/" element={<InvoiceList />} />
//           <Route path="/list" element={<InvoiceList />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
