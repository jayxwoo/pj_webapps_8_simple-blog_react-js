import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-wrapper">
                <h1 className="logo">Simple Blog</h1>
                <nav className="nav-group">
                    <NavLink exact className="nav-item" activeClassName="nav-item--active" to="/">Home</NavLink>
                    <NavLink exact className="nav-item" activeClassName="nav-item--active" to="/create">New Blog</NavLink>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;