import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../features/product/productSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Productdetail = () => {
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product?.product);
  const productsState = useSelector((state) => state?.product?.product);

  useEffect(() => {
    dispatch(getProduct(getProductId));
  }, []);

  const getProductId = location.pathname.split("/")[3];

  const props = {
    width: 296,
    height: 300,
    img: productState?.images[0].url,
  };
  const color = [];
  for (let index = 0; index < productsState?.color?.length; index++) {
    color.push(productState?.color[index].title);
  }
  const string = color.join(" ");

  return (
    <>
      <div className="row">
        <div className="col-6">
          <div className="main-product-image">
            <div>
              <img
                className="p-2"
                style={{ width: "296px", height: "300px" }}
                src={props.img}
                alt=""
              />
            </div>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {productState?.images.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <img src={i.url} alt="" width={100} height={100} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-6">
          <div className="main-product-details">
            <div className="border-bottom">
              <h3 className="title">{productState?.title}</h3>
            </div>
            <div className="border-bottom py-3">
              <p className="price">$ {productState?.price}</p>
              <div className="d-flex align-items-center gap-10">
                <ReactStars
                  edit={false}
                  count={5}
                  value={parseInt(productState?.totalrating)}
                  size={24}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />
                <p className="mb-0 t-review">
                  ({productState?.ratings.length} Review)
                </p>
              </div>
            </div>
            <div className=" py-3">
              <div className="d-flex gap-10 align-items-center my-2">
                <h5 className="product-heading">Type :</h5>
                <h5
                  className="product-data mx-3 "
                  style={{ fontWeight: "400" }}
                >
                  {productState?.category}
                </h5>
              </div>
              <div className="d-flex gap-10 align-items-center my-2">
                <h5 className="product-heading">Brand :</h5>
                <h5
                  className="product-data mx-3 "
                  style={{ fontWeight: "400" }}
                >
                  {productState?.brand}
                </h5>
              </div>
              <div className="d-flex gap-10 align-items-center my-2">
                <h5 className="product-heading">Category :</h5>
                <h5
                  className="product-data mx-3 "
                  style={{ fontWeight: "400" }}
                >
                  {productState?.category}
                </h5>
              </div>
              <div className="d-flex gap-10 align-items-center my-2">
                <h5 className="product-heading">Tags :</h5>
                <h5
                  className="product-data mx-3 "
                  style={{ fontWeight: "400", textTransform: "capitalize" }}
                >
                  {productState?.tags}
                </h5>
              </div>

              <div className="d-flex gap-10 align-items-center my-2">
                <h5 className="product-heading">Color :</h5>

                <h5
                  className="product-data mx-3"
                  style={{ fontWeight: "400", textTransform: "capitalize" }}
                >
                  {" "}
                  {string}{" "}
                </h5>
              </div>
              <div className="d-flex gap-10 align-items-center my-2">
                <h5 className="product-heading ">Available Quantity:</h5>
                <h5 className="product-data mx-3" style={{ fontWeight: "400" }}>
                  {productState?.quantity}
                </h5>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <h4>Description</h4>
                <div
                  className="bg-white p-3"
                  dangerouslySetInnerHTML={{
                    __html: productState?.description,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="row">
        <div className="col-12">
          <div className="review-inner-wrapper">
            <div className="review-head d-flex justify-content-between align-items-end">
              <div>
                <h4 className="mb-2">Customer Reviews</h4>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={Number(productState?.totalrating)}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0">
                    Based on {productState?.ratings.length} Reviews
                  </p>
                </div>
              </div>

              <div className="reviews mt-4">
                {productState &&
                  productState?.ratings?.map((item, index) => {
                    return (
                      <div key={index} className="review ">
                        <div className="d-flex gap-10 align-items-center">
                          <h6 className="mb-0">{item?.title}</h6>
                          <ReactStars
                            edit={false}
                            count={5}
                            value={item?.star}
                            size={24}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                          />
                        </div>
                        <p className="mt-3 text-dark">
                          <p style={{ color: "blue" }}>
                            {item?.postedby[0]?.firstname}-{" "}
                            {item?.postedby[0]?.lastname}
                          </p>
                          {item?.comment}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Productdetail;
