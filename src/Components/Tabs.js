import React from "react";

import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";

import ChartBar from "./Charts/ChartBar";
import ChartRadar from "./Charts/ChartRadar";

const Tabs = ({ rowData }) => {
  const [activeTab, setActiveTab] = React.useState(
    typeof rowData?.activeTab !== "undefined" ? rowData?.activeTab : "bar-chart"
  );

  return (
    <>
      <MDBTabs>
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
          <ChartBar rowData={rowData} />
        </MDBTabsPane>
        <MDBTabsPane show={activeTab === "radar-chart"}>
          <ChartRadar rowData={rowData} />
        </MDBTabsPane>
      </MDBTabsContent>
    </>
  );
};

export default Tabs;
