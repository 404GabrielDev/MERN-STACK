import Header from "./components/navbar/header"
import { Routes, Route} from "react-router-dom"
import Form from "./components/form/Form"

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
