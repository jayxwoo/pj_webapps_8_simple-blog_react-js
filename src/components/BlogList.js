import { Link } from 'react-router-dom';

const BlogList = ({ blogs }) => {
    return (
        <div className="blog-list">
            {
                blogs.map((blog) => (
                    <div className="blog-preview" key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>
                            <h3 className="blog-preview-title">{blog.title}</h3>
                            <p className="blog-preview-body">{blog.body.slice(0, 100)}..</p>
                            <p className="blog-preview-created_at">{blog.created_at}</p>
                            <p className="blog-preview-author">{blog.author}</p>
                        </Link>
                    </div>
                ))
            }
        </div>
    );
}

export default BlogList;