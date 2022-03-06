import React from "react";
import "./App.css";
import dynamicSortArray from "./Helpers/array-operations";
import getFriendlyName from "./Helpers/string-operations";
import { useTable, useExpanded } from "react-table";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";

import { useQuery, gql } from "@apollo/client";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";

import { Bar, Radar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ...registerables
);

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

function Tabs({ rowData }) {
  const [activeTab, setActiveTab] = React.useState(
    typeof rowData?.activeTab !== "undefined" ? rowData?.activeTab : "bar-chart"
  );
  const labels = rowData.dataObject.datatypeScores.map(({ id }) => {
    return getFriendlyName(id);
  });

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Data Type Scores: ${rowData.approvedSymbol} and lung carcinoma`,
      },
    },
  };

  const radarOptions = {
    responsive: true,
    plugins: {
      scale: {
        ticks: {
          beginAtZero: true,
        },
      },
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Data Type Scores: ${rowData.approvedSymbol} and lung carcinoma`,
      },
    },
    scale: {
      ticks: {
        beginAtZero: true,
        min: 0,
        stepSize: 1,
      },
    },
  };

  const barData = {
    labels,
    datasets: [
      {
        label: "Score",
        data: rowData.dataObject.datatypeScores.map(({ score }) => {
          return score;
        }),
        backgroundColor: "rgb(52, 136, 200)",
      },
    ],
  };

  const radarData = {
    labels,
    datasets: [
      {
        label: `Score`,
        data: rowData.dataObject.datatypeScores.map(({ score }) => {
          return score;
        }),
        backgroundColor: "rgba(52, 136, 200, 0.2)",
        pointBackgroundColor: "rgba(220,220,220,1)",
        borderWidth: 1,
      },
    ],
  };

  console.log(radarData);
  return (
    <>
      <MDBTabs className="mb-12">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => setActiveTab("bar-chart")}
            active={activeTab === "bar-chart"}
          >
            Bar Chart
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => setActiveTab("radar-chart")}
            active={activeTab === "radar-chart"}
          >
            Radar Chart
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={activeTab === "bar-chart"}>
          <Bar options={barOptions} data={barData} />
        </MDBTabsPane>
        <MDBTabsPane show={activeTab === "radar-chart"}>
          <Radar options={radarOptions} data={radarData} />
        </MDBTabsPane>
      </MDBTabsContent>
    </>
  );
}

const columns = [
  {
    // Build our expander column
    id: "expander", // Make sure it has an ID
    Header: "",
    Cell: ({ row }) => (
      <span
        {...row.getToggleRowExpandedProps({
          style: {
            // We can even use the row.depth property
            // and paddingLeft to indicate the depth
            // of the row
            paddingLeft: `${row.depth * 2}rem`,
          },
        })}
      >
        {row.isExpanded ? "-" : "+"}
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

function Table({ columns, data }) {
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
    <table {...getTableProps()}>
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
            <>
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
              {row.isExpanded && (
                <tr>
                  <td colSpan={row.cells.length}>
                    <Tabs rowData={row.original} />
                  </td>
                </tr>
              )}
            </>
          );
        })}
      </tbody>
    </table>
  );
}

function ExchangeRates() {
  const TEST = gql`
    query lungCarcinomaAssociatedTargets {
      disease(efoId: "EFO_0001071") {
        associatedTargets(page: { index: 0, size: 25 }) {
          rows {
            target {
              id
              approvedSymbol
              approvedName
            }
            score
            datatypeScores {
              id
              score
            }
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(TEST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  let associatedTargetsData = [...data.disease.associatedTargets.rows];
  // Sort Rows by Score.
  // NOTE: The sort should be done from the Query. I found a sorting query `orderByScore: String` but it didn't work when I used ASC and DESC
  // VALUES. So I decided to sort it from the frontend, even if the results are already sorted, but I assume you need to see how we should sort things from the FRONTEND.
  associatedTargetsData.sort(dynamicSortArray("score"));
  // Slice the first 10 elements.
  // NOTE: We should actually do this from the Query Pager, but I assume you asked us to use the same query as in the task.
  associatedTargetsData = associatedTargetsData.slice(0, 10);
  const associatedTargetTableData = associatedTargetsData.map((dataItem) => {
    return {
      approvedSymbol: dataItem.target.approvedSymbol,
      approvedSymbolUrl:
        "https://platform.opentargets.org/target/" + dataItem.target.id,
      geneName: getFriendlyName(dataItem.target.approvedName),
      overallAssociationScore: dataItem.score,
      dataObject: dataItem,
    };
  });

  return <Table columns={columns} data={associatedTargetTableData} />;
}

function App() {
  return (
    <div className="App">
      <ExchangeRates />
    </div>
  );
}

export default App;
