import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getLineList } from "../apis/services/stationInfoService";

export const useLine = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["line"],
    queryFn: getLineList,
  });

  if (isLoading) {
    // console.log("[useLine] loading");
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
