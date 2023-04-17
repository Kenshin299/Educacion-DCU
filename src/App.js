import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';
import { auth } from './Firebase';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          setIsAuth(true);
          // ...
          console.log("uid", uid)
        } else {
          setIsAuth(false);
          console.log("user is logged out")
        }
      });
  }, [])

  return (
    <div>
      <BrowserRouter>
          <NavBar auth={isAuth} />
          <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/main' element={<Main auth={isAuth} />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Register />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;