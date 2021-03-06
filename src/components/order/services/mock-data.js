const deliveryCartType = [
  {
    dispatch: ["GOJO 4 chỗ", "GOJO 7 chỗ", "Đi riêng 4 chỗ"],
    zoneId: [
      "5fbb3ceb4f0c2493378c8366",
      "5fcee6144f0c39db072e8c50",
      "603dabda4f0ce5e8c52622c2",
      "604981994f0ce5e8c52625ca",
    ],
    zoneName: ["Đà Nẵng", "Hội An", "Tam Kỳ", "Quảng Ngãi"],
    vehicleType: "GOJO 4 chỗ",
    menuId: "",
    menuData: [],
  },
  {
    dispatch: ["GOJO 4 chỗ", "GOJO 7 chỗ", "Đi riêng 7 chỗ"],
    zoneId: [
      "5fbb3ceb4f0c2493378c8366",
      "5fcee6144f0c39db072e8c50",
      "603dabda4f0ce5e8c52622c2",
      "604981994f0ce5e8c52625ca",
    ],
    zoneName: ["Đà Nẵng", "Hội An", "Tam Kỳ", "Quảng Ngãi"],
    vehicleType: "GOJO 7 chỗ",
    menuId: "",
    menuData: [],
  },
  {
    dispatch: [
      "GOJO Bất kỳ",
      "Đi riêng 4 chỗ",
      "Đi riêng 7 chỗ",
      "Taxi 4 chỗ",
      "Taxi 7 chỗ",
    ],
    zoneId: [
      "5fbb3ceb4f0c2493378c8366",
      "5fcee6144f0c39db072e8c50",
      "603dabda4f0ce5e8c52622c2",
    ],
    zoneName: ["Đà Nẵng", "Hội An", "Tam Kỳ"],
    vehicleType: "GOJO Bất kỳ",
    menuId: "",
    menuData: [],
  },
  {
    dispatch: [
      "GOJO Xe máy",
      "Giao hàng nhanh",
      "Giao hàng tiết kiệm",
      "Đi chợ hộ",
      "Giao đồ ăn",
    ],
    zoneId: ["5fbb3ceb4f0c2493378c8366"],
    zoneName: ["Đà Nẵng"],
    vehicleType: "GOJO Xe máy",
    menuId: "",
    menuData: [],
  },
  {
    dispatch: [
      "GOJO Xe máy",
      "Giao hàng nhanh",
      "Giao hàng tiết kiệm",
      "Đi chợ hộ",
      "Giao đồ ăn",
    ],
    zoneId: ["5fbb3ceb4f0c2493378c8366"],
    zoneName: ["Đà Nẵng"],
    vehicleType: "Giao hàng nhanh",
    menuId: "60e2b8e72c9e27256ef63ec7",
    menuData: [
      {
        parentItemId: "60e2b93fbdbf8f25617625c7",
        componentType: "upload-images-row",
        fieldKey: "request.images",
        fieldType: "[String]",
      },
      {
        parentItemId: "60e2b9b82c9e27256ef63ec9",
        componentType: "text-area-row",
        fieldKey: "packageInfo",
        fieldType: "String",
      },
    ],
  },
  {
    dispatch: [
      "GOJO Xe máy",
      "Giao hàng nhanh",
      "Giao hàng tiết kiệm",
      "Đi chợ hộ",
    ],
    zoneId: ["5fbb3ceb4f0c2493378c8366"],
    zoneName: ["Đà Nẵng"],
    vehicleType: "Giao hàng tiết kiệm",
    menuId: "60e2b8e72c9e27256ef63ec7",
    menuData: [
      {
        parentItemId: "60e2b93fbdbf8f25617625c7",
        componentType: "upload-images-row",
        fieldKey: "request.images",
        fieldType: "[String]",
      },
      {
        parentItemId: "60e2b9b82c9e27256ef63ec9",
        componentType: "text-area-row",
        fieldKey: "packageInfo",
        fieldType: "String",
      },
    ],
  },
  {
    dispatch: [
      "GOJO Xe máy",
      "Giao hàng nhanh",
      "Giao hàng tiết kiệm",
      "Đi chợ hộ",
      "Giao đồ ăn",
    ],
    zoneId: ["5fbb3ceb4f0c2493378c8366"],
    zoneName: ["Đà Nẵng"],
    vehicleType: "Giao đồ ăn",
    menuId: "",
    menuData: [],
  },
  {
    dispatch: ["SUV"],
    zoneId: [],
    zoneName: [],
    vehicleType: "SUV",
    menuId: "",
    menuData: [],
  },
  {
    dispatch: ["Taxi 4 chỗ", "Taxi 7 chỗ"],
    zoneId: [
      "5fbb3ceb4f0c2493378c8366",
      "5fcee6144f0c39db072e8c50",
      "603dabda4f0ce5e8c52622c2",
    ],
    zoneName: ["Đà Nẵng", "Hội An", "Tam Kỳ"],
    vehicleType: "Taxi 4 chỗ",
    menuId: "",
    menuData: [],
  },
  {
    dispatch: ["Taxi 7 chỗ"],
    zoneId: [
      "5fbb3ceb4f0c2493378c8366",
      "5fcee6144f0c39db072e8c50",
      "603dabda4f0ce5e8c52622c2",
    ],
    zoneName: ["Đà Nẵng", "Hội An", "Tam Kỳ"],
    vehicleType: "Taxi 7 chỗ",
    menuId: "",
    menuData: [],
  },
  {
    dispatch: [
      "GOJO Xe máy",
      "Giao hàng nhanh",
      "Giao hàng tiết kiệm",
      "Đi chợ hộ",
    ],
    zoneId: ["5fbb3ceb4f0c2493378c8366", "6129e8538f08d78ba5cc5c10"],
    zoneName: ["Đà Nẵng", "Ho Chi Minh"],
    vehicleType: "Đi chợ hộ",
    menuId: "",
    menuData: [],
  },
  {
    dispatch: ["GOJO 4 chỗ", "Đi riêng 4 chỗ"],
    zoneId: [
      "5fbb3ceb4f0c2493378c8366",
      "5fcee6144f0c39db072e8c50",
      "603dabda4f0ce5e8c52622c2",
    ],
    zoneName: ["Đà Nẵng", "Hội An", "Tam Kỳ"],
    vehicleType: "Đi riêng 4 chỗ",
    menuId: "",
    menuData: [],
  },
  {
    dispatch: ["GOJO 7 chỗ", "Đi riêng 7 chỗ"],
    zoneId: [
      "5fbb3ceb4f0c2493378c8366",
      "5fcee6144f0c39db072e8c50",
      "603dabda4f0ce5e8c52622c2",
    ],
    zoneName: ["Đà Nẵng", "Hội An", "Tam Kỳ"],
    vehicleType: "Đi riêng 7 chỗ",
    menuId: "",
    menuData: [],
  },
];

export { deliveryCartType };
