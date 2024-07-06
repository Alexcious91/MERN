import React from 'react';
import { Navbar, Nav, Container } from "react-bootstrap";

function NavbarComponent(props) {
   return (
      <>
         <Navbar expand="lg" className='bg-secondary'>
            <Container>
               <Navbar.Brand href="#">EasyEvent</Navbar.Brand>
               <Navbar.Toggle aria-controls="navigation" />
               
               <Navbar.Collapse id="navigation">
                  <Nav className="ml-auto">
                     <Nav.Item>
                        <Nav.Link href='/auth'>Authenticate</Nav.Link>
                     </Nav.Item>

                     <Nav.Item>
                        <Nav.Link href='/events'>Events</Nav.Link>
                     </Nav.Item>
                     
                     <Nav.Item>
                        <Nav.Link href='/bookings'>Bookings</Nav.Link>
                     </Nav.Item>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </>
   );
}

export default NavbarComponent;
