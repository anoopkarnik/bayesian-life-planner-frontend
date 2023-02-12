import React from 'react'
import Footer from './Footer'
import Topbar from './Topbar'
import Sidebar from './Sidebar'

const Layout = ({children}) => {
  return (
    <Sidebar>
        <div class='row mt-3'>
                <Topbar/>
        </div> 
        <div class='row mt-3'>
                <main>
                        {children}
                </main>
        </div>
        <div class='row mt-3'> 
                <Footer/>
        </div>        
    </Sidebar>
  )
}

export default Layout