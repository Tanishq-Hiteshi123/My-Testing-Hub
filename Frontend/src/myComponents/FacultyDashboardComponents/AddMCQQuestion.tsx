import { addNewMCQQuestionService } from "@/Services/facultyService";
import { getAllSubjectsService } from "@/Services/subjectService";
import { subjectType } from "@/types";
import { ChangeEvent, useEffect, useState } from "react"
import {  useNavigate } from "react-router-dom";
import { toast } from "sonner";

function AddMCQQuestion() {

    const [allSubjects , setAllSubjects] = useState<subjectType[]>([]);

    const [mcqDetails , setMCQDetails] = useState({quesDescription : "" , options :  ["" , "" , "" , ""] , correctAns : "" , reason : "" , subjectId : ""})
    const [isLoading , setIsLoading] = useState(false)
    const navigate = useNavigate();

    const fetchAllSubjects = async() =>{
        
         try {
            
            const data = await getAllSubjectsService();

            if (data?.success) {
                 setAllSubjects(data?.allSubjectsList);
            }


         } catch (error) {
            throw new Error (error instanceof Error ? error.message : "Error While fetching all the subjects")
         }

    }
    useEffect(() =>{
          
        fetchAllSubjects ()
 
    } , [])


    const handleChange = (e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) =>{
        
        if (e.target.name )
        setMCQDetails({...mcqDetails , [e.target.name] : e.target.value})

    }

    const handleOptionChange = (index : number, value : string) =>{
        
        const options = mcqDetails.options;
        options[index] = value;

        setMCQDetails({...mcqDetails , options})


    }

    const handleSubmit = async (e : SubmitEvent) =>{
          e.preventDefault()
          setIsLoading(true)
        //  Hitting an API for add New MCQ Question :-
       try {
        const data = await addNewMCQQuestionService(mcqDetails);

        if (data?.success) {
              toast.success("New MCQ Question Added SuccessFully")
              setMCQDetails({quesDescription : "" , options :  ["" , "" , "" , ""] , correctAns : "" , reason : "" , subjectId : ""})
              navigate("/facultyDashboard")
        }
       }
       catch (error) {
        
          throw new Error (error instanceof Error ? error.message : "Error while adding new MCQ Question")
        
       }
       finally{
        setIsLoading(false)
       }
    }

    

  return (
    <div className="h-screen w-full p-8">
        <h2 className="text-xl font-bold mb-6  text-blue-700">Add MCQ Question</h2>
     <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-lg mx-auto mt-1"
    >

      {/* Question Description */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quesDescription">
          Question Description
        </label>
        <textarea
          id="quesDescription"
          name="quesDescription"
          onChange={handleChange}
          placeholder="Enter the question description"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-purple-300"
        />
      </div>

      {/* Options */}
      
      {
         Array(4).fill(null).map((_ , index) =>{
           return <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor={`option`}
            >
              Option {index+1}
            </label>
            <input
             
               name=""
               onChange={(e) => handleOptionChange(index, e.target.value)} 
              placeholder={`Enter Option ${ index + 1}`}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-purple-300"
            />
          </div>
         })
      }


      {/* Correct Answer */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="correctAns">
          Correct Answer
        </label>
        <input
          id="correctAns"
          name="correctAns"
          onChange={handleChange}
          placeholder="Enter the correct answer"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-purple-300"
        />
      </div>

      {/* Reason */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reason">
          Explanation (Optional)
        </label>
        <textarea
          id="reason"
          name="reason"
           onChange={handleChange}
          placeholder="Provide a reason or explanation"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-purple-300"
        />
      </div>

      {/* Subject ID */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subjectId">
          Subject
        </label>
        <select
          id="subjectId"
          name="subjectId"
          onChange={(e) => setMCQDetails({...mcqDetails , subjectId : e.target.value})}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-purple-300"
        >
          <option value="" defaultChecked >
            Select Subject
          </option>
          {allSubjects.map((subject) => (
            <option key={subject?._id} value={subject?._id}>
              {subject?.subjectName}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-purple-300"
        >
          {
            isLoading ? "LOADING..." : <p>ADD</p>
          }
        </button>
      </div>
    </form>
    </div>
  )
}

export default AddMCQQuestion
