import search from '../images/search.png'
import { Outlet, Link } from "react-router-dom";

export default function Navbar(props) {
    return (
        <nav className="home-nav">
            <Link className="logo" to="/">読む</Link>
            <div onClick={props.toggleSearch}>
                <img className="nav--search" src={search} alt="search" />
            </div>
        </nav>
    );
}