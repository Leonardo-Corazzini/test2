
import { BrowserRouter, Routes, Route } from 'react-router'
import GlobalContext from "./context/GlobalContext"
import DefaulLayout from "./layouts/DefaulLayout"
import Home from "./pages/Home"
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const [isLogin, setIsLogin] = useState(false)
  const [user, setUser] = useState(null)
  const [modify, setModify] = useState(false)
  const [propDoc, setPropDoc] = useState(null)
  const [document, setDocument] = useState([])
  const API_URL = 'http://localhost:3000/'

  function fetchData() {


    axios.get(`${API_URL}data`)
      .then(res => {
        // console.log(res);
        setDocument(res.data)
      })
      .catch(err => {
        console.error(err);
      })
  }
  function checkUser() {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios.get(`${API_URL}verify-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        // console.log(res)
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
    <GlobalContext.Provider value={{ API_URL, isLogin, setIsLogin, setUser, user, checkUser, modify, setModify, propDoc, setPropDoc, document, setDocument, fetchData }}>
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