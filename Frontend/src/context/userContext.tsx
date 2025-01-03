import { createContext, ReactElement, SetStateAction, useState } from "react";

export interface UserContextType {
     userInfo : unknown,
     setUserInfo : (value : SetStateAction<{} | null>) => void,
     showCompleteProfile : boolean,
     setShowCompleteProfile : (value : boolean) => void 

}
export const UserContext = createContext <UserContextType> ({});

export const UserContextProvider = ({children} : {children : ReactElement}) =>{
    
    const [userInfo , setUserInfo] = useState<SetStateAction<{} | null> | null>(localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")!) : null)
    const [showCompleteProfile , setShowCompleteProfile] = useState(false)
    return <UserContext.Provider value={{userInfo , setUserInfo , showCompleteProfile , setShowCompleteProfile}}>
        {children}
    </UserContext.Provider>

}

