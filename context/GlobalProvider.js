import { getCurrentUser } from "@/lib/appwrite";
import React, { createContext, useContext, useState, useEffect} from "react";



// Create the context with an undefined initial value
export const GlobalContext = createContext();
 

// Create a custom hook for easier access to the context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

// Create the provider component  
export const GlobalProvider = ({ children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    getCurrentUser().then((res) => {
      if(res) {
        setIsLoggedIn(true);
        setUser(res);
      } else {
        setIsLoggedIn(False)
        setUser(null)
      }
    }) .catch((error) => {
      console.log(error)
    }). finally(()=> {
      setIsLoading(false)
    })
    
  }, [ ])
  

  return (
    <GlobalContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading, setIsLoading }} >
      
    {children}
    </GlobalContext.Provider>
  );
};