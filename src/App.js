import React from 'react';
import './App.css';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import InstaProcessor from "./InstaProcessor";

function App() {
  return (
    <div>
      <Navbar bg="light">
        <Navbar.Brand>Instagram to PDF Generator</Navbar.Brand>
      </Navbar>
      <Container>
        <Row className="pt-3">
          <Col></Col>
          <Col md={8}>
            <Card>
              <Card.Body>
                <h1 className="text-center">Welcome!</h1>
                <p>This site allows you to upload your data download from Instagram and will provide you with a PDF of all
                  of your photos and captions. For directions on how to request a download of your data, visit Instagram's
                  help guide <a href="https://help.instagram.com/181231772500920">here</a>.
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
        <Row className="pt-3">
          <Col></Col>
          <Col md={8}>
            <Card>
              <Card.Body>
                <h1 className="text-center">Directions</h1>
                <h4>1. Upload your data file from Instagram</h4>
                <p>This should be the compressed file you downloaded from Instagram.</p>
                <h4>2. Wait for processing</h4>
                <p>The time required varies based off of how many Instagram posts you have.</p>
                <h4>3. Download and enjoy!</h4>
                <p>Once finished processing, your PDF will be avaliable for download.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
        <Row className="pt-3 pb-5">
          <Col></Col>
          <Col md={8}>
            <Card>
              <Card.Body className="text-center">
                <h1 className="pb-2">Ready to go?</h1>
                <InstaProcessor/>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <Navbar bg="light" className="justify-content-center">
        <p>© 2020 Tyler Van Brocklin</p>
      </Navbar>
    </div>
  );
}

export default App;
