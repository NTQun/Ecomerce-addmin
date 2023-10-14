import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrderDelivery } from "./../features/delivery/deliverySlice";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product Name",
    dataIndex: "name",
  },
  {
    title: "Product Image",
    dataIndex: "img",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Count",
    dataIndex: "count",
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
];

const ViewDeliveryOrder = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  console.log(location.pathname);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderDelivery(orderId));
  }, []);
  const orderState = useSelector(
    (state) => state?.delivery?.singleOrderDelivery?.orders
  );

  const data1 = [];
  for (let i = 0; i < orderState?.orderItems?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState?.orderItems[i]?.product?.title,
      brand: orderState?.orderItems[i]?.product?.brand,
      count: orderState?.orderItems[i]?.quantity,
      amount: orderState?.orderItems[i]?.price,
      color: orderState?.orderItems[i]?.color?.title,
      img: (
        <>
          <img
            src={orderState?.orderItems[i]?.product?.images[0]?.url}
            style={{ width: "50px", height: "50px" }}
            alt=""
          />
        </>
      ),
    });
  }
  return (
    <div>
      <div className="d-flex position ">
        <h3 className="mb-4 mt-3 px-3 " style={{ color: "blue" }}>
          Delivery Orders
        </h3>
        <button
          className="mb-4 mt-3 position-absolute "
          style={{ color: "white", backgroundColor: "red", right: "30px" }}
          onClick={(e) => {
            navigate("/delivery/order");
          }}
        >
          <MdOutlineKeyboardBackspace />
          Back
        </button>
      </div>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewDeliveryOrder;
