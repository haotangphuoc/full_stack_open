const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author.name}
  </div>  
)

export default Blog