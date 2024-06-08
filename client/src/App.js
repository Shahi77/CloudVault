import "./App.css";
import homePage from "./pages/homePage/homePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<homePage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
