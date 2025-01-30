import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Error from './pages/Error';
import Signup from './pages/Signup';
import Login from './pages/Login'
import UserDashboard from './pages/UserDashboard';
import { useSelector } from 'react-redux';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const {user} = useSelector((state) => state.profile)
  
  console.log("user",user)
  return (
    <div className='app'>
      <Navbar/>
      <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/signup' element={<Signup/>}/>
         <Route path='/login' element={<Login/>}/>

        {
          user?.role === "user" &&
           (
            <>
              <Route path='/dashboard' element={<UserDashboard/>}/>
            </>
          )
        }

         {
          user?.role === "admin" &&
           (
            <>
              <Route path='/dashboard' element={<AdminDashboard/>}/>
            </>
          )
        } 

         <Route path='*' element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
