const mongoose = require("mongoose");
const supertest = require("supertest");
const agent = require("superagent");

const app = require("../app");
const helper = require("./test_helper");
const api = supertest(app);
const bcrypt = require("bcrypt");

const Blog = require("../models/blogModel");



beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();

  const result = await api.post("/api/login").send({
    username: "kaas3",
    password: "123456",
  });

  auth = {
    Authorization: `bearer ${result.body.token}`,
  };

}, 100000);

describe("Blogs are posted", () => {

  test("login succesfully", async () => {
    await api
      .post("/api/login")
      .send({
        username: "kaas3",
        password: "123456",
      })
      .expect(200);
  });

  test("token is missing", async () => {
    const newBlog = {
      title: "test4",
      author: "notme",
      url: "www.what.w",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
      
  })

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 100000);

  test("A new post is made, likes become 1 by default", async () => {
    const newBlog = {
      title: "test4",
      author: "notme",

      url: "www.what.w",
    };

    await api
      .post("/api/blogs")
      .set(auth)

      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    expect(response.body[2].likes).toBe(0);
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  }, 100000);

  test("a specific title is within the returned Blog", async () => {
    const response = await api.get("/api/blogs");

    const titles = response.body.map((r) => r.title);
    expect(titles).toContain("test2");
  });

  test("there are two blogs", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
});

describe("viewing a specific blog", () => {
  test("the blog ID has a unique identifier", async () => {
    const response = await api.get("/api/blogs");

    var ids = response.body.map((r) => r.id);
    expect(ids).toBeDefined();
  });

  test("blog without content is not added", async () => {
    const newBlog = {
      likes: 1,
    };

    await api.post("/api/blogs").set(auth).send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe("deleting/update a blog", () => {
  test("a blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).set(auth).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
  });
});

describe("updating a blog", () => {
  test("find by id and update", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set(auth)
      .send({ likes: 99 })
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[0].likes).toBe(99);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
