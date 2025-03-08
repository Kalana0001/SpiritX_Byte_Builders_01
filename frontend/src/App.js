import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/Signup/SignUp';
import Signin from './components/SignIn/Signin';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <main>
              <Routes>
                <Route path='/signup' element={<SignUp/>}/>
                <Route path='/' element={<Signin/>}/>
              </Routes>
            </main>
        </BrowserRouter>
    </div>
  );
}

export default App;
