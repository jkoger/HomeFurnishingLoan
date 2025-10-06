import "./App.css";
import { Route, Routes } from "react-router-dom";
import CalculatorPage from "./page/CalculatorPage";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="" element={<CalculatorPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
