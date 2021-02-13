import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from "./pages/home/home.pages";
import Products from "./pages/products/products.pages";
import Product from "./pages/product/product.page";
import Navigation from "./components/Navigation/Navigation.component";
import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <Route exact path="/" component={Home} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:id" component={Product} />
    </Router>
  );
}

export default App;
