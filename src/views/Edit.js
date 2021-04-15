import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const Edit = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();
    const history = useHistory();

    const goBack = () => {
        history.go(-1);
    };

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(`http://localhost:8000/blogs/${id}`, { signal: abortCont.signal })
            .then((res) => {
                if (!res.ok) {
                    throw Error('Could not fetch data');
                } else if (res.ok) {
                    return res.json();
                };
            })
            .then((data) => {
                setTitle(data.title);
                setAuthor(data.author);
                setBody(data.body);
                setIsPending(false);
                setError(null);
            })
            .catch((err) => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted');
                } else {
                    setError(err.message);
                    setIsPending(false);
                };
            });

        return (() => {
            abortCont.abort();
        });
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();

        const created_at = new Date().toLocaleString();

        const editedBlog = { title, author, body, created_at };

        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedBlog)
        })
        .then(() => {
            console.log('blog edited');
            history.push('/');
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <div className="edit">
            <button onClick={goBack} className="back-btn" title="go back"><span className="material-icons back-icon">arrow_back_ios</span></button>
            {isPending && (<p>Loading..</p>)}
            {error && (<p>{error}</p>)}
            <h2>Edit your blog</h2>
            <form className="form" onSubmit={handleSubmit}>
                <label className="title-label form-label" htmlFor="title-input">Title :</label>
                <input className="title-input form-input" type="text" id="title-input" value={title} onChange={(e) => { setTitle(e.target.value) }} required />
                <label className="author-label form-label" htmlFor="author-input">Author :</label>
                <input className="author-input form-input" type="text" id="author-input" value={author} onChange={(e) => { setAuthor(e.target.value) }} required />
                <label className="body-label form-label" htmlFor="body-input">Body :</label>
                <textarea className="body-input form-input" id="body-input" value={body} onChange={(e) => { setBody(e.target.value) }} required></textarea>
                {!isPending && (<button className="add-btn btn-green">Edit</button>)}
                {isPending && (<button className="add-btn btn-green">Editing..</button>)}
            </form>
        </div>
    );
}

export default Edit;
