import React, { useEffect, useState } from "react";
import { Col, Row, Card, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/productsSlice/productsSlice";
import { addItem, isOpen } from "../../redux/cartSlice/cartSlice";

const ProductPage = ({ match, history }) => {
  const { loading, products } = useSelector((state) => state.products);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }

    if (products.filter((item) => item._id === match.params.id).length === 0) {
      history.push("/");
    }
  }, [dispatch, products, history, match.params.id]);

  if (!loading) {
    const [product] = products
      .filter((item) => item._id === match.params.id)
      .map((item) => ({ ...item, qty }));
    if (!product) {
      history.push("/");
      return <div>Loading...</div>;
    }
    return (
      <>
        {console.log(qty)}
        {loading ? (
          <i className="fas fa-spinner fa-pulse" />
        ) : (
            <Row>
              <Col xl={5} align="center" className="mx-auto">
                <Card align="center">
                  <Card.Body>
                    <Card.Img src={product.image} className="mb-2" />
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Subtitle>${product.price}</Card.Subtitle>
                    <Card.Text>{product.description}</Card.Text>
                    <Form>
                      <Form.Row align="center" className="justify-content-center">
                        <Col md={4}>
                          <Form.Label>Quantity</Form.Label>
                          <Form.Control
                            as="select"
                            defaultValue={1}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            <option>5</option>
                            <option>4</option>
                            <option>3</option>
                            <option>2</option>
                            <option>1</option>
                          </Form.Control>
                          <Button
                            className="mt-2"
                            onClick={() => {
                              dispatch(addItem(product));
                              dispatch(isOpen(true));
                            }}
                          >
                            Add to Cart
                        </Button>
                        </Col>
                      </Form.Row>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
      </>
    );
  } else {
    return <i className="fas fa-spinner fa-pulse" />;
  }
};

export default ProductPage;
