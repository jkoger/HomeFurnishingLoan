import Calculator from "../components/Calculator";
import Contact from "../components/Contact";
import Info from "../components/Info";
import "./CalculatorPage.css";

function CalculatorPage() {
  return (
    <main className="calculator-page">
      <Info />
      <Calculator />
      <Contact />
    </main>
  );
}

export default CalculatorPage;
