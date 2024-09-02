import { Outlet } from 'react-router-dom'
import SideBar from '../components/sideBar/SideBar'
import { Helmet } from 'react-helmet-async'

export const Layout = () => {
  return (
    <>
    <Helmet>
        <title>ChatBot</title>
      </Helmet>

     <SideBar/>
     <Outlet/>
    </>
  )
}
