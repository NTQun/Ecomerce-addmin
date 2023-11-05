import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllOrderDeliver,
  updateOrderDeliver,
} from "./../features/delivery/deliverySlice";
import { SearchOutlined } from "@ant-design/icons";

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
    setTimeout(() => dispatch(getAllOrderDeliver()), 400);
  };
  for (let i = 0; i < orderState?.length; i++) {
    if (orderState[i].orderStatus != "Ordered") {
      let amountCollect = 0;
      orderState[i]?.typecheckout !== "COD"
        ? (amountCollect = 0)
        : (amountCollect = orderState[i].totalPrice);

      data1.push({
        key: i + 1,
        name: orderState[i].user?.firstname,
        detailorder: (
          <Link to={`/delivery/order/${orderState[i]?._id}`}>View Orders</Link>
        ),
        amount: amountCollect,
        date: new Date(orderState[i].createdAt).toLocaleDateString(),
        mobile: orderState[i]?.shippingInfo?.mobile,
        address: orderState[i]?.shippingInfo?.address,
        action: (
          <>
            <select
              name=""
              defaultValue={orderState[i]?.orderStatus}
              onChange={(e) => {
                upateOrderStatus(orderState[i]?._id, e.target.value);
              }}
              className="form-control form-select"
              id=""
            >
              <option value="Processed">Processed</option>

              <option value="Shipped">Shipped</option>

              <option value="Out For Delievery">Out For Delievery</option>

              <option value="Delivered">Delivered</option>
            </select>
          </>
        ),
      });
    }
  }

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
  });

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Detail Order",
      dataIndex: "detailorder",
    },
    {
      title: "Collect money",
      dataIndex: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: " Address",
      dataIndex: "address",
      ...getColumnSearchProps("address"),
    },

    {
      title: "Mobile",
      dataIndex: "mobile",
      ...getColumnSearchProps("mobile"),
    },

    {
      title: "Actions",
      dataIndex: "action",
    },
  ];

  return (
    <div>
      <div className="d-flex position ">
        <h3 className="mb-4 mt-3 px-3 " style={{ color: "blue" }}>
          <div className="d-flex gap-3 align-items-center dropdown">
            <div
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              DeliveryOrder
            </div>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <Link
                  className="dropdown-item py-1 mb-1"
                  style={{ height: "auto", lineHeight: "20px" }}
                  to="/delivery/profile-delivery"
                >
                  View Profile
                </Link>
              </li>
              <li>
                <button
                  className="dropdown-item py-1 mb-1"
                  style={{ height: "auto", lineHeight: "20px" }}
                  onClick={() => {
                    localStorage.clear();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </li>
            </div>
          </div>
        </h3>
      </div>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default DeliveryOrder;
