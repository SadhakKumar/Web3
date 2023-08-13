import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { Sidebar, Navbar } from './components'
import { Home, Profile, CreateCampaign, CompaignDetails } from './pages'

function App() {
  return (
    <div className='relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row'>
      <div className='md:flex hidden mr-10 relative'>
        <Sidebar />
      </div>
      <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/campaign-details/:id' element={<CompaignDetails />} />
          <Route path='/create-campaign' element={<CreateCampaign />} />
        </Routes>

      </div>
    </div>
  )
}

export default App