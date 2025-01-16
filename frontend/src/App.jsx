import Header from "./components/navbar/header"
import { Routes, Route} from "react-router-dom"
import Form from "./components/form/Form"
import ForgetPassword from "./components/ForgetPassowrd/ForgetPassoword"
import { useState } from "react"

function App() {
  const[username, setUsername] = useState("")

  return (
    <>
      <Header />
      <Routes>
        <Route path="/form" element={<Form setUsername={setUsername}/>} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
      </Routes>
    </>
  )
}

export default App
