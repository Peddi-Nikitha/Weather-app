// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import './App.css'
import Weather from './components/weather'

function App() {
  return (
    <>
    <div className={"bg-[#7e56c3]/40 w-screen h-screen flex items-center justify-center"}>
      <div className=' shadow-lg shadow-[#7e56c3]/40  rounded-md bg-[#9575cd] w-[450px] h-[550px]'>
     <Weather/>
     </div>
     </div>
    </>
  )
}

export default App
