import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", () => {
  const createBlog = jest.fn();
  render(<BlogForm createBlog={createBlog} />);

  const inputs = screen.getAllByRole("textbox");
  const sendButton = screen.getByText("save");

  userEvent.type(inputs[0], "title");
  userEvent.type(inputs[1], "author");
  userEvent.type(inputs[2], "url");
  userEvent.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe("title");
  expect(createBlog.mock.calls[0][0].author).toBe("author");
  expect(createBlog.mock.calls[0][0].url).toBe("url");
});