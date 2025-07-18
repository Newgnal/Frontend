import axiosInstance from "@/lib/axiosInstance";

export const submitInquiry = async (
  email: string,
  title: string,
  body: string
) => {
  const response = await axiosInstance.post("/inquiry/v1", {
    email,
    title,
    body,
  });
  return response.data;
};
