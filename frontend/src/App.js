import {
  
  Routes,
  Route
} from "react-router-dom";

import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Login from './components/Login';
import Dashboard from "./components/Dashboard";
import Add from "./components/Add";
import Addbrand from "./components/Addbrand";
import Addtype from "./components/Addtype";
import Addsub from "./components/Addsub";
import Brand from "./components/Brand";

function App() {
  return(
  <>
        
        <Routes>
        <Route exact path="/test" element={<Brand/>}/>
            <Route exact path="/" element={<Navbar/>}/>
            <Route exact path="/addproductdetail" element={<Add />}/>
            <Route exact path="/addbrand" element={<Addbrand/>}/>
            <Route exact path="/addtype" element={<Addtype/>}/>
            <Route exact path="/addsubcategory" element={<Addsub/>}/>
            <Route exact path="/feed" element={<Feed/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/dashboard" element={<Dashboard/>}/>
        </Routes> 
    </>
  );
}

export default App;