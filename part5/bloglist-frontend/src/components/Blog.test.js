import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: "44",
  url: "www.myamazinblog.doesnt.exist",
  likes: 6,
  user: {
      username: "kaas3",
      name: "Cheese Lover",
      id: "63011136ce96b69ad2e06fe2"
      },
}

test('renders title', () => {
  

  const { container } = render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library 44')

  screen.debug(element)

  expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
  

  const mockHandler = jest.fn()

  render(<Blog blog={blog} toggleVisibility={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('show more info')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})

test("clicking the button calls event handler twice", async () => {
  
  const mockHandler = jest.fn();

  render(<Blog blog={blog} updateLikes={mockHandler} />
  )
  
  const button = screen.getByText('Like');
  userEvent.click(button);
  userEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
  console.log(mockHandler.mock.calls)
});