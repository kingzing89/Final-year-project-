import { useRef } from "react";

import "../Styles/main.css";
import { Link } from "react-router-dom";

function Navbar() {
    const navRef =useRef();

    const showNavbar =() =>{
        navRef.current.classList.toggle("responsive_nav")
    }
    return (
        <header>
            <h3 className="TITLE">Medicart</h3>
            <nav ref={navRef}>
            <Link to="/#">Home</Link>
            <Link to="/#">Profile</Link>
            <Link to="/#">Orders</Link>
            <Link to="/medicine">Medicines</Link>
            <button className="nav-btn nav-close-btn"onClick={showNavbar}>
                <FaTimes/>
            </button>
            </nav>
            <button className="nav-btn"onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    );
}

export default Navbar;