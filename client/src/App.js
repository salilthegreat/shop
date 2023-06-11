import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
// import Pay from "./pages/Pay";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import Success from "./pages/Success";
import { useSelector } from "react-redux";

function App() {
  let user = useSelector((state)=>state.user.currentUser)

  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/products/:category" element={<ProductList/>}/>
      <Route exact path="/product/:id" element={<Product/>}/>
      <Route exact path="/cart" element={<Cart/>}/>
      {/* <Route exact path="/pay" element={<Pay/>}/> */}
      <Route exact path="/success" element={<Success/>}/>
      <Route exact path="/login" element={ user ? <Navigate to="/"/> : <Login/>}/>
      <Route exact path="/register" element={user ? <Navigate to = "/"/> : <Register/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
