import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Toggleable";
import BlogForm from "./components/BlogForm";
// import { createNotification } from "./reducers/notificationReducer";
// import { useDispatch } from "react-redux";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  // const [errorMessage, setErrorMessage] = useState("")
  // const [message, setMessage] = useState("")
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
  const [userId, setUserId] = useState(null);

  const blogFormRef = useRef();
  // const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setUserId(user.id);
      blogService.setToken(user.token);
    }
  }, []);

  const blogForm = () => {
    return (
      <div>
        <Togglable id="add-button" buttonLabel="add blog" ref={blogFormRef}>
          <BlogForm
            onChange={handleInputChange}
            onSubmit={addBlog}
            title={newBlog.title}
            author={newBlog.author}
            url={newBlog.url}
          />
        </Togglable>
      </div>
    );
  };

  const loginForm = () => {
    return (
      <div>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    );
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUserId(user.id);

      setUsername("");
      setPassword("");
    } catch (error) {
      // dispatch(createNotification("Wrong username or password.", "error"));
      // setErrorMessage("Wrong username or password")
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
    }
  };

  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const addBlog = (event) => {
    const user = JSON.parse(window.localStorage.getItem("loggedBlogappUser"));
    event.preventDefault();
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    };

    blogFormRef.current.toggleVisibility();
    setUser(user);
    blogService.setToken(user.token);
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      // setMessage(
      //   `a new blog ${newBlog.title} by ${newBlog.author} has been added`
      // )
      setNewBlog({ title: "", author: "", url: "" });
      setTimeout(() => {
        // setMessage(null)
      }, 5000);
    });
  };

  const removeBlog = (blogId) => {
    blogService.remove(blogId);
    const updatedBlogs = blogs.filter((blog) => blog.id !== blogId);
    setBlogs(updatedBlogs);
    // setMessage("Blog removed")
  };

  const logOut = async () => {
    window.localStorage.clear();
    window.location.reload(false);
  };

  return (
    <div>
      <h2>Blogs</h2>

      {/* <Notification message={errorMessage} />
      <Notification message={message} /> */}
      <Notification />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <p>
            {" "}
            <button id="logout" type="logOut" onClick={logOut}>
              Log out
            </button>{" "}
          </p>
          <h2>Add a new blog</h2>
          {blogForm()}
        </div>
      )}

      <p></p>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            removeBlog={removeBlog}
            userId={userId}
          />
        ))}
    </div>
  );
};

export default App;
