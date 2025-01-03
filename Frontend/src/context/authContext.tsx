import { createContext, ReactNode, useState } from "react";


interface AuthContextProviderProps { 
    children : ReactNode
}

export interface AuthContextType {
    showNext: boolean;
    setShowNext: (value: boolean) => void;
    isLoading : boolean,
    setIsLoading : (value : boolean) => void
}

export const AuthContext = createContext <AuthContextType> ({});
export const AuthContextProvider : React.FC<AuthContextProviderProps> = ({children} ) =>{
    
    const [showNext , setShowNext] = useState<boolean>(false)
   const [isLoading , setIsLoading] = useState<boolean>(false)

    return <AuthContext.Provider value  ={{showNext , setShowNext , isLoading , setIsLoading}}>
        {children}
    </AuthContext.Provider>

}


