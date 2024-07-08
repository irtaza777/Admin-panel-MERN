import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateComponent from './components/PrivateComponent'
import Nav from "./components/Nav"
import Footer from "./components/footer"
import Login from "./components/Login"
import Addproduct from "./components/Addproduct"
import Productlist from "./components/Productlist"
import Updateproduct from "./components/Updateproduct"
import Jsondata from "./components/Jsondata"
import Singledata from "./components/Singledata"


import Signup from "./components/signup"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    
          <div className="App">
            <BrowserRouter>
              <Nav />
              <Routes>
<Route element={<PrivateComponent/>}>
                <Route path="/" element={<Productlist/>}>            </Route>
                <Route path="/add" element={<Addproduct/>}></Route>
                <Route path="/Update/:id" element={<Updateproduct/>}></Route>
                <Route path="/Logout" element={<h3>logout Page</h3>}></Route>
                <Route path="/profile" element={<h3>profile Page</h3>}></Route>
            <Route path="/jsondata" element={<Jsondata />}></Route>
            <Route path="/singledata/:userId" element={<Singledata/>}></Route>

                </Route>

                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/Login" element={<Login />}></Route>

              </Routes>
            </BrowserRouter>
    <Footer />

          </div>

       
  );
}

export default App;
