import { Outlet } from 'react-router-dom'
import Navbar from '../components/admin/Navbar.jsx'

const Layout = () => {
  return (
    <div>
      <div className='min-h-screen bg-slate-50'>
        <Navbar/>
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout
