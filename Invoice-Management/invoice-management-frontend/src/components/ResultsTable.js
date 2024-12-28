import React, { useState } from 'react';
import { useTable } from '@tanstack/react-table';

function ResultsTable({ data, onUpdate, onDelete }) {
  const [editingInvoice, setEditingInvoice] = useState(null);

  const columns = React.useMemo(() => {
    if (data.length > 0) {
      return [
        ...Object.keys(data[0]).map((key) => ({
          accessorKey: key,
          header: key,
        })),
        {
          header: 'Actions',
          accessorKey: 'actions',
          cell: ({ row }) => (
            <>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => setEditingInvoice(row.original)}
              >
                Update
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(row.original.invoiceNumber)}
              >
                Delete
              </button>
            </>
          ),
        },
      ];
    }
    return [];
  }, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ data, columns });

  return (
    <div>
      {editingInvoice && (
        <InvoiceUpdateForm
          invoice={editingInvoice}
          onClose={() => setEditingInvoice(null)}
          onUpdate={onUpdate}
        />
      )}
      <table className="table table-striped" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th key={column.id}>{column.renderHeader()}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td key={cell.id}>{cell.renderCell()}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ResultsTable;
