import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Edit from './components/Edit'

function App() {

  return (
    <>
    <Routes>
    <Route path="/" element={<Home/>}></Route>
<Route path='/edit' element={<Edit/>}></Route>

    </Routes>
    </>
  )
}

export default App
