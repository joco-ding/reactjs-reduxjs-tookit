import { Alert, Nav, Navbar } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { setAlert } from "./store"

const Header = () => {
  const alertState = useSelector((state) => state.alert)
  const dispatch = useDispatch()

  const className = (path) => {
    if (window.location.pathname === path) return "active nav-link"
    return "nav-link"
  }

  const removeAlert = async () => {
    await new Promise(resolve => setTimeout(resolve, 5000))
    dispatch(setAlert({ ...alertState, label: '' }))
  }

  if (alertState.label !== '') removeAlert()

  return (
    <>
      <Navbar bg="dark" variant="dark" className="px-3">
        <Navbar.Brand>Logo</Navbar.Brand>
        <Nav className="me-auto">
          <Link to={'/'} className={className('/')}>Beranda</Link>
          <Link to={'/login'} className={className('/login')}>Login</Link>
          <Link to={'/register'} className={className('/register')}>Register</Link>
        </Nav>
      </Navbar>
      {alertState.label !== '' && <Alert variant={alertState.variant} className="w-100">{alertState.label}</Alert>}
    </>
  )
}

export default Header