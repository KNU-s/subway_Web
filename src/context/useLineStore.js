import { create } from "zustand";
import getStation from "../apis/api/getStation";
import getLineList from "../apis/services/getLineList";

const useLineStore = create((set, get) => ({
  lineList: [],

  fetch: {
    fetchLineList: async () => {
      await getStation()
        .then(getLineList)
        .then((lineList) => get().actions.setLineList(lineList))
        .catch((error) => console.log(error));
    },
  },

  actions: {
    setLineList: (list) => {
      set({ lineList: list });
    },
  },
}));

export const useLineList = () => useLineStore((state) => state.lineList);
export const useLineFetch = () => useLineStore((state) => state.fetch);
