import React from 'react'
import { Outlet } from 'react-router-dom'
import SmoothScrollProvider from './components/smoothScrollProvider'

import Latestfooter from './Pages/Footer'

function App() {
  
     return(
        <>
        
         <Outlet />   {/* ← this renders whichever child route matches */}
            <Latestfooter></Latestfooter>
        
        </>
            
           
        
    )
  
}

export default App
