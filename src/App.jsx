import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PumpGraph from './Components/PumpGraph'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PumpGraph />
    </>
  )
}

export default App
