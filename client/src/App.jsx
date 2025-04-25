
import { BrowserRouter, Routes, Route } from 'react-router'
import GlobalContext from "./context/GlobalContext"
import DefaulLayout from "./layouts/DefaulLayout"
import Home from "./pages/Home"
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [isLogin, setIsLogin] = useState(false)
  const [user, setUser] = useState(null)
  const API_URL = 'http://localhost:3000/'
  function checkUser() {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get(`${API_URL}verify-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        console.log(res)
        setUser(res.data.username)
        setIsLogin(true)
      })
      .catch((err) => {
        console.error(err)
        // se il token è scaduto o non valido
      });
  }
  useEffect(() => {
    checkUser()
  }, []);
  return (
    <GlobalContext.Provider value={{ API_URL, isLogin, setIsLogin, setUser, user, checkUser }}>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaulLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  )
}

export default App