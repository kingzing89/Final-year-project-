import React, { useEffect } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,

} from 'mdb-react-ui-kit';
import { MDBBadge } from 'mdb-react-ui-kit';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';

const NavigationBar = () => {
  const [ value, setvalue] = useState("");
  async function fetchdata() {
    const response = await fetch("http://localhost:5000/api/auth/getuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")

      },


    })

    const json = await response.json();
    setvalue(json)
    


  }

  useEffect(()=>{

    fetchdata();




  },[])





  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/");

  }

  const [showNavColor, setShowNavColor] = useState(false);
  const [showNavColorSecond, setShowNavColorSecond] = useState(false);
  const [showNavColorThird, setShowNavColorThird] = useState(false);

  return (



    <MDBNavbar expand='lg' light style={{ backgroundColor: '#e3f2fd' }}>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>Medicart</MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          data-target='#navbarColor02'
          aria-controls='navbarColor02'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNavColor(!showNavColor)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse show={showNavColor} navbar>
          <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
            <MDBNavbarItem className='active'>


           

            </MDBNavbarItem>
            <MDBNavbarItem>

              <Link to="/profile"><MDBNavbarLink >Profile</MDBNavbarLink></Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link to="/order"><MDBNavbarLink >Orders</MDBNavbarLink></Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <Link to="/medicine"><MDBNavbarLink >Medicines</MDBNavbarLink></Link>
            </MDBNavbarItem>

            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: {value.name}
              </Navbar.Text>
            </Navbar.Collapse>


            {localStorage.getItem("token") ? <MDBNavbarItem className='ms-auto mr-5 pr-5'>
              <Link to="/"><MDBNavbarLink onClick={logout}>Logout</MDBNavbarLink></Link>
            </MDBNavbarItem> : null}

















          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>









  );
};

export default NavigationBar;