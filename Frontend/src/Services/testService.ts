import { axiosInstance } from "@/utils/axiosInstance";

export const getTestDetailsByIdService = async (testId: string) => {
  const { data } = await axiosInstance.get(`test/getTestById/${testId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("testHubToken")}`,
    },
  });
  return data;
};

export const evaluateStudentMCQTestService = async (
  testId: string,
  userId: string,
  answersObj: unknown
) => {
  const { data } = await axiosInstance.post(
    `/test/evaluateTheTestAfterSubmission/${testId}`,
    { userId, answersObj },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("testHubToken")}`,
      },
    }
  );

  return data;
};

export const createNewMCQTestService = async (testDetails: unknown) => {
  const { data } = await axiosInstance.post(
    `/test/createNewMCQTest`,
    testDetails,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("testHubToken")}`,
      },
    }
  );

  return data;
};
