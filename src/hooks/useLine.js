import { useQuery, useQueryClient } from "@tanstack/react-query";
import getStation from "../apis/api/getStation";
import getLineList from "../apis/services/getLineList";

const fetchLine = async () => {
  const rawData = await getStation();
  return getLineList(rawData);
};

export const useLine = () => {
  const { data } = useQuery({
    queryKey: ["line"],
    queryFn: fetchLine,
  });
  return data;
};

export const usePrefetchLine = () => {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["line"],
    queryFn: fetchLine,
  });
};
