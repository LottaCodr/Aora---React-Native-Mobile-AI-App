import { useEffect, useState } from "react"
import { Alert } from "react-native"

const  useAppwrite = (fn: any) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fn();
        setData(response ?? [])
  
      } catch (error: any) {
        Alert.alert('Error:', error.message)
  
      } finally {
  
      }
    }
  
    fetchData();
  }, []);

  return { data }
}



export default useAppwrite;