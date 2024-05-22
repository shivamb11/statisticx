import { useState } from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";

import "./MainTable.scss";
import { MainTableDataType } from "./MainData.types";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

const columns: TableColumnsType<MainTableDataType> = [
  {
    title: "Year",
    dataIndex: "year",
    sorter: {
      compare: (a, b) => a.year - b.year,
    },
  },
  {
    title: "No. of jobs",
    dataIndex: "jobs",
    sorter: {
      compare: (a, b) => a.jobs - b.jobs,
    },
  },
  {
    title: "Average Salary (USD)",
    dataIndex: "avg_salary",
    sorter: {
      compare: (a, b) => a.avg_salary - b.avg_salary,
    },
  },
];

const onChange: TableProps<MainTableDataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {};

const MainTable = ({
  data,
  selectedRowKeys,
  setSelectedRowKeys,
}: {
  data: MainTableDataType[];
  selectedRowKeys: React.Key[];
  setSelectedRowKeys: React.Dispatch<React.SetStateAction<React.Key[]>>;
}) => {
  const [selectionType, setSelectionType] = useState<"radio">("radio");

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const selectRow = (record: MainTableDataType) => {
    const isPresent = selectedRowKeys.indexOf(record.key) >= 0;

    if (isPresent) {
      setSelectedRowKeys([]);
    } else {
      setSelectedRowKeys([record.key]);
    }
  };

  const rowSelection: TableRowSelection<MainTableDataType> = {
    type: selectionType,
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className="main-table">
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        // onChange={onChange}
        onRow={(record) => ({
          onClick: () => {
            selectRow(record);
          },
        })}
        pagination={{ hideOnSinglePage: true }}
      />
    </div>
  );
};

export default MainTable;
