import { useQuery, useQueryClient } from "@tanstack/react-query";
import getStation from "../apis/api/getStation";
import getLineList from "../apis/services/getLineList";

const fetchLine = async () => {
  const rawData = await getStation();
  return getLineList(rawData);
};

export const useLine = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["line"],
    queryFn: fetchLine,
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
    queryFn: fetchLine,
  });
};
