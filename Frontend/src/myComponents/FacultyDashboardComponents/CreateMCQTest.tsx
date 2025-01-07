import { getAllSubjectsService } from "@/Services/subjectService";
import { createNewMCQTestService } from "@/Services/testService";
import { subjectType } from "@/types";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function CreateMCQTest() {
  const [allSubjects, setAllSubjects] = useState<subjectType[]>([]);
  const [testDetails, setTestDetails] = useState({
    testName: "",
    testDescription: "",
    testType: "MCQ",
    noOfQuestions: "",
    totalTime: "",
    subjectId: "",
    branch: "",
    year: "",
    dateOfTest: "",
    isActive: false,
  });

  const navigate = useNavigate();
  const fetchAllSubjectsList = async () => {
    const data = await getAllSubjectsService();

    setAllSubjects(data?.allSubjectsList);
  };

  const handleChangeTestDetails = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    setTestDetails({ ...testDetails, [e.target.name]: e.target.value });
  };

  const handleCreateTest = async (e: SubmitEvent) => {
    e.preventDefault();

    try {
      const data = await createNewMCQTestService(testDetails);

      if (data?.success) {
        toast.success(data?.message);
        navigate("/facultyDashboard/profile");
      }
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Error while creating new MCQ Test"
      );
    }
  };

  useEffect(() => {
    fetchAllSubjectsList();
  }, []);

  return (
    <div>
      <form
        onSubmit={handleCreateTest}
        className="max-w-full h-screen w-[100%] bg-white p-8 shadow-md rounded-lg mt-[2rem]"
      >
        <h1 className="text-2xl text-blue-500 mb-12">Create a New Test</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div>
            <label
              htmlFor="testName"
              className="block text-sm font-medium text-gray-700"
            >
              Test Name:
            </label>
            <input
              type="text"
              id="testName"
              name="testName"
              onChange={handleChangeTestDetails}
              value={testDetails?.testName}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="testDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Test Description (Optional):
            </label>
            <textarea
              id="testDescription"
              name="testDescription"
              onChange={handleChangeTestDetails}
              value={testDetails?.testDescription}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="testName"
              className="block text-sm font-medium text-gray-700"
            >
              Test Type:
            </label>
            <input
              type="text"
              id="testType"
              name="testType"
              readOnly
              value={testDetails?.testType}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="noOfQuestions"
              className="block text-sm font-medium text-gray-700"
            >
              Number of Questions:
            </label>
            <input
              type="number"
              id="noOfQuestions"
              name="noOfQuestions"
              onChange={handleChangeTestDetails}
              value={testDetails?.noOfQuestions}
              min="1"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="totalTime"
              className="block text-sm font-medium text-gray-700"
            >
              Total Time (in minutes):
            </label>
            <input
              type="number"
              id="totalTime"
              name="totalTime"
              onChange={handleChangeTestDetails}
              min="1"
              value={testDetails?.totalTime}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-xs font-bold mb-2"
              htmlFor="subjectId"
            >
              Subject
            </label>
            <select
              id="subjectId"
              name="subjectId"
              onChange={(e) => handleChangeTestDetails(e)}
              value={testDetails?.subjectId}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-purple-300"
            >
              <option value="" defaultChecked>
                Select Subject
              </option>
              {allSubjects.map((subject) => (
                <option key={subject?._id} value={subject?._id}>
                  {subject?.subjectName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="branch"
              className="block text-sm font-medium text-gray-700"
            >
              Branch:
            </label>
            <select
              id="branch"
              name="branch"
              required
              onChange={(e) => handleChangeTestDetails(e)}
              value={testDetails?.branch}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700"
            >
              Year:
            </label>
            <select
              id="year"
              name="year"
              required
              onChange={(e) => handleChangeTestDetails(e)}
              value={testDetails?.year}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="First">First</option>
              <option value="Second">Second</option>
              <option value="Third">Third</option>
              <option value="Fourth">Fourth</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="dateOfTest"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Test:
            </label>
            <input
              type="date"
              id="dateOfTest"
              name="dateOfTest"
              required
              value={testDetails?.dateOfTest}
              onChange={(e) => handleChangeTestDetails(e)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center mt-6">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              onChange={(e) =>
                setTestDetails({ ...testDetails, isActive: e.target.checked })
              }
              checked={testDetails?.isActive}
            />
            <label
              htmlFor="isActive"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Is Active
            </label>
          </div>
        </div>

        <div className=" w-[100%] mt-[20%] flex items-end justify-center">
          <button
            type="submit"
            className="w-[20%]  bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Test
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateMCQTest;
