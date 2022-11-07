import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, removeBlog, userId }) => {
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const pStyle = {
    margin: 1,
  };

  const [showInfo, setShowInfo] = useState(false);
  const [like, setLike] = useState(blog.likes);
  const [deleteOption, setDeleteOption] = useState(false);

  const hideWhenVisible = { display: showInfo ? "none" : "" };
  const showWhenVisible = { display: showInfo ? "" : "none" };

  const showWhenVisible2 = { display: deleteOption ? "" : "none" };

  const toggleVisibility = () => {
    setShowInfo(!showInfo);

    if (userId === blog.user.id) {
      setDeleteOption(true);
    }
  };

  const updateLikes = async (event) => {
    event.preventDefault();

    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: like + 1,
      user: blog.user.id,
    };

    blogService.update(blog.id, blogToUpdate);
    setLike(blogToUpdate.likes);
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id);
    }
  };

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <h4>
          {blog.title} {blog.author}{" "}
          <button onClick={toggleVisibility}>show more info</button>
        </h4>
      </div>
      <div className="blog" style={showWhenVisible}>
        <h4>
          <p style={pStyle}>Title: {blog.title} </p>
          <p style={pStyle}>Author: {blog.author}</p>
          <p style={pStyle}>Url: {blog.url} </p>
          <p style={pStyle}>
            Likes: {like}{" "}
            <button id="like-button" onClick={updateLikes}>
              Like
            </button>{" "}
          </p>
          <p style={pStyle}>{blog.user.name}</p>
          <button onClick={toggleVisibility}>cancel</button>
          <div style={showWhenVisible2}>
            <button onClick={handleDelete}>remove blog</button>
          </div>
        </h4>
      </div>
    </div>
  );
};

export default Blog;
