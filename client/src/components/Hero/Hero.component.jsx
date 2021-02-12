import React from "react";
import { Jumbotron, Row, Col, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Hero.styles.css";

const Hero = ({ backgroundUrl, title, body, links = [] }) => {
  return (
    <Row>
      <Col>
        <Jumbotron
          fluid
          style={{
            background: `url(${backgroundUrl})`,
            backgroundRepeat: "repeat-x",
            minHeight: "100%",
          }}
        >
          <Media
            align="center"
            className="mx-auto justify-content-center hero-container"
          >
            <Media.Body className=" pb-3">
              <h1 className="text-white outlined-text-2">{title}</h1>
              <p className="text-white outlined-text-1">{body}</p>
              <Row align="center" className="w-70">
                {links.map((link, index) => (
                  <Col key={`heroLink${index}`} align="center">
                    <Link to={link.link} className="outlined-text-1 light-blue">
                      {link.text + ">"}
                    </Link>
                  </Col>
                ))}
              </Row>
            </Media.Body>
          </Media>
        </Jumbotron>
      </Col>
    </Row>
  );
};

export default Hero;
/*
[
    First: {
        title: ""
        link: ""
    },
    Second: {

    }
] 
*/
