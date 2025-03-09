import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/Signup/SignUp';
import Signin from './components/SignIn/Signin';
import Home from './components/Home/Home';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
        <ToastContainer position="top-right" autoClose={3000} />
        <BrowserRouter>
            <main>
              <Routes>
                <Route path='/' element={<SignUp/>}/>
                <Route path='/signin' element={<Signin/>}/>
                <Route path='/home' element={<Home/>}/>
              </Routes>
            </main>
        </BrowserRouter>
    </div>
  );
}

export default App;
