import { Fragment } from 'react';
import '../styles/Table.css';
// import { GrRefresh } from 'react-icons/gr';

function Table({ data, config, keyFn, onClick, itemsPerPage, currentPage, setCurrentPage }) {
  // const [rotation, setRotation] = useState(false);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const pageRange = [];

  for (let i = Math.max(currentPage - 2, 1); i <= Math.min(currentPage + 2, totalPages); i++) {
    pageRange.push(i);
  }

  const paginationControls = (
    <div className="flex justify-center mt-4">
      <button
        className="mr-2 px-3 py-1 border border-gray-600 rounded bg-white shadow-sm"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Precedant
      </button>
      {pageRange.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`mx-1 px-2 py-1 border border-gray-600 rounded shadow-sm ${
            currentPage === pageNumber ? 'bg-purple-400 text-white' : 'bg-white'
          }`}
          onClick={() => setCurrentPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        className="ml-2 px-3 py-1 border border-gray-600 rounded bg-white shadow-sm"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Suivant
      </button>
    </div>
  );

  // const handleRefreshClick = async () => {
  //   setRotation(true);
  //   onClick();
  //   setTimeout(() => {
  //     setRotation(false);
  //   }, 1000);
  // };

  // const refreshIcon = (
  //   <span
  //     className={`ring-1 absolute top-0 right-0 cursor-pointer border border-1 bg-white p-1 `}
  //     onClick={handleRefreshClick}
  //   >
  //     <GrRefresh className={rotation && 'animate-rotate'} size={20} />
  //   </span>
  // );

  const renderedHeaders = config.map((column) => {
    if (column.header) {
      return <Fragment key={column.label}>{column.header()}</Fragment>;
    }
    return (
      <th className="px-2 border border-black" key={column.label}>
        {column.label}
      </th>
    );
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataToDisplay = data.slice(startIndex, endIndex);

  const renderedRows = dataToDisplay.map((rowData) => {
    const renderedCells = config.map((column) => {
      return (
        <td className="p-2 border border-black" key={column.label}>
          {column.render(rowData) || '-'}
        </td>
      );
    });

    return (
      <tr className=" text-center" key={keyFn(rowData)}>
        {renderedCells}
      </tr>
    );
  });

  return (
    <div className="relative">
      <table className=" text-center shadow-sm bg-white">
        <thead>
          <tr>{renderedHeaders}</tr>
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>
      {paginationControls}
    </div>
  );
}

export default Table;
