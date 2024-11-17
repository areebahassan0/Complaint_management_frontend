import React from 'react';

const Table = ({ columns, data }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} style={{ border: '1px solid #ddd', padding: '8px' }}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex} style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {row[col.toLowerCase()]}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} style={{ textAlign: 'center', padding: '10px' }}>
              No complaints found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
