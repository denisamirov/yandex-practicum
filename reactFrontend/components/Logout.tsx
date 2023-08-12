import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'


export const Logout = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        localStorage.setItem('user', '')
        return navigate("/content")
    })


  return (
    <div>Ожидайте...</div>
  )
}
