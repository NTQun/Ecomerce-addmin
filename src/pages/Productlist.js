import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Space, Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  creatWarehouse,
  deleteAProduct,
  getProducts,
} from "../features/product/productSlice";
import { Link, useNavigate } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { FaWarehouse } from "react-icons/fa";
import { toast } from "react-toastify";
const Productlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
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

  const productState = useSelector((state) => state.product.products);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      image: (
        <img
          src={productState[i]?.images[0]?.url}
          alt=""
          style={{ width: "40px", height: "40px" }}
        />
      ),
      title: productState[i].title.substr(0, 70),
      brand: productState[i].brand,
      category: productState[i].category,
      price: productState[i].price,
      tags: productState[i].tags,

      importprice: productState[i].importprice,
      action: (
        <>
          <Link
            to={`/admin/product/${productState[i]._id}`}
            className=" fs-3 text-success"
          >
            <BiEdit />
          </Link>
          {!productState[i].isWarehouse && (
            <button
              className="ms-3 fs-3 text-success bg-transparent border-0"
              onClick={() => dispatch(creatWarehouse(productState[i]._id))}
            >
              <FaWarehouse />
            </button>
          )}
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => {
              showModal(productState[i]._id);
            }}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteProduct = (e) => {
    dispatch(deleteAProduct(e));
    toast("Delete Product Success");
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 800);
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
      title: "Brand",
      dataIndex: "brand",
      sorter: (a, b) => a.brand.length - b.brand.length,
      ...getColumnSearchProps("brand"),
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
      ...getColumnSearchProps("category"),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      sorter: (a, b) => a.tags.length - b.tags.length,
      ...getColumnSearchProps("tags"),
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <button
        className="bg-success text-white mb-3 mb-3"
        onClick={() => navigate("/admin/product")}
      >
        <AiOutlinePlusCircle /> Add Product
      </button>

      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteProduct(productId);
        }}
        title="Are you sure you want to delete this Product?"
      />
    </div>
  );
};

export default Productlist;
