import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import './App.css';
import {authUserByToken} from './redux/userSlice/userSlice';
import Navigation from "./components/Navigation/Navigation.component";
import Home from "./pages/Home/Home.pages";
const Products = React.lazy(() => import("./pages/Products/Products.pages"));
const Product = React.lazy(() => import("./pages/Product/Product.page"));
const Checkout = React.lazy(() => import("./pages/Checkout/Checkout.page"));
const Payment = React.lazy(() => import("./pages/Payment/Payment.page"));
const OrderDetails = React.lazy(() => import("./pages/OrderDetails/OrderDetails.page"));
const Profile = React.lazy(() => import("./pages/Profile/Profile.page"));


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authUserByToken())
  })
  return (
    <Router>
      <Navigation />
      <Route exact path="/" component={Home} />
      <Suspense fallback={<i className="fas fa-spinner fa-pulse" />} >
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/profile" component={Profile} />
        <Route path="/products/:id" component={Product} />
        <Route path="/orders/:id" component={OrderDetails} />
      </Suspense>
    </Router >
  );
}

export default App;
