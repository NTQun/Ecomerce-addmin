import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import MainLayout from "./components/MainLayout";
import Enquiries from "./pages/Enquiries";
import Bloglist from "./pages/Bloglist";
import Blogcatlist from "./pages/Blogcatlist";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Colorlist from "./pages/Colorlist";
import Categorylist from "./pages/Categorylist";
import Brandlist from "./pages/Brandlist";
import Productlist from "./pages/Productlist";
import Addblog from "./pages/Addblog";
import Addblogcat from "./pages/Addblogcat";
import Addcolor from "./pages/Addcolor";
import Addcat from "./pages/Addcat";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";
import Couponlist from "./pages/Couponlist";
import AddCoupon from "./pages/AddCoupon";
import ViewEnq from "./pages/ViewEnq";
import { OpenRoutes } from "./routting/OpenRoutes";
import { PrivateRoutes } from "./routting/PrivateRoutes";
import Editproduct from "./pages/EditProduct";
import Editcoupon from "./pages/Editcoupon";
import DeliveryOrder from "./pages/DeliveryOrder";
import ViewDeliveryOrder from "./pages/ViewDeliveryOrder";
import { DeliverRoute } from "./routting/DeliveryRoute";
import Editblog from "./pages/Editblog";
import Statistics from "./pages/Statistics";
import Profile from "./pages/Profile";
import Forgotpassword from "./pages/Forgotpassword";
import Resetpassword from "./pages/Resetpassword";
import Deliveryprofile from "./pages/Deliveryprofile";
import Warehouelist from "./pages/Warehouselist";
import Addproducttowarehouse from "./pages/Addproducttowarehouse";
import Managerlist from "./pages/Mangagerlist";
import Editaccount from "./pages/Editaccount";
import LayoutDelivery from "./components/LayoutDelivery";
import Addaccount from "./pages/Addaccount";
import Deliverylistaccount from "./pages/Deliverylistaccount";
import Importwarehouse from "./pages/Importwarehouse";
import Updatepwadmin from "./pages/Updatepwadmin";
import Updatepwdelivery from "./pages/Updatepwadmin";
import Productdetail from "./pages/Productdetail";
import Blogdetail from "./pages/Blogdetail";
import Orderbydelivery from "./pages/Orderbydelivery";
import Singleorder from "./pages/Singleorder";
import Shipperorder from "./pages/Shipperorder";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <OpenRoutes>
              <Login />
            </OpenRoutes>
          }
        />{" "}
        <Route
          path="/forgot-pw"
          element={
            <OpenRoutes>
              <Forgotpassword />
            </OpenRoutes>
          }
        />
        <Route
          path="reset-password/:token"
          element={
            <OpenRoutes>
              <Resetpassword />
            </OpenRoutes>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoutes>
              <MainLayout />
            </PrivateRoutes>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="enquiries/:id" element={<ViewEnq />} />
          <Route path="blog-list" element={<Bloglist />} />
          <Route path="blog" element={<Addblog />} />
          <Route path="blog/:id" element={<Editblog />} />
          <Route path="coupon-list" element={<Couponlist />} />
          <Route path="coupon" element={<AddCoupon />} />
          <Route path="blog-category-list" element={<Blogcatlist />} />
          <Route path="blog-category" element={<Addblogcat />} />
          <Route path="blog-category/:id" element={<Addblogcat />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order/:id" element={<Singleorder />} />
          <Route path="customers" element={<Customers />} />
          <Route path="list-color" element={<Colorlist />} />
          <Route path="color" element={<Addcolor />} />
          <Route path="color/:id" element={<Addcolor />} />
          <Route path="list-category" element={<Categorylist />} />
          <Route path="category" element={<Addcat />} />
          <Route path="category/:id" element={<Addcat />} />
          <Route path="list-brand" element={<Brandlist />} />
          <Route path="brand" element={<Addbrand />} />
          <Route path="brand/:id" element={<Addbrand />} />
          <Route path="list-product" element={<Productlist />} />
          <Route path="product" element={<Addproduct />} />
          <Route path="coupon/:id" element={<Editcoupon />} />
          <Route path="product/:id" element={<Editproduct />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="profile-admin" element={<Profile />} />
          <Route path="list-warehoue" element={<Warehouelist />} />
          <Route path="add-warehouse" element={<Addproducttowarehouse />} />
          <Route path="add-warehouse/:id" element={<Importwarehouse />} />
          <Route path="manager" element={<Addaccount />} />
          <Route path="list-manager" element={<Managerlist />} />
          <Route path="manager/:id" element={<Editaccount />} />
          <Route path="list-delivery" element={<Deliverylistaccount />} />
          <Route path="delivery/:id" element={<Editaccount />} />
          <Route path="change-pw" element={<Updatepwadmin />} />
          <Route path="order-delivery" element={<DeliveryOrder />} />
          <Route path="product-detail/:id" element={<Productdetail />} />
          <Route path="blog-detail/:id" element={<Blogdetail />} />
          <Route path="order-by-delivery/:id" element={<Orderbydelivery />} />
        </Route>
        <Route
          path="/delivery"
          element={
            <DeliverRoute>
              <LayoutDelivery />
            </DeliverRoute>
          }
        >
          <Route path="profile-delivery" element={<Deliveryprofile />} />
          <Route path="change-pw" element={<Updatepwdelivery />} />
          <Route path="order-by-delivery" element={<Shipperorder />} />
          <Route path="order/:id" element={<Singleorder />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
