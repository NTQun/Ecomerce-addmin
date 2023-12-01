import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
  AiOutlineLogout,
  AiOutlineUserAdd,
  AiOutlineOrderedList,
} from "react-icons/ai";
import { CiDeliveryTruck } from "react-icons/ci";
import { RiCouponLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ImBlog } from "react-icons/im";
import { RiUser2Fill } from "react-icons/ri";
import { FaClipboardList, FaBloggerB, FaWarehouse } from "react-icons/fa";
import { BsFillBasketFill } from "react-icons/bs";

import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { FcMoneyTransfer, FcShipped } from "react-icons/fc";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineAccountTree } from "react-icons/md";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const authState = useSelector((state) => state?.auth.user);
  const navigate = useNavigate();

  return (
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">TQ</span>
            <span className="lg-logo">Trung Quan</span>
          </h2>
        </div>
        {authState.role == "admin" && (
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[""]}
            onClick={({ key }) => {
              if (key === "signout") {
                localStorage.clear();
                navigate("/");
                window.location.reload();
              } else {
                navigate(key);
              }
            }}
            items={[
              {
                key: "",
                icon: <AiOutlineDashboard className="fs-4" />,
                label: "Dashboard",
              },
              {
                key: "customers",
                icon: <AiOutlineUser className="fs-4" />,
                label: "Customers",
              },
              {
                key: "Manger Acc",
                icon: <MdOutlineAccountTree className="fs-4" />,
                label: "Account",
                children: [
                  {
                    key: "manager",
                    icon: <AiOutlineUserAdd className="fs-4" />,
                    label: "Add Account",
                  },
                  {
                    key: "list-manager",
                    icon: <FcShipped className="fs-4" />,
                    label: "Manager List",
                  },
                  {
                    key: "list-delivery",
                    icon: <FcShipped className="fs-4" />,
                    label: "Delivery List",
                  },
                ],
              },
              {
                key: "Catalog",
                icon: <AiOutlineShoppingCart className="fs-4" />,
                label: "Catalog",
                children: [
                  {
                    key: "product",
                    icon: <AiOutlineShoppingCart className="fs-4" />,
                    label: "Add Product",
                  },
                  {
                    key: "list-product",
                    icon: <AiOutlineShoppingCart className="fs-4" />,
                    label: "Product List",
                  },
                  {
                    key: "brand",
                    icon: <SiBrandfolder className="fs-4" />,
                    label: "Brand",
                  },
                  {
                    key: "list-brand",
                    icon: <SiBrandfolder className="fs-4" />,
                    label: "Brand List ",
                  },
                  {
                    key: "category",
                    icon: <BiCategoryAlt className="fs-4" />,
                    label: "Category",
                  },
                  {
                    key: "list-category",
                    icon: <BiCategoryAlt className="fs-4" />,
                    label: "Category List",
                  },
                  {
                    key: "color",
                    icon: <AiOutlineBgColors className="fs-4" />,
                    label: "Color",
                  },
                  {
                    key: "list-color",
                    icon: <AiOutlineBgColors className="fs-4" />,
                    label: "Color List",
                  },
                ],
              },
              {
                key: "Warehouse",
                icon: <FaWarehouse className="fs-4" />,
                label: "Coupon",
                children: [
                  {
                    key: "list-warehoue",
                    icon: <ImBlog className="fs-4" />,
                    label: "Coupon list",
                  },
                  {
                    key: "add-warehouse",
                    icon: <FaBloggerB className="fs-4" />,
                    label: "Import-product-Coupon",
                  },
                ],
              },
              {
                key: "Orderrrrr",
                icon: <BsFillBasketFill className="fs-4" />,
                label: "Order",
                children: [
                  {
                    key: "orders",
                    icon: <AiOutlineOrderedList className="fs-4" />,
                    label: "All Orders",
                  },
                  {
                    key: "order-delivery",
                    icon: <CiDeliveryTruck className="fs-4" />,
                    label: "Add Order for Delivery",
                  },
                ],
              },
              {
                key: "marketing",
                icon: <RiCouponLine className="fs-4" />,
                label: "Marketing",
                children: [
                  {
                    key: "coupon",
                    icon: <ImBlog className="fs-4" />,
                    label: "Add Discount Code",
                  },
                  {
                    key: "coupon-list",
                    icon: <RiCouponLine className="fs-4" />,
                    label: "Discount Code List",
                  },
                ],
              },
              {
                key: "blogs",
                icon: <FaBloggerB className="fs-4" />,
                label: "Blogs",
                children: [
                  {
                    key: "blog",
                    icon: <ImBlog className="fs-4" />,
                    label: "Add Blog",
                  },
                  {
                    key: "blog-list",
                    icon: <FaBloggerB className="fs-4" />,
                    label: "Blog List",
                  },
                  {
                    key: "blog-category",
                    icon: <ImBlog className="fs-4" />,
                    label: "Add Blog Category",
                  },
                  {
                    key: "blog-category-list",
                    icon: <FaBloggerB className="fs-4" />,
                    label: "Blog Category List",
                  },
                ],
              },
              {
                key: "enquiries",
                icon: <FaClipboardList className="fs-4" />,
                label: "Enquiries",
              },
              {
                key: "statistics",
                icon: <FcMoneyTransfer className="fs-4" />,
                label: "Statistics",
              },
              {
                key: "signout",
                icon: <AiOutlineLogout className="fs-4" />,
                label: "Sign Out",
              },
            ]}
          />
        )}{" "}
        {authState.role == "manager" && (
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[""]}
            onClick={({ key }) => {
              if (key === "signout") {
                localStorage.clear();
                navigate("/");
              } else {
                navigate(key);
              }
            }}
            items={[
              {
                key: "",
                icon: <AiOutlineDashboard className="fs-4" />,
                label: "Dashboard",
              },
              {
                key: "customers",
                icon: <AiOutlineUser className="fs-4" />,
                label: "Customers",
              },
              {
                key: "Manger Acc",
                icon: <MdOutlineAccountTree className="fs-4" />,
                label: "Account",
                children: [
                  {
                    key: "manager",
                    icon: <AiOutlineUserAdd className="fs-4" />,
                    label: "Add Account",
                  },

                  {
                    key: "list-delivery",
                    icon: <FcShipped className="fs-4" />,
                    label: "Delivery List",
                  },
                ],
              },
              {
                key: "Catalog",
                icon: <AiOutlineShoppingCart className="fs-4" />,
                label: "Catalog",
                children: [
                  {
                    key: "product",
                    icon: <AiOutlineShoppingCart className="fs-4" />,
                    label: "Add Product",
                  },
                  {
                    key: "list-product",
                    icon: <AiOutlineShoppingCart className="fs-4" />,
                    label: "Product List",
                  },
                  {
                    key: "brand",
                    icon: <SiBrandfolder className="fs-4" />,
                    label: "Brand",
                  },
                  {
                    key: "list-brand",
                    icon: <SiBrandfolder className="fs-4" />,
                    label: "Brand List ",
                  },
                  {
                    key: "category",
                    icon: <BiCategoryAlt className="fs-4" />,
                    label: "Category",
                  },
                  {
                    key: "list-category",
                    icon: <BiCategoryAlt className="fs-4" />,
                    label: "Category List",
                  },
                  {
                    key: "color",
                    icon: <AiOutlineBgColors className="fs-4" />,
                    label: "Color",
                  },
                  {
                    key: "list-color",
                    icon: <AiOutlineBgColors className="fs-4" />,
                    label: "Color List",
                  },
                ],
              },
              {
                key: "Coupon",
                icon: <FaWarehouse className="fs-4" />,
                label: "Warehouse",
                children: [
                  {
                    key: "list-Coupon",
                    icon: <ImBlog className="fs-4" />,
                    label: "Warehouse list",
                  },
                  {
                    key: "add-warehouse",
                    icon: <FaBloggerB className="fs-4" />,
                    label: "Import-product-Coupon",
                  },
                ],
              },
              {
                key: "Orderrrrr",
                icon: <BsFillBasketFill className="fs-4" />,
                label: "Order",
                children: [
                  {
                    key: "orders",
                    icon: <AiOutlineOrderedList className="fs-4" />,
                    label: "All Orders",
                  },
                  {
                    key: "order-delivery",
                    icon: <CiDeliveryTruck className="fs-4" />,
                    label: "Add Order for Delivery",
                  },
                ],
              },
              {
                key: "marketing",
                icon: <RiCouponLine className="fs-4" />,
                label: "Marketing",
                children: [
                  {
                    key: "coupon",
                    icon: <ImBlog className="fs-4" />,
                    label: "Add Discount Code",
                  },
                  {
                    key: "coupon-list",
                    icon: <RiCouponLine className="fs-4" />,
                    label: "Discount Code List",
                  },
                ],
              },
              {
                key: "blogs",
                icon: <FaBloggerB className="fs-4" />,
                label: "Blogs",
                children: [
                  {
                    key: "blog",
                    icon: <ImBlog className="fs-4" />,
                    label: "Add Blog",
                  },
                  {
                    key: "blog-list",
                    icon: <FaBloggerB className="fs-4" />,
                    label: "Blog List",
                  },
                  {
                    key: "blog-category",
                    icon: <ImBlog className="fs-4" />,
                    label: "Add Blog Category",
                  },
                  {
                    key: "blog-category-list",
                    icon: <FaBloggerB className="fs-4" />,
                    label: "Blog Category List",
                  },
                ],
              },
              {
                key: "enquiries",
                icon: <FaClipboardList className="fs-4" />,
                label: "Enquiries",
              },
              {
                key: "statistics",
                icon: <FcMoneyTransfer className="fs-4" />,
                label: "Statistics",
              },
              {
                key: "signout",
                icon: <AiOutlineLogout className="fs-4" />,
                label: "Sign Out",
              },
            ]}
          />
        )}
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <Link to="/admin/profile-admin">
                <RiUser2Fill className="fs-4" />
              </Link>
            </div>

            <div className="d-flex gap-3 align-items-center dropdown">
              <div
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">{authState.lastname}</h5>
                <p className="mb-0">{authState.email}</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/admin/profile-admin"
                  >
                    View Profile
                  </Link>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/admin/change-pw"
                  >
                    Change password
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
