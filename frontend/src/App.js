import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from './components/Register';
import Header from './components/Header';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route element={<Register/>} path="/register"/>
          <Route element={<Register/>} path="/"></Route>




        </Routes>


      </BrowserRouter>
    </div>
  );
}

export default App;
