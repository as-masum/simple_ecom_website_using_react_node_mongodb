import './App.css';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Nav from './Components/Nav'
import Footer from './Components/Footer'
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import AddProduct from './Components/AddProduct';
import ProductList from './Components/ProductList';
import UpdateProduct from './Components/UpdateProduct';
import PrivateComponent from './Components/PrivateComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Nav />
        <Routes>
          <Route element ={<PrivateComponent />}>
          <Route path='/' element={<ProductList />} />
          <Route path='/add' element={<AddProduct />} />
          <Route path='/update/:id' element={<UpdateProduct/>} />
          <Route path='/logout' element={<h1>Product List</h1>} />
          <Route path='/profile' element={<h1>Profile</h1>} />
          {/* <Route path='/add-product' element={<h1>Add Product</h1>} /> */}
          </Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />

        </Routes>

      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
