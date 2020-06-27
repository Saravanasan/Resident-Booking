import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './theme.css'


export default class SignUp extends Component {
    state = {email: '', password: '', name: ''};

    handleChange = e =>{
        this.setState({[e.target.name] : e.target.value });
      }
    
      handleSubmit(event) {
        event.preventDefault();
      }
    render() {
        return (
          <div>
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="center">
            <form>
                <h3>Sign Up</h3>

                <div className="form-group" style={{width: 250}}>
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="Name" name='name'  value={this.state.name} onChange={e=>this.handleChange(e)}/>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name='email'  value={this.state.email} onChange={e=>this.handleChange(e)}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name='password'  value={this.state.password} onChange={e=>this.handleChange(e)}/>
                </div>

                <button type="button" className="btn btn-primary btn-block" onClick = {this.submit} >Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered  <Link to="/sign-in">sign in?</Link>        
                </p>
            </form>
            </div>
            </div>
        );
    }

    submit = e => {
        const payload = {
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
        }
        axios.post('https://bipolar-backend.herokuapp.com/signup', payload)
          .then((response) => {
            console.log(response.data)
          }, (error) => {
            alert(error.response.data)
            console.log(error);
          });
        
        }
}