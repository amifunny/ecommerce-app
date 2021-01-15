import React, { Component } from 'react';
import {Container, Row, Col, Button, Image} from 'react-bootstrap';
import "./ProductPage.css";
import {Redirect} from 'react-router-dom'

import productImg from "./pictures/product_img.jpg"
import bannerImg from "./pictures/product_banner.jpg"
import aboutArt1 from "./pictures/about_latest.svg"
import aboutArt2 from "./pictures/about_quality.svg"
import aboutArt3 from "./pictures/about_simple.svg"
import arrowDownIcon from "./pictures/arrow_down.svg"
import ratingStar from "./pictures/rating_star.svg"


const ProductPage = () => {
    return ( 
        <div>
            <HeadBanner />
            <ProductSection />
            <AboutSection />
            <FooterSection />
        </div>
    );
}

export default ProductPage;

const HeadBanner = () => {
    return ( 
        <div>
            <div className="app-top-bar flex-center">
                <div>
                    <h3>E-Commerce</h3>
                    <div>The future is here.</div>
                </div>
                <UserBar />
            </div>
            <div className="banner-img-div">
                <Image className="banner-img" src={bannerImg} />
                <div className="flex-center banner-cover">
                    <div>
                        <h1>Only the Best.</h1>
                        <h6>Loved wordwide.</h6>
                    </div>
                </div>
            </div>
        </div>
    );
}

class UserBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: "",
            message:"",
            image:"",
            email: localStorage.getItem("email"),
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
                <div className="user-profile-bar">
                    <div onClick={this.onBarClick}
                    className="user-profile-bar-inner">
                        <span>{this.state.name}</span>
                        <Image className="user-profile-pic" src={this.state.image} roundedCircle/>
                        <Image className="arrow-down-icon" src={arrowDownIcon}/>

                        { this.state.isShown && 
                        (<div ref={this.infoFloat} className="user-info-float">
                            <div>Email : {this.state.email}</div>
                            <div>Description : {this.state.message}</div>
                        </div>)
                        }
                    </div>
                    
                </div>
            );
                    }
    }
}

const ProductSection = () => {
    let productList = [...Array(12).keys()].map((num)=>{
        return (
            <Col key={num} md={4}>
                <ProductCard />
            </Col>
        )
    });
    
    return ( 
        <Container>
            <Row>
                <h1 className="product-section-head"> Products </h1>
            </Row>
            <Row>
                {productList}
            </Row>
        </Container>
    );
}
 

const ProductCard = () => {

    const productName = "Mauve Gown with resham and sequins"
    const totalProductRating = 5.0;
    const productRating = "4.0";
    const productPrice = "3560.00";
    
    return ( 
        <div>
            <div class="product-image-div">
                <Image src={productImg} className="product-image" />
                <div className="product-float-div">
                    <div className="product-buy-cover flex-center">
                        <div>
                            <Button className="buy-button"> Buy Now</Button>
                        </div>
                    </div>
                    <div className="product-info">
                        <div className="product-info-title">{productName}</div>
                        <div>
                            <div className="flex-left">
                                <div>{productRating}</div>
                                <Image className="product-rating-icon"width="2rem" src={ratingStar} />
                            </div>
                        <RatingBar totalRating={totalProductRating} rating={productRating} />
                        </div>
                        <div> 
                            <span>₹</span>
                            <span className="product-price">{productPrice}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const RatingBar = (props) => {
    const fillWidth = ( 100*(props.rating/props.totalRating) )

    return ( 
        <div className="rate-bar">
            <div style={{width: fillWidth + '%'}} className="rate-bar-fill"></div>
        </div>
    );
}
  
const AboutSection = () => {
    return ( 
        <Container fluid className="about-section">
            <Container>
            <Row className="flex-center">
                <div>
                    <h1>Why People love us?</h1>
                    <h5>Because we mean ...</h5>
                </div>
            </Row>
            <Row>
                <Col md={4}>
                    <div className="about-feature" >
                        <Image className="about-feature-img" src={aboutArt1} />
                        <h3>Latest</h3>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="about-feature" >
                        <Image className="about-feature-img" src={aboutArt2} />
                        <h3>Quality</h3>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="about-feature">
                        <Image className="about-feature-img" src={aboutArt3} />
                        <h3>Simple</h3>
                    </div>
                </Col>
            </Row>
            </Container>
        </Container>
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

