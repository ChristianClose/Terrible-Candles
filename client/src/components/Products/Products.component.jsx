import React, { useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/productsSlice/productsSlice";

const Products = ({ displayItems }) => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => !products && dispatch(getProducts()), [dispatch, products]);

  return (
    <>
      {loading ? (
        <i className="fas fa-spinner fa-pulse" />
      ) : (
        <Row className="justify-content-center" style={{ margin: "0 10%" }}>
          {products.slice(0, displayItems).map((product, index) => (
            <Col key={`product${index}`}>
              <Card>
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
