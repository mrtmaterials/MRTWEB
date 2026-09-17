export const company = {
  name: "MRT Materials",
  url: "https://mrtmaterials.com",
  emails: {
    sales: ["sales", "mrtmaterials.com"] as const,
    accounts: ["accountdept", "mrtmaterials.com"] as const,
  },
  // TODO(owner): Verify the address before production launch.
  address: "354/2/3 Nguyễn Văn Linh, Phường Tân Thuận, TP. Hồ Chí Minh, Việt Nam",
  phone: "",
} as const;

