import { BrowserRouter, Routes, Route } from "react-router-dom";
import Expenses from "./components/Expenses";
import ExpensesForm from "./components/ExpensesForm";
import FormUpdateWrapper from "./components/FormUpdateWrapper";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ExpensesForm />
              <Expenses />
            </>
          }
        />
        <Route path="/updateform/:id" element={<FormUpdateWrapper />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
