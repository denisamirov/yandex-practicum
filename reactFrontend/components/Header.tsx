import { Mynavbar } from '../components/Mynavbar'
import { useState, useEffect } from 'react'

export const Header = () => {
    const [storedUser, setUser] = useState(localStorage.getItem('user'))

    useEffect(() => {
        const handleLocalStorageChange = () => {
            setUser(localStorage.getItem('user'));
        };
      
        window.addEventListener('storage', handleLocalStorageChange);
      
        return () => {
          window.removeEventListener('storage', handleLocalStorageChange, false);
        };
      }, [storedUser]);

  return (
    <>
        <div className="fixeda">{storedUser === null || storedUser === '' ? `Вход не выполнен` : <Mynavbar user = {storedUser}></Mynavbar>}</div>
    </>
  )
}
