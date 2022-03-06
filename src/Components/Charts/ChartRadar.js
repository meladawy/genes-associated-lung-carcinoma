import { Radar } from "react-chartjs-2";
import getFriendlyName from "../..//Helpers/string-operations";

const RadarBar = ({ rowData }) => {
  const labels = rowData.dataObject.datatypeScores.map(({ id }) => {
    return getFriendlyName(id);
  });

  const radarOptions = {
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
    scale: {
      ticks: {
        min: 0,
        stepSize: 0.5,
        showLabelBackdrop: false,
        backdropColor: "rgba(203, 197, 11, 1)",
      },
    },
  };

  const radarData = {
    labels,
    datasets: [
      {
        label: `Score`,
        data: rowData.dataObject.datatypeScores.map(({ score }) => {
          return score.toFixed(3);
        }),
        backgroundColor: "rgba(52, 136, 200, 0.6)",
        pointBackgroundColor: "rgba(220,220,220,1)",
        borderWidth: 1,
      },
    ],
  };

  return <Radar options={radarOptions} data={radarData} />;
};

export default RadarBar;
