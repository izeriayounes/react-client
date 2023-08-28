import { Fragment, useState } from 'react';
import '../styles/Table.css';
import { GrRefresh } from 'react-icons/gr';

function Table({ data, config, keyFn, onClick }) {
  const [rotation, setRotation] = useState(false);

  const handleRefreshClick = async () => {
    setRotation(true);
    onClick();
    setTimeout(() => {
      setRotation(false);
    }, 1000);
  };

  const refreshIcon = (
    <span
      className={`ring-1 absolute top-0 right-0 cursor-pointer border border-1 bg-white p-1 `}
      onClick={handleRefreshClick}
    >
      <GrRefresh className={rotation && 'animate-rotate'} size={20} />
    </span>
  );
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

  const renderedRows = data.map((rowData) => {
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
      {refreshIcon}
      <div className="pt-8">
        <table className=" text-center shadow-xl bg-white">
          <thead>
            <tr>{renderedHeaders}</tr>
          </thead>
          <tbody>{renderedRows}</tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
