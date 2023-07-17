import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

function Authenticate() {
    console.log("HERE")

    const navigate = useNavigate()
    useEffect(() => {
        const authStatus = localStorage.getItem('authStatus')
        console.log("HERE")
        if(!authStatus){
            navigate('/login')
        }
      
    }, [])
    
  return (
    <></>
  )
}

export default Authenticate