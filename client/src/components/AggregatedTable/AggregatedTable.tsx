import { Table } from "antd";
import type { TableColumnsType } from "antd";

import "./AggregatedTable.scss";
import { AggregatedTableDataType } from "./AggregatedData.types";

const columns: TableColumnsType<AggregatedTableDataType> = [
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Count",
    dataIndex: "count",
    defaultSortOrder: "ascend",
    sorter: (a, b) => {
      return a.count - b.count;
    },
  },
];

const AggregatedTable = ({ data }: { data: AggregatedTableDataType[] }) => {
  return (
    <div className="aggregated-table">
      <Table
        columns={columns}
        dataSource={data}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={{ showSizeChanger: false, pageSize: 5 }}
      />
    </div>
  );
};

export default AggregatedTable;
