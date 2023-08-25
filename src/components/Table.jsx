import { Fragment } from 'react';

function Table({ data, config, keyFn }) {
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
    <table className=" text-center shadow-xl bg-white">
      <thead>
        <tr>{renderedHeaders}</tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </table>
  );
}

export default Table;
