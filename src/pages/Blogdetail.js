import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getABlog } from "../features/blogs/blogSlice";
import { BiEdit } from "react-icons/bi";

const Blogdetail = () => {
  const blogState = useSelector((state) => state?.blogs?.singleBlog);
  const dispatch = useDispatch();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];
  useEffect(() => {
    dispatch(getABlog(getBlogId));
  }, []);
  return (
    <>
      <div className="row set-padding ">
        <div className="col-9">
          <div className="row">
            <div className="single-blog-card">
              <Link
                to="/admin/blog-list"
                className="d-flex align-items-center gap-10"
              >
                <HiOutlineArrowLeft className="fs-4" />
                Go back to blog
              </Link>
              <h3 className="title pt-5">{blogState?.title}</h3>
              <img
                src={blogState?.images[0]?.url}
                className="img-fluid w100 my-4"
                alt="blog"
                style={{ maxHeight: "350px" }}
              />
              <p
                dangerouslySetInnerHTML={{
                  __html: blogState?.description,
                }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogdetail;
