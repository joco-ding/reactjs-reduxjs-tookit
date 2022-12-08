import { useState } from "react"
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { ApiPost } from "./api"
import Header from "./Header"
import { setAlert } from "./store"

const Login = () => {
  const [userid, setUserID] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleButton = async () => {
    if (userid === '' || password === '') {
      dispatch(setAlert({ variant: 'warning', label: 'Mohon lengkapi isian' }))
      return
    }
    const respon = await ApiPost('/user/signin', JSON.stringify({ userid, password }))
    let alertMsg = 'Gagal Login'
    if (typeof respon.status === 'number' && respon.status === 200 && typeof respon.data !== 'undefined') {
      const { ok, message, data } = respon.data
      if (typeof data === 'string') alertMsg = data
      if (typeof ok === 'boolean' && ok === true) {
        localStorage.setItem('token', data)
        dispatch(setAlert({ variant: 'success', label: 'Berhasil Login' }))
        await new Promise(r => setTimeout(r, 3000))
        navigate('/')
        return
      }
      alertMsg = message
    }
    dispatch(setAlert({ variant: 'danger', label: alertMsg }))
  }

  return (
    <>
      <Header />
      <main className="form-container">
        <Form className="form-box w-100 m-auto">
          <h1 className="h3 mb-3 fw-normal">Login</h1>
          <p>Belum Registrasi? <Link to="/register">Register</Link></p>
          <FloatingLabel label="User ID" controlId="formUserID">
            <Form.Control className="atas" placeholder="jhondoe" onChange={(e) => setUserID(e.target.value.trim())}></Form.Control>
          </FloatingLabel>
          <FloatingLabel label="Password" controlId="formPassword">
            <Form.Control className="bawah" placeholder="pasword" type="password" onChange={(e) => setPassword(e.target.value.trim())}></Form.Control>
          </FloatingLabel>
          <Button className="w-100 mt-3" onClick={handleButton}>Login</Button>
        </Form>
      </main>
    </>
  )
}

export default Login