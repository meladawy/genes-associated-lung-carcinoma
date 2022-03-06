import { Bar } from "react-chartjs-2";
import getFriendlyName from "../..//Helpers/string-operations";

const ChartBar = ({ rowData }) => {
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

  const barData = {
    labels,
    datasets: [
      {
        label: "Score",
        data: rowData.dataObject.datatypeScores.map(({ score }) => {
          return score.toFixed(3);
        }),
        backgroundColor: "rgba(52, 136, 200, 0.8)",
      },
    ],
  };

  return <Bar height={100} options={barOptions} data={barData} />;
};

export default ChartBar;
