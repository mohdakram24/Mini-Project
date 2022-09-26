import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from './components/Register';
import Header from './components/Header';
import ImageEditor from './components/ImageEditor';
import Login from './components/Login';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route element={<Login/>} path="/"></Route>
          <Route element={<Register/>} path="/register"/>
          <Route element={<ImageEditor/>} path="imageEditor"></Route>





        </Routes>


      </BrowserRouter>
    </div>
  );
}

export default App;
