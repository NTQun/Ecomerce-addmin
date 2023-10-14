import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllOrderDeliver,
  updateOrderDeliver,
} from "./../features/delivery/deliverySlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Detail Order",
    dataIndex: "detailorder",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: " Address",
    dataIndex: "address",
  },
  {
    title: "Sub Address",
    dataIndex: "subaddress",
  },

  {
    title: "Mobile",
    dataIndex: "mobile",
  },

  {
    title: "Actions",
    dataIndex: "action",
  },
];

const DeliveryOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllOrderDeliver());
  }, []);
  const orderState = useSelector(
    (state) => state?.delivery?.deliveryOrder?.orders
  );
  const data1 = [];

  const upateOrderStatus = (a, b) => {
    dispatch(updateOrderDeliver({ id: a, status: b }));
  };

  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i].user?.firstname,
      detailorder: (
        <Link to={`/delivery/order/${orderState[i]?._id}`}>View Orders</Link>
      ),
      amount: orderState[i].totalPrice,
      date: new Date(orderState[i].createdAt).toLocaleDateString(),
      mobile: orderState[i]?.shippingInfo?.mobile,
      address: orderState[i]?.shippingInfo?.address,
      subaddress: orderState[i]?.shippingInfo?.other,

      action: (
        <>
          <select
            name=""
            defaultValue={orderState[i]?.orderStatus}
            onChange={(e) =>
              upateOrderStatus(orderState[i]?._id, e.target.value)
            }
            className="form-control form-select"
            id=""
          >
            <option value="Ordered" disabled selected>
              Ordered
            </option>
            <option value="Processed">Processed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out For Delievery">Out For Delievery</option>
            <option value="Delivered">Delivered</option>
          </select>
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
          className="mb-4 mt-3 position-absolute"
          style={{ color: "white", backgroundColor: "red", right: "30px" }}
          onClick={(e) => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default DeliveryOrder;
