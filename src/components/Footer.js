import Papa from 'papaparse';
import React from 'react'

const Footer = ({ books }) => {
  const exportToCSV = () => {
    const csv = Papa.unparse(books);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'books.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="container-fluid">
      <div 
        style={{
          width: 'fit-content',
          margin: '20px auto',
        }}
        className='d-flex justify-content-center h-100'
      >
        <a className='btn' onClick={exportToCSV}>
          Download to CSV
        </a>
      </div>
    </div>
  );
}

export default Footer