import React from "react";
import { useTable, useExpanded } from "react-table";
import Table from "react-bootstrap/Table";
import Tabs from "./Tabs";

function LinkFromLabel(data) {
  return (
    <a
      href={data.row.original.approvedSymbolUrl}
      target="_blank"
      rel="noreferrer"
    >
      {data.value}
    </a>
  );
}

const columns = [
  {
    id: "expander", // Make sure it has an ID
    Header: "",
    className: 'expander-cell',
    Cell: ({ row }) => (
      <span
        {...row.getToggleRowExpandedProps({
          style: {
            paddingLeft: `${row.depth * 2}rem`,
          },
        })}
      >
        {row?.isExpanded ? (
          <i className="fas fa-minus"></i>
        ) : (
          <i className="fas fa-plus"></i>
        )}
      </span>
    ),
  },
  {
    Header: "Approved Symbol",
    accessor: "approvedSymbol",
    id: "approvedSymbol",
    Cell: LinkFromLabel,
  },
  {
    Header: "Gene Name",
    accessor: "geneName",
    id: "geneName",
  },
  {
    Header: "Overall Association Score",
    accessor: "overallAssociationScore",
    id: "overallAssociationScore",
  },
];

const ChartTable = ({ data }) => {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useExpanded
    );

  // Render the UI for your table
  return (
    <Table {...getTableProps()} className="expanding-table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <React.Fragment key={`unique-${i}`}>
              <tr {...row.getRowProps()} key={`row1-${i}`} className="info-row">
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
              {row.isExpanded && (
                <tr {...row.getRowProps()} key={`row2-${i}`}>
                  <td colSpan={row.cells.length}>
                    <Tabs rowData={row.original} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ChartTable;
