import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Product",
    dataIndex: "product",
    sorter: (a, b) => a.product.length - b.product.length,
  },
  {
    title: "Product Img",
    dataIndex: "img",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: " Statistics",
    dataIndex: "statistics",
    sorter: (a, b) => a.statistics - b.statistics,
  },
];

const Statistic = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state.auth.orders.orders);
  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    for (let j = 0; j < orderState[i].orderItems.length; j++) {
      const statics =
        orderState[i].orderItems[j].quantity *
        (orderState[i].orderItems[j].product.price -
          orderState[i].orderItems[j].product.importprice);

      data1.push({
        key: i + 1,
        product: orderState[i].orderItems[j].product.title,
        img: (
          <>
            <img
              src={orderState[i].orderItems[j].product.images[0].url}
              style={{ width: "40px", height: "40px" }}
              alt=""
            />
          </>
        ),
        quantity: orderState[i].orderItems[j].quantity,
        date: new Date(orderState[i].paidAt).toLocaleDateString(),
        price: orderState[i].orderItems[j].price,
        amount:
          orderState[i].orderItems[j].price *
          orderState[i].orderItems[j].quantity,
        statistics: statics,
      });
    }
  }
  const total = data1.reduce((pre, curr) => pre + curr.statistics, 0);
  return (
    <div>
      <h3 className="mb-4">Orders</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <h3>Total Statistic: {total} </h3>
    </div>
  );
};

export default Statistic;
