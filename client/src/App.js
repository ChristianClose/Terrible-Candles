import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from "./pages/home/home.pages";
import Products from "./pages/products/products.pages";
import Navigation from "./components/Navigation/Navigation.component";
import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <Route exact path="/" component={Home} />
      <Route exact path="/products" component={Products} />
    </Router>
  );
}

export default App;
