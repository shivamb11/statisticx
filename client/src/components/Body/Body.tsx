import { useState } from "react";

import "./Body.scss";
import MainTable from "../MainTable/MainTable";
import AggregatedTable from "../AggregatedTable/AggregatedTable";
import Chart from "../Chart/Chart";
import Loader from "../Loader/Loader";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import { useApiData } from "./useApiData";
import {
  createAggregatedTableData,
  createChartData,
  createMainTableData,
  createSimplifiedAggregatedTableData,
} from "../../helpers";

function Body() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { data, isLoading, error } = useApiData();

  if (error) {
    return <ErrorComponent error={error} />;
  }

  if (isLoading || !data) {
    return <Loader />;
  }

  const mainTableData = createMainTableData(data);

  const aggregatedTableData = createAggregatedTableData(data);

  const simplifiedAggregatedTable = createSimplifiedAggregatedTableData(
    aggregatedTableData,
    selectedRowKeys
  );

  const chartData = createChartData(mainTableData);

  return (
    <main className="body">
      <div className="row">
        <div className="element">
          <h2>ML Engineers statistics (2020-2024)</h2>
          <div className="sub-row">
            <MainTable
              data={mainTableData}
              selectedRowKeys={selectedRowKeys}
              setSelectedRowKeys={setSelectedRowKeys}
            />
            {selectedRowKeys.length === 0 && (
              <h3>Click on a year to view more...</h3>
            )}
          </div>
        </div>
        {selectedRowKeys.length > 0 && (
          <div className="element">
            <h2>For the year {String(selectedRowKeys[0])}</h2>
            <AggregatedTable data={simplifiedAggregatedTable} />
          </div>
        )}
      </div>
      <div className="row">
        <div className="element">
          <h2>Comparison graph (by job count)</h2>
          <Chart data={chartData} yField="jobs" />
        </div>
        <div className="element">
          <h2>Comparison graph (by salary)</h2>
          <Chart data={chartData} yField="avg_salary" />
        </div>
      </div>
    </main>
  );
}

export default Body;
