import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AiTwotoneLock } from "react-icons/ai";
import { FcKey } from "react-icons/fc";

import {
  blockUser,
  getUsers,
  unblockUser,
} from "../features/customers/customerSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Customers = () => {
  const customerstate = useSelector((state) => state.customer.customers);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  });
  const useblockUser = (id) => {
    dispatch(blockUser(id));
  };
  const useunblocUser = (id) => {
    dispatch(unblockUser(id));
  };
  const data1 = [];
  for (let i = 0; i < customerstate.length; i++) {
    if (customerstate[i].role !== "admin") {
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
          </>
        ),
      });
    }
  }

  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Customers;
