import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/auth/authSlice";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";

const Statistic = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state?.auth?.orders);
  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    for (let j = 0; j < orderState[i]?.orderItems.length; j++) {
      const statics =
        orderState[i]?.orderItems[j]?.quantity *
        (orderState[i]?.orderItems[j]?.product?.price -
          orderState[i]?.orderItems[j]?.product?.importprice);

      data1.push({
        key: i + 1,
        product: orderState[i]?.orderItems[j]?.product?.title,
        img: (
          <>
            <img
              src={orderState[i]?.orderItems[j]?.product?.images[0]?.url}
              style={{ width: "40px", height: "40px" }}
              alt=""
            />
          </>
        ),
        quantity: orderState[i]?.orderItems[j]?.quantity,
        date: new Date(orderState[i]?.paidAt)?.toLocaleDateString(),
        price: orderState[i]?.orderItems[j]?.price,
        amount:
          orderState[i]?.orderItems[j]?.price *
          orderState[i]?.orderItems[j]?.quantity,
        statistics: statics,
      });
    }
  }
  const total = data1.reduce((pre, curr) => pre + curr.statistics, 0);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <Highlighter
    //       highlightStyle={{
    //         backgroundColor: "#ffc069",
    //         padding: 0,
    //       }}
    //       searchWords={[searchText]}
    //       autoEscape
    //       textToHighlight={text ? text.toString() : ""}
    //     />
    //   ) : (
    //     text
    //   ),
  });
  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Product",
      dataIndex: "product",
      sorter: (a, b) => a.product.length - b.product.length,
      ...getColumnSearchProps("product"),
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
