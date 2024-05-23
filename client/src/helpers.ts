import { apiDataType } from "./components/Body/apiData.types";
import { MainTableDataType } from "./components/MainTable/MainData.types";
import { AggregatedContainerDataType } from "./components/AggregatedTable/AggregatedContainer.types";
import { AggregatedTableDataType } from "./components/AggregatedTable/AggregatedData.types";
import { ChartDataType } from "./components/Chart/ChartData.types";

export function createMainTableData(data: apiDataType[]) {
  const arr: MainTableDataType[] = [];

  for (let i = 2020; i <= 2024; i++) {
    const jobs = data.reduce((acc: number, curr: apiDataType) => {
      return parseInt(curr["work_year"]) === i ? acc + 1 : acc;
    }, 0);
    const avg_salary = data.reduce((acc: number, curr: apiDataType) => {
      return parseInt(curr["work_year"]) === i
        ? acc + Math.round(parseInt(curr["salary_in_usd"]) / jobs)
        : acc;
    }, 0);

    arr.push({ key: i, year: i, jobs, avg_salary });
  }

  return arr;
}

export function createAggregatedTableData(data: apiDataType[]) {
  const arr: AggregatedContainerDataType[] = [];

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

    arr.push({ year: i, jobs });
  }

  return arr;
}

export function createSimplifiedAggregatedTableData(
  aggregatedTableData: AggregatedContainerDataType[],
  selectedRowKeys: React.Key[]
) {
  const simplifiedAggregatedTable = aggregatedTableData.filter(
    (item) => item.year === selectedRowKeys[0]
  )[0]?.jobs;

  return simplifiedAggregatedTable;
}

export function createChartData(mainTableData: MainTableDataType[]) {
  const chartData: ChartDataType[] = mainTableData.map((item) => ({
    name: item.year,
    jobs: item.jobs,
    avg_salary: item.avg_salary,
  }));

  return chartData;
}
