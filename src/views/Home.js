import BlogList from '../components/BlogList'
import useFetch from '../hooks/useFetch';

const Home = () => {
    const { data: blogs, isPending, error } = useFetch('http://localhost:8000/blogs');

    return (
        <div className="home">
            <h2>All Blogs</h2>
            {isPending && (<p>Loading..</p>)}
            {error && (<p>{error}</p>)}
            {blogs && <BlogList blogs={blogs} />}
        </div>
    );
}

export default Home;