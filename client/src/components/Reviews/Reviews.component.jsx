import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../redux/reviewsSlice/reviewsSlice";

const Reviews = () => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.reviews);

  useEffect(() => reviews.length === 0 && dispatch(getReviews()), [
    dispatch,
    reviews,
  ]);
  error && console.log(error);

  const stars = loading ? (
    <i className="fas fa-spinner fa-pulse" />
  ) : (
    reviews.map((review, index) => {
      const scores = [];
      for (let i = 0; i < 5; i++) {
        if (i < review.score) {
          scores.push(
            <i key={`star${i}`} className="fa fa-star" aria-hidden="true"></i>
          );
        } else {
          scores.push(<i key={`star${i}`}>&#9734;</i>);
        }
      }

      return (
        <Col key={`review${index}`}>
          <Card style={{ height: "100%" }}>
            <Card.Body>
              <Card.Text>{scores}</Card.Text>
              <Card.Text className="align-middle">{review.text}</Card.Text>
            </Card.Body>
            <Card.Text className="pb-1">~{review.name}</Card.Text>
          </Card>
        </Col>
      );
    })
  );

  return (
    <Row className="justify-content-start" style={{ margin: "0 10%" }}>
      {stars}
    </Row>
  );
};

export default Reviews;
