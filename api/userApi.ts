import axiosInstance from "@/lib/axiosInstance";

export const deleteUser = async () => {
  return await axiosInstance.delete("/user/v1");
};
