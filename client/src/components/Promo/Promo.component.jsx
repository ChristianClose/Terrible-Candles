import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPromos } from "../../redux/promosSlice/promosSlice";
import { Card, Col, Row } from "react-bootstrap";

const Promo = ({ cards = [] }) => {
  const { promos, error, loading } = useSelector((state) => state.promos);
  const dispatch = useDispatch();

  useEffect(() => !promos && dispatch(getPromos()), [dispatch, promos]);

  return (
    <>
      {loading ? (
        <i className="fas fa-spinner fa-pulse" />
      ) : (
        <Row className="justify-content-center" style={{ margin: "0 10%" }}>
          {promos.map((card, index) => (
            <Row key={`promo${index}`}>
              <Col>
                <Card style={{ width: "15rem", height: "100%" }}>
                  <Card.Body align="center">
                    <Card.Img
                      src={card.img}
                      style={{ background: "gray", height: "75%" }}
                    />
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>{card.text}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ))}
        </Row>
      )}
    </>
  );
};

export default Promo;