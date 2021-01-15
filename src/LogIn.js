import React, { Component } from 'react';
import {Container, Row, Col, Button, Image} from 'react-bootstrap';
import {Link} from "react-router-dom"
import loginArt from './pictures/login_art.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css'
import './LogIn.css'

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = { 
			email: "",
			password: ""
		}
		this.errorMessage = React.createRef();
		this.loginSubmit = this.loginSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
    }

	loginSubmit(e){
		e.preventDefault();
		// const errorMessageElement = this.errorMessage;

        fetch('http://127.0.0.1:5000/login',{
			method:'POST',
			mode:'cors',
			cache:'no-cache',
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    body:JSON.stringify({
				"email": this.state.email,
				"password": this.state.password,
			})		
		})
      	.then(
	        (result) =>	result.json()
        )
        .then( (data) => {
    		if(data.success){	
				localStorage.setItem("email", this.state.email);
				this.props.history.push('/');
			}else{
        		// errorMessageElement.current.html = "Something went wrong"
			}
        },
        	// To catch any error
        	(error) => {
        		// errorMessageElement.current.html = "Something went wrong"
        	}
        );
	}
	
	handleInput(e){
		const name = e.target.name;
		
		this.setState({
			[name]: e.target.value
		});
	}

    render() { 
        return ( 
            <Container>
				<Row className="login-row">
					<Col md={6} className="flex-center">
						<div>
							<div>
								<h1>Welcome Back!</h1>
							</div>
							<Image className="login-art-image" src={loginArt} />
							<div>
								<h2>Amazing things await you.</h2>
							</div>
						</div>
					</Col>
					<Col md={6} className="flex-center">
						<div className="login-box">
							<form onSubmit={this.loginSubmit}>
								<input onChange={this.handleInput} type="text" placeholder="Email Address" name="email" className="auth-input" />
								<input onChange={this.handleInput} type="password" placeholder="Password" name="password" className="auth-input" />
								<div ref={this.errorMessageElement}>

								</div>
								<Button type="submit">Log In</Button>
								<div className="alt-auth-link">
									<Link to="/signup" >
										Don't have a account? Sign up
									</Link>
								</div>
							</form>
						</div>
					</Col>
				</Row>
			</Container>
        );
    }
}
 
export default LogIn;