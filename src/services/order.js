import axios from "axios";
import { deliveryCartType } from "./mock-data";

const url =
  "https://dispatch.qupworld.com/api/v2";

const token = "4b3483f4459ba5a3f6205d9e3244535ce41ef4d6";
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  accept: "application/json",
};

const getDeliveryCartType = async (geo) => {
  // const response = await axios.post(
  //   `${url}/agent/setting/delivery_cartypes`,
  //   { geo },
  //   config
  // );

  // Mock data
  return deliveryCartType;
};

const estimateCostService = async (data) => {
  // const response = await axios.post(
  //   `${url}/agent/eta/delivery_fare`,
  //   data,
  //   config
  // );

  return;
};

const submitDeliveryService = async (data) => {
  const response = await axios.post(url, data, config);
  return response;
};

export { getDeliveryCartType, estimateCostService, submitDeliveryService };
