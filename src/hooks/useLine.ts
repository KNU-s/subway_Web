import { LineList } from "@/types/line";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getLineList } from "../apis/services/stationInfoService";

interface UseLineResult {
  data: LineList;
  isLoading: boolean;
  error: Error | null;
}

export const useLine = (): UseLineResult => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["line"],
    queryFn: getLineList,
  });

  if (isLoading) {
    return { data: [], isLoading: true, error: null };
  }

  if (error) {
    console.log("[useLine] error");
    return { data: [], isLoading: false, error };
  }

  // return 값이 무조건 배열 형식을 가지도록 한다
  return {
    data: Array.isArray(data) ? data : [],
    isLoading: false,
    error: null,
  };
};

export const usePrefetchLine = () => {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["line"],
    queryFn: getLineList,
  });
};
