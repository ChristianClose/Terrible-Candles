import React, { useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../../redux/productsSlice/productsSlice";
import "./Products.styles.css";

const Products = ({ displayItems }) => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => products.length === 0 && dispatch(getProducts()), [
    dispatch,
    products,
  ]);

  return (
    <>
      {loading ? (
        <i className="fas fa-spinner fa-pulse" />
      ) : (
        <Row
          className="justify-content-center"
          md={4}
          style={{ margin: "0 10%" }}
        >
          {products.slice(0, displayItems).map((product, index) => (
            <Col key={`product${index}`}>
              <Card
                as={Link}
                to={`/products/${product._id}`}
                className="product"
              >
                <Card.Body align="center">
                  <Card.Img
                    src={product.image}
                    style={{ background: "gray", height: "25vh" }}
                  />
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Products;
