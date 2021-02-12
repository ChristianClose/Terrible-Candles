import React, { useEffect } from "react";
import Hero from "../../components/Hero/Hero.component";
import { Row, Col, Container } from "react-bootstrap";
import Promo from "../../components/Promo/Promo.component";
import Reviews from "../../components/Reviews/Reviews.component";
import Products from "../../components/Products/Products.component";
import { batch, useDispatch } from "react-redux";
import { getPromos } from "../../redux/promosSlice/promosSlice";
import { getReviews } from "../../redux/reviewsSlice/reviewsSlice";
import { getProducts } from "../../redux/productsSlice/productsSlice";

function Home(props) {
  const links = [
    { text: "Learn More", link: "/products" },
    { text: "Buy", link: "/products" },
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    batch(() => {
      dispatch(getPromos);
      dispatch(getReviews);
      dispatch(getProducts);
    });
  }, [batch, dispatch]);

  return (
    <>
      <Hero
        backgroundUrl="https://cdn.pixabay.com/photo/2018/11/06/14/01/candles-3798374_960_720.jpg"
        title="Strawberry Candle"
        body="Introducing the all new strawberry scented candle!"
        links={links}
      />
      <main>
        <Row className="justify-content-center">
          <Promo />
        </Row>
        <br />
        <Row className="justify-content-center">
          <h2>Newest Products</h2>
          <Products displayItems={3} />
        </Row>
        <br />
        <Container
          align="center"
          className="pb-3 pt-1"
          style={{ background: "hsla(100, 0%, 50%, 0.4)" }}
        >
          <Row className="mt-3">
            <Col>
              <h2>What our customers are saying:</h2>
            </Col>
            <Reviews />
          </Row>
        </Container>
      </main>
    </>
  );
}

export default Home;