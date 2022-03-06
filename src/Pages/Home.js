import { useQuery, gql } from "@apollo/client";
import dynamicSortArray from "../Helpers/array-operations";
import getFriendlyName from "../Helpers/string-operations";
import Table from "../Components/Table";

const Home = () => {
  const DISEASE_QUERY = gql`
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

  const { loading, error, data } = useQuery(DISEASE_QUERY);

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
      overallAssociationScore: dataItem.score.toFixed(3),
      dataObject: dataItem,
    };
  });

  return <Table data={associatedTargetTableData} />;
};

export default Home;
