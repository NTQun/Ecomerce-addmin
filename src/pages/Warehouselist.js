import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Space, Table } from "antd";
import { BiEdit } from "react-icons/bi";
import {
  AiFillDelete,
  AiFillFileAdd,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteWh, getWarehouse } from "../features/product/productSlice";
import { Link, useNavigate } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";
const Warehouelist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWarehouse());
  }, []);
  const [open, setOpen] = useState(false);

  const [productId, setProductId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setProductId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const warehouseState = useSelector((state) => state?.product?.warehouse);
  const data1 = [];
  for (let i = 0; i < warehouseState?.length; i++) {
    data1.push({
      key: i + 1,
      image: (
        <img
          src={warehouseState[i]?.product?.images[0]?.url}
          alt=""
          style={{ width: "40px", height: "40px" }}
        />
      ),
      title: warehouseState[i].product?.title.substr(0, 70),
      price: warehouseState[i].price,
      importprice: warehouseState[i].importprice,
      quantity: warehouseState[i].quantity,
      action: (
        <>
          <Link
            to={`/admin/add-warehouse/${warehouseState[i]._id}`}
            className=" fs-3 ms-3 text-success"
          >
            <AiFillFileAdd />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => {
              showModal(warehouseState[i]._id);
            }}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteWarehouse = (e) => {
    dispatch(deleteWh(e));
    toast("Delete Product Success");
    setOpen(false);
    setTimeout(() => {
      dispatch(getWarehouse());
    }, 500);
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
      title: "Images",
      dataIndex: "image",
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.length - b.title.length,
      ...getColumnSearchProps("title"),
    },
    {
      title: "Importprice",
      dataIndex: "importprice",
      sorter: (a, b) => a.importprice.length - b.importprice.length,
    },
    {
      title: "Price cash",
      dataIndex: "price",
      sorter: (a, b) => a.price.length - b.price.length,
    },
    {
      title: "Quantity ",
      dataIndex: "quantity",
      sorter: (a, b) => a.quantity.length - b.quantity.length,
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  return (
    <div>
      <h3 className="mb-4 title">Warehouse List</h3>

      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteWarehouse(productId);
        }}
        title="Are you sure you want to delete this Product?"
      />
    </div>
  );
};

export default Warehouelist;
