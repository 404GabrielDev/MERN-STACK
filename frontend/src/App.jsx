import Header from "./components/navbar/header"
import { Routes, Route} from "react-router-dom"
import Form from "./components/form/Form"
import ForgetPassword from "./components/ForgetPassowrd/ForgetPassoword"

function App() {
  

  return (
    <>
      <Header />
      <Routes>
        <Route path="/form" element={<Form />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
      </Routes>
    </>
  )
}

export default App
