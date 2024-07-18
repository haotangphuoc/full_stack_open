const AddBlogForm = ({ user, blogs, handleLogout, handleAddBlog, title, url, handleTitleChange, handleUrlChange }) => {
  return (
    <div>
      <form onSubmit={handleAddBlog}>
        <div>
          title
          <input type='text' value={title} name="title" onChange={e => handleTitleChange(e.target.value)}/>
        </div>
        <div>
          url
          <input type='text' value={url} name="url" onChange={e => handleUrlChange(e.target.value)}/>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AddBlogForm