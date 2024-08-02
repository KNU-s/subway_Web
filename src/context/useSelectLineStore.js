import { create } from "zustand";

/**
 * 현재 선택된 노선 관련 정보
 * 1. 선택된 노선의 id, name
 * 2. 선택된 노선의 모든 지하철 역 배열
 */
const useSelectLineStore = create((set) => ({
  selectLineId: null,
  selectLineName: null,
  stationList: [], // 선택된 노선의 모든 지하철 역 배열

  actions: {
    setSelectLineId: (id) => {
      set({ selectLineId: id });
    },
    setSelectLineName: (name) => {
      set({ selectLineName: name });
    },
    setStationList: (list) => {
      set({ stationList: list });
    },
  },
}));

export const useSelectLineId = () =>
  useSelectLineStore((state) => state.selectLineId);
export const useSelectLineName = () =>
  useSelectLineStore((state) => state.selectLineName);
export const useStationList = () =>
  useSelectLineStore((state) => state.stationList);

export const useSetSelectLineId = () =>
  useSelectLineStore((state) => state.actions.setSelectLineId);
export const useSetSelectLineName = () =>
  useSelectLineStore((state) => state.actions.setSelectLineName);
export const useSetStationList = () =>
  useSelectLineStore((state) => state.actions.setStationList);
