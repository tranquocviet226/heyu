import axios from "axios";
import { deliveryCartType } from "./mock-data";

const url =
  "https://dispatch.qupworld.com/api/v2/agent/setting/delivery_cartypes";

const token = "4b3483f4459ba5a3f6205d9e3244535ce41ef4d6";
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  accept: "application/json",
};

const getDeliveryCartType = async (geo) => {
  // const response = await axios.post(
  //   url,
  //   { geo },
  //   config
  // );

  // Mock data
  return deliveryCartType;
};

const submitDeliveryService = async (data) => {
  const response = await axios.post(url, data, config);
  console.log("response", response);
  return response;
};

export { getDeliveryCartType, submitDeliveryService };
