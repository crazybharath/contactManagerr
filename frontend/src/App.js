import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom' 
import Login from './components/log/Login';
import Signup from './components/log/Signup';
const App=()=> {
 return(
  <>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Login/>} />
    <Route path='/signup' element={<Signup/>}/>
  </Routes>
  </BrowserRouter>
  </>
 )
}