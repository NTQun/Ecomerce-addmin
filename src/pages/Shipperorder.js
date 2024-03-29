import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import {
  deleteOrderByShipper,
  getOrderByShipper,
  updateOrderDeliver,
} from "../features/delivery/deliverySlice";
import { MdOutlineCancel } from "react-icons/md";
import CustomModal from "../components/CustomModal";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Shipperorder = () => {
  const dispatch = useDispatch();
  const getId = useSelector((state) => state?.delivery?.delivery?._id);
  useEffect(() => {
    dispatch(getOrderByShipper(getId));
  }, [getId]);
  const orderState = useSelector((state) => state.delivery.getOrderByShippery);
  const [orderId, setOrderId] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const upateOrderStatus = (a, b) => {
    dispatch(updateOrderDeliver({ id: a, status: b }));
    setTimeout(() => {
      dispatch(getOrderByShipper(getId));
    }, 500);
  };
  const showModal = (e) => {
    setOpen(true);
    setOrderId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const deleteOrder = (e) => {
    dispatch(deleteOrderByShipper(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getOrderByShipper(getId));
    }, 300);
  };
  const data1 = [];
  for (let i = 0; i < orderState?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i].user?.firstname,
      product: (
        <Link to={`/delivery/order/${orderState[i]?._id}`}>View Orders</Link>
      ),
      amount: orderState[i].totalPrice,
      date: new Date(orderState[i].createdAt).toLocaleDateString(),
      mobile: orderState[i]?.shippingInfo?.mobile,
      address: orderState[i]?.shippingInfo?.address,
      subaddress: orderState[i]?.shippingInfo?.other,
      typecheckout: orderState[i].typecheckout,
      status: orderState[i].orderStatus,
      action: (
        <>
          {orderState[i].orderStatus === "Processed" && (
            <div>
              <button
                className="bg-success text-white mx-2"
                type="button"
                onClick={() => upateOrderStatus(orderState[i]?._id, "Shipped")}
              >
                Next Step
              </button>
              <button
                className="bg-danger text-white"
                onClick={() => showModal(orderState[i]?._id)}
              >
                <MdOutlineCancel />
              </button>
            </div>
          )}
          {orderState[i].orderStatus === "Shipped" && (
            <button
              className="bg-success text-white"
              type="button"
              onClick={() =>
                upateOrderStatus(orderState[i]?._id, "Out For Delievery")
              }
            >
              Next Step
            </button>
          )}
          {orderState[i].orderStatus === "Out For Delievery" && (
            <button
              type="button"
              className="bg-success text-white"
              onClick={() => upateOrderStatus(orderState[i]?._id, "Delivered")}
            >
              Next Step
            </button>
          )}
          {orderState[i].orderStatus === "Out For Delievery" && (
            <button
              type="button"
              className="bg-success text-white"
              onClick={() =>
                upateOrderStatus(orderState[i]?._id, "Delivery Failed")
              }
            >
              Delivery Failed
            </button>
          )}
          {orderState[i].orderStatus === "Delivered" && (
            <button
              type="button"
              className="bg-success text-white"
              onClick={() =>
                upateOrderStatus(orderState[i]?._id, "Success Shipped")
              }
            >
              Next Step
            </button>
          )}
          <button
            className="bg-primary text-white mt-1 mx-5"
            onClick={() => navigate(`/delivery/order/${orderState[i]?._id}`)}
          >
            <AiOutlineInfoCircle />
          </button>
        </>
      ),
    });
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
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
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
      ...getColumnSearchProps("address"),
    },

    {
      title: "Mobile",
      dataIndex: "mobile",
      ...getColumnSearchProps("mobile"),
    },
    {
      title: "Type Checkout",
      dataIndex: "typecheckout",
      ...getColumnSearchProps("typecheckout"),
    },
    {
      title: "Status Order",
      dataIndex: "status",
      ...getColumnSearchProps("status"),
    },
    {
      title: "Actions",
      dataIndex: "action",
    },
  ];

  return (
    <div>
      <h3 className="mb-4">Orders</h3>

      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteOrder(orderId);
        }}
        title="Are you sure you want to delete Order out list?"
      />
    </div>
  );
};

export default Shipperorder;
