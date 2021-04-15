import { useState } from "react";
import { useHistory } from "react-router";

const Create = () => {
    const [title, setTitle] = useState(null);
    const [author, setAuthor] = useState(null);
    const [body, setBody] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const history = useHistory();

    const goBack = () => {
        history.go(-1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const created_at = new Date().toLocaleString();

        const newBlog = { title, author, body, created_at };

        setIsPending(true);

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newBlog)
        })
            .then(() => {
                console.log('Blog added');
                setIsPending(false);
                history.push('/');
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <div className="create">
            <button onClick={goBack} className="back-btn" title="go back"><span className="material-icons back-icon">arrow_back_ios</span></button>
            <h2>Add a New Blog</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label className="title-label form-label" htmlFor="title-input">Title :</label>
                <input className="title-input form-input" type="text" id="title-input" onChange={(e) => { setTitle(e.target.value) }} required />
                <label className="author-label form-label" htmlFor="author-input">Author :</label>
                <input className="author-input form-input" type="text" id="author-input" onChange={(e) => { setAuthor(e.target.value) }} required />
                <label className="body-label form-label" htmlFor="body-input">Body :</label>
                <textarea className="body-input form-input" id="body-input" onChange={(e) => { setBody(e.target.value) }} required></textarea>
                {!isPending && (<button className="add-btn btn-green">Add</button>)}
                {isPending && (<button className="add-btn btn-green">Adding..</button>)}
            </form>
        </div>
    );
}

export default Create;