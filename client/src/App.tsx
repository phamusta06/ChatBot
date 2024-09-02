 
import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
 
  return (
    <div className=''>
         <div className="fixed top-0 z-[-2] h-screen w-full  bg-slate-50 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,105,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)] "/>

  <Outlet/>

    </div>
  )
}

export default App
