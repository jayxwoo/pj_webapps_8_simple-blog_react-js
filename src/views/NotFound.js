import { useHistory } from "react-router";

const NotFound = () => {
    const history = useHistory();

    const goBack = () => {
        history.push('/');
    };

    return (
        <div className="not-found">
            <p className="error-title">404 Error</p>
            <p className="error-msg">The request URL was not found on this server.</p>
            <button onClick={goBack} className="back-btn" title="go back"><span className="material-icons back-icon">arrow_back_ios</span></button>
        </div>
    );
}
 
export default NotFound;