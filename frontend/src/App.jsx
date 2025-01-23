import Header from "./components/navbar/header"
import { Routes, Route} from "react-router-dom"
import Form from "./components/form/Form"
import ForgetPassword from "./components/ForgetPassowrd/ForgetPassoword"
import Home from "./components/Home/Home"
import { useState } from "react"
import Footer from "./components/Footer/Footer"
import VerifyAccount from "./components/VerifyAccount/VerifyAccount"

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
        <Route path="/VerifyAccount" element={<VerifyAccount /> } />
      </Routes>
      <Footer />
    </>
  )
}

export default App
