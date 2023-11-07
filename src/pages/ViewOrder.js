import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSingleOrder } from "../features/auth/authSlice";

const SingpleOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  const orderState = useSelector((state) => state?.auth?.orderbyuser);
  useEffect(() => {
    dispatch(getSingleOrder(orderId));
  }, [orderId]);

  return (
    <>
      <div className="row ">
        <div className="col-12 ">
          <div className="row">
            <div className="col-2">
              <h5>Order Id </h5>
            </div>
            <div className="col-2">
              <h5>Total Amount </h5>
            </div>
            <div className="col-2 ">
              <h5>Type Checkout </h5>
            </div>
            <div className="col-2">
              <h5>Address </h5>
            </div>
            <div className="col-2">
              <h5>Status </h5>
            </div>
          </div>
        </div>
        <div className="col-12 mt-3">
          <div style={{ backgroundColor: "#febd69" }} className="row pt-3 my-3">
            <div className="col-2">
              <p>{orderState?._id}</p>
            </div>
            <div className="col-2">
              <p>{orderState?.totalPrice} </p>
            </div>
            <div className="col-2">
              <p>{orderState?.typecheckout}</p>
            </div>
            <div className="col-2">
              <p>{orderState?.address}</p>
            </div>
            <div className="col-2">
              <p>{orderState?.orderStatus}</p>
            </div>

            <div className="col-12">
              <div className="row  py-3" style={{ backgroundColor: "#2b4663" }}>
                <div className="col-2">
                  <h6 className="text-white">Product Name </h6>
                </div>
                <div className="col-2">
                  <h6 className="text-white">Product Image </h6>
                </div>
                <div className="col-2">
                  <h6 className="text-white">Quantity</h6>
                </div>
                <div className="col-2">
                  <h6 className="text-white">Price </h6>
                </div>
                <div className="col-2">
                  <h6 className="text-white">Color </h6>
                </div>
                <div></div>
              </div>
              {orderState?.orderItems?.map((i, index) => {
                return (
                  <div
                    className="row  p-3"
                    style={{ backgroundColor: "#192e45" }}
                    key={index}
                  >
                    <div className="col-2">
                      <p className="text-white">{i?.product?.title} </p>
                    </div>
                    <div className="col-2">
                      <img
                        src={i?.product?.image.url[0]}
                        alt="IMG Product"
                        style={{ width: "40px", height: "40px" }}
                      />
                    </div>
                    <div className="col-2">
                      <p className="text-white ">{i?.quantity} </p>
                    </div>
                    <div className="col-2">
                      <p className="text-white">{i?.price} </p>
                    </div>
                    <div className="col-2">
                      <ul className="colors ps-0 mx-3">
                        <li style={{ backgroundColor: i?.color?.title }}></li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {orderState?.comment && (
        <div className="col-12">
          <label htmlFor="" className=" mx-2 ">
            Comment
          </label>

          <div className="mt-2">
            <textarea
              name=""
              id=""
              disabled={true}
              className="w-100 form-control"
              cols="30"
              defaultValue={orderState?.comment}
              rows="4"
              placeholder="Comment"
            ></textarea>
          </div>
        </div>
      )}
    </>
  );
};

export default SingpleOrder;
