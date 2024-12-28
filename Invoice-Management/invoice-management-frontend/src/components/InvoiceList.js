import React, { useEffect, useState } from 'react';

function InvoiceList({ invoices, onDelete, onEdit }) {
  return (
    <div className="mt-4">
      <h2>Invoice List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Customer Name</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.invoiceNumber}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.customerName}</td>
              <td>${invoice.totalAmount}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => onEdit(invoice)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(invoice.invoiceNumber)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InvoiceList;

// function InvoiceList() {
//   const [invoices, setInvoices] = useState([]);

//   useEffect(() => {
//     const fetchInvoices = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/invoices');
//         const result = await response.json();
//         if (response.ok) {
//           setInvoices(result.data);
//         } else {
//           console.error('Failed to fetch invoices:', result);
//         }
//       } catch (error) {
//         console.error('Error fetching invoices:', error);
//       }
//     };
//     fetchInvoices();
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h2>Invoice List</h2>
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>Invoice Number</th>
//             <th>Customer Name</th>
//             <th>Total Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {invoices.map((invoice) => (
//             <tr key={invoice.invoiceNumber}>
//               <td>{invoice.invoiceNumber}</td>
//               <td>{invoice.customerName}</td>
//               <td>${invoice.totalAmount}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default InvoiceList;
