import { useSelectLineId } from "../context/useSelectLineStore";
import { useLine } from "./useLine";

/**
 * useLine 훅을 사용하여 uniqueLindId에 해당하는 노선의 정보를 반환한다.
 * uniqueLineId - string
 * line.uniqueLineId - number
 */
export const useLineById = () => {
  const { data: lineList, isLoading, error } = useLine();
  const selectLineId = useSelectLineId(); // 전역변수인 현재 선택된 노선으로 노선의 정보 얻는다
  const findLine = lineList.find(
    (line) => line.uniqueLineId === Number(selectLineId)
  );

  return {
    data: findLine,
    isLoading,
    error,
  };
};
