import Header from "./components/navbar/header"
import { Routes, Route, Form } from "react-router-dom"

function App() {
  

  return (
    <>
      <Header />
      <Routes>
        <Route path="/form" element={<Form />} />
      </Routes>
    </>
  )
}

export default App
