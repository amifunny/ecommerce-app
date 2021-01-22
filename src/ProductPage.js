import React, { Component } from 'react';
import {Container, Row, Col, Button, Card, Image, Tabs,Nav, Tab} from 'react-bootstrap';
import "./ProductPage.css";
import "./ProductPageResponsive.css";

import {Redirect} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import AboutImage from './pictures/product_banner1.jpg'
import CardBody from './pictures/card_body.jpg'
import CardProfile from './pictures/card_profile.jpeg'
import {BsHeart} from 'react-icons/bs';
import { RiArrowDownSLine } from "react-icons/ri";
import { IoWalletOutline, IoLocationSharp, IoHeartOutline,IoChatbubbleOutline } from "react-icons/io5";
import {AiOutlineShoppingCart} from "react-icons/ai";

const ProductPage = () => {
    return ( 
        <>
            <Menu />
            <Header />
            <AboutSection />
            <ProductSection />
            <FooterSection />
        </>
    );
}

export default ProductPage;

const Menu = () => {
    return ( 
        <Container className="menu-container" fluid>
            <Row>
                <Col md={8} className="menu-list">
                    <div className="flex-display ">
                        <div className="menu-item all-drop-down">
                            All
                            <RiArrowDownSLine />
                        </div>
                        <div className="menu-item">Mobiles</div>
                        <div className="menu-item">Laptops</div>
                        <div className="menu-item">Video Games</div>
                        <div className="menu-item">Watches</div>
                        <div className="menu-item">Table</div>
                        <div className="menu-item">More</div>
                    </div>
                </Col>
                <Col md={4}>
                    <UserBar />
                </Col>
            </Row>
        </Container>
    );
}

const Header = () =>{
    return (
        <Container className="header-container" fluid>
            <Row className="header-row">
                <Col sm={12} md={3}>
                    <h1 className="company-name">ZHiffy</h1>
                </Col>
                <Col sm={12} md={5}>
                    <input placeholder="All"
                    className="search-bar" />
                </Col>
                <Col sm={12} md={4} className="action-list flex-display">
                    <div className="header-button">
                        <IoWalletOutline className="header-button-icon" />
                        <span>Balance</span>
                    </div>
                    <div className="header-button">
                        <AiOutlineShoppingCart className="header-button-icon"/>
                    </div>
                    <Button className="header-sell-button header-button"
                    variant="primary">Sell</Button>
                </Col>
            </Row>
        </Container>
    )
}


const AboutSection = () => {
    return ( 
        <Container>
            <Row className="about-row">
                <Col className="about-info" md={6} sm={12}>
                    <div>
                        <h2 className="about-info-text">
                            Sell, Buy & Exchange Pre Used.
                        </h2>
                    </div>
                    <div>
                        <h2 className="about-info-text">
                            Without fear. Guaranteed.
                        </h2>
                    </div>
                    <div>
                        <h6 className="about-info-text">
                            Verified Profiles.
                            Free Delivery.
                            Online transactions only.
                        </h6>
                    </div>
                </Col>
                <Col md={6} sm={12}>
                    <Image className="about-image" src={AboutImage} />
                </Col>
            </Row>
        </Container>
    );
}
 

class UserBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: "",
            message:"",
            image:"",
            // email: localStorage.getItem("email"),
            email: "k@gmail.com",
            location:"Hyderabad",
            isShown: false
        }
        
        this.onBarClick = this.onBarClick.bind(this);
    }

    componentDidMount(){

        fetch('http://127.0.0.1:5000/session',{
			method:'POST',
			mode:'cors',
			cache:'no-cache',
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    body:JSON.stringify({
				"email": this.state.email
			})		
		})
      	.then(
	        (result) =>	result.json()
        )
        .then( (data) => {
				this.setState({
                    name: data.name,
                    message: data.msg,
                    image: "http://127.0.0.1:5000"+data.img,
                    email: data.email
                });
        });
    }

    onBarClick(){
        this.setState({
            isShown: !this.state.isShown
        });
    }

    render() { 

        if(this.state.email===""){
            return <Redirect to="/signup" />
            
        }else{
            return (
                <div className="user-column flex-display" style={{height:"100%"}}>
                    <div className="user-bar-button flex-center">
                        <span>
                            <IoLocationSharp className="user-bar-icon"/>
                        </span>
                        <span className="user-location">
                            {this.state.location}
                        </span>
                    </div>
                    <div onClick={this.onBarClick}
                    className="user-bar-button user-profile-button flex-center">
                        <Image className="user-profile-pic" src={this.state.image}/>
                        { this.state.isShown && 
                        (<div ref={this.infoFloat} className="user-info-float">
                            <div className="user-info-div">
                                <div className="user-info-title">Name</div>
                                <div className="user-info-value">{this.state.name}</div>
                            </div>
                            <div className="user-info-div">
                                <div className="user-info-title">Email</div>
                                <div className="user-info-value">{this.state.email}</div>
                            </div>
                            <div className="user-info-div">
                                <div className="user-info-title">Description</div>
                                <div className="user-info-value">{this.state.message}</div>
                            </div>
                            <div className="user-info-div logout-div flex-center">
                                <Button variant="danger">LogOut</Button>
                            </div>
                        </div>)
                        }
                    </div>
                    <div className="user-bar-button flex-center">
                        <IoHeartOutline className="user-bar-icon"/>
                    </div>
                    <div className="user-bar-button flex-center">
                        <IoChatbubbleOutline className="user-bar-icon"/>
                    </div>
                </div>
            );
                    }
    }
}

const ProductSection = () => {
    
    return ( 
    <Container>
    <Tab.Container id="left-tabs-example" defaultActiveKey="store">
        <Row className="product-tabs-row">
            <Col>
                <Nav variant="pills" className="flex-row">
                    <Nav.Item>
                    <Nav.Link eventKey="store">Just in Store</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="you">For You</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="viewed">Most Viewed</Nav.Link>
                    </Nav.Item>
                    <Nav.Item style={{borderRight: "1px solid #d3d3d3"}}>
                        <Nav.Link eventKey="hot">What's Hot?</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Col>
        </Row>
        <Row>
            <Col>
                <Tab.Content>
                    <Tab.Pane eventKey="store">
                        <ProductList />
                    </Tab.Pane>
                    <Tab.Pane eventKey="you">
                        <ProductList />
                    </Tab.Pane>
                    <Tab.Pane eventKey="viewed">
                        <ProductList />
                    </Tab.Pane>
                    <Tab.Pane eventKey="hot">
                        <ProductList />
                    </Tab.Pane>
                </Tab.Content>
            </Col>
        </Row>
    </Tab.Container>
    </Container>    
    );
}

const ProductList = ()=>{
    let productList = [...Array(4).keys()].map((num)=>{
        return (
            <Col className="flex-center" key={num} lg={3} xs={12} sm={6} md={4}>
                <ProductCard />
            </Col>
        )
    });

    return (
        <Row>
            {productList}
        </Row>
    )
}

const ProductCard = () => {
    return ( 
        <Card style={{ maxWidth: '15rem', width: "100%" }}>
            <Card.Header className="flex-center">
                <div style={{width:"25%"}}>
                    <Image className="card-profile-img"
                    roundedCircle src={CardProfile}/>
                </div>
                <div className="card-header-text" style={{width:"50%"}}>
                    <div>DogsDayOut</div>
                    <div className="card-duration">6 Days ago</div>
                </div>
                <div style={{width:"25%"}}>
                    <BsHeart className="card-like-button" />
                </div>
            </Card.Header>
            <Card.Img className="card-body-img" variant="top" src={CardBody} />
            <Card.Body className="card-body">
                <Card.Title>Cool Caption here...</Card.Title>
                <Card.Text>
                    In the car with beanie.
                </Card.Text>
            </Card.Body>
        </Card>
    );
}


const FooterSection = () => {
    return ( 
        <Container fluid className="footer-container">
            <Row className="flex-center">
                <div>
                © E-Commerce
                </div>
            </Row>
        </Container>
    );
}

