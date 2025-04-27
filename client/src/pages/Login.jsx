import { useState } from "react"
import GlobalContext from "../context/GlobalContext"
import { useContext } from "react"
import axios from 'axios'
export default function Login() {
    const { API_URL, setIsLogin, setUser } = useContext(GlobalContext)
    const initialData = {
        username: "",
        password: ""
    }
    const [data, setData] = useState(initialData)
    function set(e) {
        setData(
            {
                ...data, [e.target.name]: e.target.value
            })

    }

    function onSubmit(e) {
        e.preventDefault()
        console.log(data)
        axios.post(`${API_URL}user/login`, data)
            .then(res => {
                console.log(res);
                setData(initialData)
                if (res.status = 200) {
                    localStorage.setItem('token', res.data.token);
                    setIsLogin(true)
                    setUser(res.data.user.username)

                }
            })
            .catch(err => {
                console.error(err);
            })
    }
    function onStore(e) {
        e.preventDefault()
        console.log(data)
        axios.post(`${API_URL}user`, data)
            .then(res => {
                console.log(res);
                setData(initialData)
            })
            .catch(err => {
                console.error(err);
            })
    }
    return (
        <div className="overlay">
            <div className="container login">
                <form>
                    <div className="mb-3">
                        <label htmlFor="InputUsername" className="form-label">Nome utente</label>
                        <input onChange={set} type="text" name="username" className="form-control" id="InputUsername" value={data.username} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="InputPassword" className="form-label">Password</label>
                        <input onChange={set} type="password" name="password" className="form-control" id="InputPassword" value={data.password} />
                    </div>
                    {/* <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div> */}
                    <div>
                        <button onClick={onSubmit} type="submit" className="btn btn-primary">Accedi</button>
                        <button onClick={onStore} type="" className="btn btn-secondary">Crea account</button>
                    </div>
                </form>

            </div>
        </div>

    )
}