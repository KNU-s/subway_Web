import axiosInstance from "../utils/axiosInstance";

const getStation = async () => {
  try {
    const { data } = await axiosInstance.get(`/api/v1/station-info`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default getStation;
