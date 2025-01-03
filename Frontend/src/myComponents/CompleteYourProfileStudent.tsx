import { ChangeEvent, useContext, useState } from 'react'


import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UserContext } from '@/context/userContext'
import { updateStudentDetailsService } from '@/Services/studentService'
import { toast } from 'sonner'


export function CompleteYourProfileStudent() {

    const {showCompleteProfile , setShowCompleteProfile , userInfo}  = useContext(UserContext)
    const {setUserInfo} = useContext(UserContext);
    

    const [updateUserProfileDetails , setUpdateUserProfileDetails] = useState({});

    const handleChangeDetails = (e : ChangeEvent<HTMLInputElement>) =>{
        
        setUpdateUserProfileDetails({...updateUserProfileDetails , [e.target.name] : e.target.value})


    }

    const handleSaveChanges = async () =>{
         
        try {
            const data = await updateStudentDetailsService({...updateUserProfileDetails , userId : userInfo?._id});

        if (data?.success) {
              toast.success("Profile Updated Successfully")
              setShowCompleteProfile(false);
              setUserInfo(data?.updatedStudentDetails)
              localStorage.setItem("userInfo" , JSON.stringify(data?.updatedStudentDetails))
              setShowCompleteProfile(false)
              
        }
        } catch (error) {
            setShowCompleteProfile(true);
            throw new Error ( error instanceof Error ? error.message  : "Error While saving the updates of student Profile")
        }

    }

  return (
    <Dialog open = {showCompleteProfile} onOpenChange={setShowCompleteProfile}>
      <DialogTrigger asChild>
        
      </DialogTrigger>
      <DialogContent className="w-max">
      <div className="h-full w-[100%] ">
	
	<div className="mx-auto w-[100%] ">
		<div className="flex justify-center px-6 py-12">
			
			<div className="w-full flex">
				
				
				
				<div className="w-full bg-white  p-5 rounded-lg lg:rounded-l-none">
					<h3 className="py-4 text-2xl text-center text-gray-800 dark:text-white">Complete Your Profile!</h3>
                    <p className=' text-xs text-center text-red-500 font-bold'>It's Mandatory</p>
					<form className="px-8 pt-6 pb-8 mb-4 bg-white  rounded">
						<div className="mb-4 md:flex md:justify-between">
							<div className="mb-4 md:mr-2 md:mb-0">
								<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="gender">
                                   Gender
                                </label>
								<input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="gender"
                                    type="text"
                                    name='gender'
                                    placeholder="Gender"
                                    onChange={handleChangeDetails}
                                />
							</div>
							<div className="md:ml-2">
								<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="year">
                                    Year
                                </label>
								<input
                                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                    id="year"
                                    type="text"
                                    placeholder="Year"
                                    name='year'
                                    onChange={handleChangeDetails}
                                />
							</div>
						</div>
						<div className="mb-4">
							<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="email">
                                Branch
                            </label>
							<input
                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="email"
                                type="text"
                                placeholder="branch"
                                name='branch'
                                onChange={handleChangeDetails}
                            />
						</div>
						<div className="mb-4">
							<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="email">
                                section
                            </label>
							<input
                                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="email"
                                type="text"
                                placeholder="section"
                                name='section'
                                onChange={handleChangeDetails}
                            />
						</div>
						<div className="mb-4 md:flex md:justify-between">
						
							<div className="md:ml-2">
								<label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white" htmlFor="c_password">
                                    DOB
                                </label>
								<input
                                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 dark:text-white border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                   
                                    type="date"
                                    name='DOB'
                                    onChange={handleChangeDetails}
                                  
                                />
							</div>
						</div>
						<div className="mb-6 text-center">
							<button
                                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-900 focus:outline-none focus:shadow-outline"
                                type="button"
                                onClick={handleSaveChanges}
                            >
                                Update Profile
                            </button>
						</div>
						<hr className="mb-6 border-t" />
						<div className="text-center text-sm text-blue-500">
							In Case Of Any Problem Contact Your Class Coordinator
						</div>
						
					</form>
                   
				</div>
			</div>
		</div>
	</div>
</div>
      </DialogContent>
    </Dialog>
  )
}




