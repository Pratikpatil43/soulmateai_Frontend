import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Button } from "react-bootstrap"; // Import Modal and Button from react-bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHeart, FaBars, FaTimes } from "react-icons/fa"; // Add icons for mobile toggle

const NavbarComponent = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate(); // Hook for navigation

  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  // Function to handle logout after confirmation
  const handleLogout = () => {
    sessionStorage.removeItem("token"); // Remove token from session storage
    navigate("/"); // Redirect to login page
  };

  // Function to show the logout confirmation modal
  const showLogoutModal = () => {
    setShowModal(true);
  };

  // Function to close the modal without logging out
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navbar
        expand="lg"
        style={{
          background: "linear-gradient(90deg, #ff6f61, #ff9a8b)", // Gradient background for attractive color
          borderRadius: "0 0 20px 20px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        className="mb-4"
      >
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ color: "#fff", fontSize: "24px", fontWeight: "bold" }}>
            SoulmateAI
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbar-nav"
            onClick={toggleNavbar}
            style={{ backgroundColor: "#fff" }} // White toggle button
          />
          <Navbar.Collapse id="navbar-nav" className={showNavbar ? "show" : ""}>
            <Nav className="ms-auto">
              <Nav.Link
                onClick={showLogoutModal} // Trigger the modal on logout click
                style={{ color: "#fff", fontSize: "18px", margin: "0 15px" }}
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Logout Confirmation Modal */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#ff6f61", fontSize: "20px" }}>Are you sure you want to log out?</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "#ff9a8b", fontSize: "16px" }}>
          It looks like you're ready to go. 😌 Are you sure you want to log out? You can always come back later!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal} style={{ backgroundColor: "#ff6f61", borderColor: "#ff6f61" }}>
            No, I want to stay!
          </Button>
          <Button variant="danger" onClick={handleLogout} style={{ backgroundColor: "#ff9a8b", borderColor: "#ff9a8b" }}>
            Yes, log me out
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavbarComponent;
