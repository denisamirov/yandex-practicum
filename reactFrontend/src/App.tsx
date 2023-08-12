import { Routes, Route } from 'react-router'
import { Registration } from '../components/Registration'
import { AboutMe } from '../components/AboutMe'
import {Login} from '../components/Login'
import {Forma} from '../components/Forma'
import './App.css'
import { Logout } from '../components/Logout'
import { Myoutube } from '../components/Myoutube'
import { TaskJs } from '../components/TaskJs'
import { Header } from '../components/Header'


function App() {


  const storedUser = localStorage.getItem('user');
  const linkVideo:string = '_49nYU5dEvM'


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<AboutMe />} />
        <Route path="/regi" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/task" element={storedUser ? <TaskJs /> : <Login />}/>
        <Route path="/youtube" element={storedUser ? <Myoutube video = {linkVideo} /> : <Login />} />
        <Route path="/content" element={storedUser ? <Forma /> : <Login />} />
      </Routes>
    </>
  )
}

export default App
