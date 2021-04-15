import { useState, useEffect } from 'react';

const useFetch = (uri) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(uri, { signal: abortCont.signal })
            .then((res) => {
                if (!res.ok) {
                    throw Error('Could not fetch data');
                } else if (res.ok) {
                    return res.json();
                };
            })
            .then((data) => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch((err) => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted');
                } else {
                    setError(err.message);
                    setIsPending(false);
                    setData(null);
                };
            });

        return (() => {
            abortCont.abort();
        });
    }, [uri]);

    return { data, isPending, error };
};

export default useFetch;