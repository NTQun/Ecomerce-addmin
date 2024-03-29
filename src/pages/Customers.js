import React, { useEffect, useState, useRef } from "react";
import { Button, Input, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiTwotoneLock } from "react-icons/ai";
import { FcKey } from "react-icons/fc";
import CustomModal from "./../components/CustomModal";
import { deleteAcc } from "./../features/auth/authSlice";

import {
  blockUser,
  getUsers,
  unblockUser,
} from "../features/customers/customerSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { SearchOutlined } from "@ant-design/icons";

const Customers = () => {
  const customerstate = useSelector((state) => state.customer.customers);
  const blockState = useSelector((state) => state.customer.blockUser);
  const unblockState = useSelector((state) => state.customer.unBlockUser);
  const [open, setOpen] = useState(false);
  const [userID, setUserId] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [blockState, unblockState]);
  const useblockUser = (id) => {
    dispatch(blockUser(id));
  };
  const useunblocUser = (id) => {
    dispatch(unblockUser(id));
  };

  const showModal = (e) => {
    setOpen(true);
    setUserId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

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
  });

  const data1 = [];
  for (let i = 0; i < customerstate.length; i++) {
    if (customerstate[i].role == "user") {
      data1.push({
        key: i + 1,
        name: customerstate[i].firstname + " " + customerstate[i].lastname,
        email: customerstate[i].email,
        mobile: customerstate[i].mobile,
        action: (
          <>
            {customerstate[i].isBlocked == false && (
              <button
                className="ms-3 fs-3 text-danger bg-transparent border-0"
                onClick={() => useblockUser(customerstate[i]._id)}
              >
                <AiTwotoneLock />
              </button>
            )}
            {customerstate[i].isBlocked && (
              <button
                className="ms-3 fs-3 text-primary bg-transparent border-0"
                onClick={() => useunblocUser(customerstate[i]._id)}
              >
                <FcKey />
              </button>
            )}
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(customerstate[i]._id)}
            >
              <AiFillDelete />
            </button>
            <Link
              to={`/admin/manager/${customerstate[i]._id}`}
              className=" fs-3 text-success"
            >
              <BiEdit />
            </Link>
          </>
        ),
      });
    }
  }

  const deleteUser = (e) => {
    console.log(e);
    dispatch(deleteAcc(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getUsers());
    }, 300);
  };

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      ...getColumnSearchProps("mobile"),
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteUser(userID);
        }}
        title="Are you sure you want to delete this Delivery Account?"
      />
    </div>
  );
};

export default Customers;
