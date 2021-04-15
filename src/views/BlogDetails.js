import { useParams, useHistory, Link } from 'react-router-dom';

import useFetch from '../hooks/useFetch';

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, isPending, error } = useFetch(`http://localhost:8000/blogs/${id}`);

    const history = useHistory();

    const goBack = () => {
        history.go(-1);
    };

    const handleDelete = () => {
        fetch(`http://localhost:8000/blogs/${blog.id}`, {
            method: 'DELETE'
        })
            .then(() => {
                console.log('Blog deleted');
                history.push('/');
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const handleEdit = () => {
        
    };

    return (
        <div className="blog-details">
            <button onClick={goBack} className="back-btn" title="go back"><span className="material-icons back-icon">arrow_back_ios</span></button>
            {isPending && (<p>Loading..</p>)}
            {error && (<p>{error}</p>)}
            {blog && (
                <article className="blog-article">
                    <h2 className="article-title">{blog.title}</h2>
                    <p className="article-author">Written by {blog.author}</p>
                    <p className="article-created_at">{blog.created_at}</p>
                    <p className="article-body">{blog.body}</p>
                </article>
            )}
            <div className="btn-cont">
                <button className="delete-btn btn-red" onClick={handleDelete}>Delete</button> 
                <Link to={`/edit/${id}`}><button className="edit-btn btn-green" onClick={handleEdit}>Edit</button></Link>
            </div>
        </div>
    );
}

export default BlogDetails;