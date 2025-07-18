import axiosInstance from "@/lib/axiosInstance";

export const deleteUser = async () => {
  return await axiosInstance.delete("/user/v1");
};

export const updateNickname = async (nickname: string) => {
  const response = await axiosInstance.patch("/user/v1/nickname", {
    nickname,
  });
  return response.data;
};
