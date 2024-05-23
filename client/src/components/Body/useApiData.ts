import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { apiDataType } from "./apiData.types";

async function getData(): Promise<apiDataType[]> {
  const res = await axios.get("https://statisticx-api.vercel.app/api/data");
  return res.data;
}

export function useApiData() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["data"],
    queryFn: getData,
  });

  return { data, isLoading, error };
}
