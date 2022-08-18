import React from 'react';
import { Route, Switch } from 'react-router-dom';

// imported pages
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Products from './pages/Products/Products';
import Checkout from './pages/Checkout/Checkout';
import OrderDetail from './pages/OrderDetail/OrderDetail';
import Orders from './pages/Orders/Orders';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/customer/products" component={ Products } />
      <Route exact path="/customer/orders/:id" component={ OrderDetail } />
      <Route exact path="/customer/orders" component={ Orders } />
      <Route exact path="/customer/checkout" component={ Checkout } />
    </Switch>
  );
}

export default App;
