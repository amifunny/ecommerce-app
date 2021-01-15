import React, { Component } from 'react';
import signupArt from './pictures/signup_art.svg'
import './SignUp.css'
import {Container, Row, Col, Button, Image} from 'react-bootstrap';
import {Link} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

class SignUp extends Component {
    constructor(props) {
        super(props);
		this.state = { 
			name:"",
			email:"",
			password:"",
			primaryImg:""
		}
		this.errorMessage = React.createRef();
		this.fileInput = React.createRef();
		this.primaryImg = React.createRef();

		this.registerSubmit = this.registerSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
    }

    registerSubmit(e){
		e.preventDefault();

		let formData = new FormData();
		formData.append( "name",this.state.name )
		formData.append( "email",this.state.email )
		formData.append( "password",this.state.password )
		formData.append( "primary_img",e.target.primaryImg.files[0] )

        fetch('http://127.0.0.1:5000/register',{
			method:'POST',
			mode:'cors',
			cache:'no-cache',
		    body:formData		
		}).then( (result) => result.json() )
        .then( (data) => {
    		if(data.success){	
				localStorage.setItem("email", this.state.email);
				this.props.history.push('/');
			}else{
        		// errorMessageElement.html = "Something went wrong"
			}
        },
        	// To catch any error
        	(error) => {
        		// errorMessageElement.html = "Something went wrong"
        	}
        );
	}
	
	handleInput(e){
		const name = e.target.name;
		
		if(name==="primaryImg"){
			this.primaryImg.current.src = URL.createObjectURL(e.target.files[0]) ;
			this.setState({
				[name]: e.target.files[0]
			});
		}else{
			this.setState({
				[name]: e.target.value
			});
		}
	}

    render() { 
        return ( 
			<Container>
				<Row className="signup-row">
					<Col md={6} className="flex-center">
						<div>
							<div>
								<h1>Welcome</h1>
							</div>
							<Image className="signup-art-image" src={signupArt} />
							<div>
								<h2>Amazing things await you.</h2>
							</div>
						</div>
					</Col>
					<Col md={6} className="flex-center">
						<div className="signup-box">
							<form encType="multipart/form-data" onSubmit={this.registerSubmit}>
								<div>
								{/* style={{borderRadius:"50%"}} */}
									<label onClick={()=> this.fileInput.current.click()}>
										<Image ref={this.primaryImg} roundedCircle className="primary-image-show" src="http://via.placeholder.com/150x150" />
									</label>
									<input onChange={this.handleInput} ref={this.fileInput} name="primaryImg" type="file" accept="image/png, image/jpeg"
									style={{display: "none"}}/>
								</div>
								<input type="text" placeholder="Name" name="name" onChange={this.handleInput} className="auth-input" />
								<input type="text" placeholder="Email Address" onChange={this.handleInput} name="email" className="auth-input" />
								<input type="password" placeholder="Password" onChange={this.handleInput} name="password" className="auth-input" />
								<div className="error-message" ref={this.errorMessage}>

								</div>
								<Button type="submit">SignUp</Button>
								<div className="alt-auth-link">
									<Link to="/login">
										Already have a account? Login.
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
 
export default SignUp;