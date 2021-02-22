import React from "react";
import { BrowserRouter, Route, useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Shipping from "./pages/Shipping";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import UserList from "./pages/UserList";
import UserEdit from "./pages/UserEdit";
import ProductList from "./pages/ProductList";
import ProductEdit from "./pages/ProductEdit";
import OrderList from "./pages/OrderList";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/order/:id" component={Order} />
          <Route path="/shipping" component={Shipping} />
          <Route path="/payment" component={Payment} />
          <Route path="/placeorder" component={PlaceOrder} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/product/:id" component={Product} />
          <Route path="/cart/:id?" component={Cart} />
          <Route path="/admin/userlist" component={UserList} />
          <Route path="/admin/user/:id/edit" component={UserEdit} />
          <Route path="/admin/productlist" component={ProductList} exact />
          <Route path="/admin/productlist/:pageNumber" component={ProductList} exact />
          <Route path="/admin/product/:id/edit" component={ProductEdit} />
          <Route path="/admin/orderlist" component={OrderList} />
          <Route path="/search/:keyword" component={Home} exact />
          <Route path="/page/:pageNumber" component={Home} exact />
          <Route path="/search/:keyword/page/:pageNumber" component={Home} exact />
          <Route path="/" component={Home} exact />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
