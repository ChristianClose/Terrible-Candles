import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPromos } from "../../redux/promosSlice/promosSlice";
import { Card, Col, Row } from "react-bootstrap";

const Promo = ({ cards = [] }) => {
  const { promos, error, loading } = useSelector((state) => state.promos);
  const dispatch = useDispatch();
  error && console.log(error);

  useEffect(() => promos.length === 0 && dispatch(getPromos()), [
    dispatch,
    promos,
  ]);

  return (
    <>
      {loading ? (
        <i className="fas fa-spinner fa-pulse" />
      ) : (
        <Row className="justify-content-center" style={{ margin: "0 10%" }}>
          {promos.map((card) => (
            <Row key={`promo${card._id}`}>
              <Col>
                <Card style={{ width: "15rem", height: "100%" }}>
                  <Card.Body align="center">
                    <Card.Img
                      src={card.image}
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
