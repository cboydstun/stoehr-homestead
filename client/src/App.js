//import dependencies
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import auth token
import setAuthToken from "./utils/setAuthToken";

//countdown package
import { CountDown } from "volkeno-react-countdown";
import "volkeno-react-countdown/dist/countdownComponent/CountdownComponent.css";

//import components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";

//import styling
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";

//check for token
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export default function App() {
  return (
    <div className="App">
      <Container fluid>
        <Col>
          <Row>
            <Header />
          </Row>

          <Row>
            <CountDown
              deadline={`31 Dec 2021 09:00:00 GMT+1`}
              dayTextLabel={"days"}
              hourTextLabel={"hours"}
              minuteTextLabel={"minutes"}
              secondTextLabel={"seconds"}
              boxWidth="100"
              boxHeight="100"
              textLineHeight="82"
              textFontSize="30"
              textFontWeight="700"
              className="my-best-countdown-class"
            />
          </Row>

          <Row>
            <Footer />
          </Row>
        </Col>
      </Container>
    </div>

    // <Router>
    //     <Navbar />

    //     <Switch>
    //         <Route exact path="/" component={Home} />
    //         <Route path="/register" component={Register} />
    //         <Route path="/login" component={Login} />
    //     </Switch>
    // </Router>
  );
}
