const BlogForm = ({ onSubmit, onChange, title, author, url }) => {

  return (
    <form onSubmit={onSubmit}>
      <div>
        title
        <input
          name="title"
          type="text"
          id="title"
          value={title}
          onChange={onChange}
        />
      </div>
      <div>
        author
        <input
          name="author"
          type="text"
          id="author"
          value={author}
          onChange={onChange}
        />
      </div>
      <div>
        url
        <input
          name="url"
          id="url"
          type="text"
          value={url}
          onChange={onChange}
        />
      </div>
      <button id ="save" type="submit">save</button>
    </form>

  )
}

export default BlogForm