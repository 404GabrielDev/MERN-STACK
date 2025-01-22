import Header from "./components/navbar/header"
import { Routes, Route} from "react-router-dom"
import Form from "./components/form/Form"
import ForgetPassword from "./components/ForgetPassowrd/ForgetPassoword"
import Home from "./components/Home/Home"
import { useState } from "react"

function App() {
  const[username, setUsername] = useState("")

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form setUsername={setUsername}/>} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
