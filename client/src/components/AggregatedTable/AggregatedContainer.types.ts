import { AggregatedTableDataType } from "./AggregatedData.types";

export interface AggregatedContainerDataType {
  year: number;
  jobs: AggregatedTableDataType[];
}
