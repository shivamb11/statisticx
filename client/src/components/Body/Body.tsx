import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import "./Body.scss";
import MainTable from "../MainTable/MainTable";
import AggregatedTable from "../AggregatedTable/AggregatedTable";
import Chart from "../Chart/Chart";
import Loader from "../Loader/Loader";
import { apiDataType } from "./apiData.types";
import { MainTableDataType } from "../MainTable/MainData.types";
import { ChartDataType } from "../Chart/ChartData.types";
import { AggregatedTableDataType } from "../AggregatedTable/AggregatedData.types";
import ErrorComponent from "../ErrorComponent/ErrorComponent";

async function getData(): Promise<apiDataType[]> {
  const res = await axios.get("https://statisticx-api.vercel.app/api/data");
  return res.data;
}

interface aggregatedTableDataItem {
  year: number;
  jobs: AggregatedTableDataType[];
}

function Body() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["data"],
    queryFn: getData,
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  if (error) {
    return <ErrorComponent error={error} />;
  }

  if (isLoading || !data) {
    return <Loader />;
  }

  const mainTableData: MainTableDataType[] = [];

  const aggregatedTableData: aggregatedTableDataItem[] = [];

  for (let i = 2020; i <= 2024; i++) {
    const jobs = data.reduce((acc: number, curr: apiDataType) => {
      return parseInt(curr["work_year"]) === i ? acc + 1 : acc;
    }, 0);
    const avg_salary = data.reduce((acc: number, curr: apiDataType) => {
      return parseInt(curr["work_year"]) === i
        ? acc + Math.round(parseInt(curr["salary_in_usd"]) / jobs)
        : acc;
    }, 0);

    mainTableData.push({ key: i, year: i, jobs, avg_salary });
  }

  for (let i = 2020; i <= 2024; i++) {
    const jobs: AggregatedTableDataType[] = data.reduce(
      (acc: AggregatedTableDataType[], curr: apiDataType) => {
        if (parseInt(curr["work_year"]) === i) {
          const job = acc.find((item) => item.title === curr.job_title);
          if (job) {
            job["count"] += 1;
            return acc;
          } else {
            return [
              ...acc,
              { key: acc.length, title: curr.job_title, count: 1 },
            ];
          }
        } else {
          return acc;
        }
      },
      []
    );

    aggregatedTableData.push({ year: i, jobs });
  }

  const simplifiedAggregatedTable = aggregatedTableData.filter(
    (item) => item.year === selectedRowKeys[0]
  )[0]?.jobs;

  const chartData: ChartDataType[] = mainTableData.map((item) => ({
    name: item.year,
    jobs: item.jobs,
    avg_salary: item.avg_salary,
  }));

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
