import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from "./pages/home/home.pages";
import Products from "./pages/products/products.pages";
import Product from "./pages/product/product.page";
import Navigation from "./components/Navigation/Navigation.component";
import Checkout from './pages/Checkout/Checkout.page';
import Payment from './pages/Payment/Payment.page';
import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <Route exact path="/" component={Home} />
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/payment" component={Payment} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:id" component={Product} />
    </Router>
  );
}

export default App;
