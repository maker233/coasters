import React, { Component } from 'react';
import AuthService from '../service/authService';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };
        this.service = new AuthService();
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        this.service.login(username, password)
            .then(response => {
                this.setState({ username: "", password: "" });
                this.props.setUser(response)
                window.location.assign('/coasters')
            })
            .catch(error => console.log(error))
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className="container">
                <h1>Inicia sesión</h1>
                <div className="row">
                    <div className="col-sm-12">
                        <form onSubmit={this.handleFormSubmit}>
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" name="username" className="form-control" value={this.state.username} onChange={e => this.handleChange(e)} />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <textarea name="password" className="form-control" value={this.state.password} onChange={e => this.handleChange(e)} />
                            </div>
                            <input type="submit" value="Signup" className="btn btn-outline-dark" />
                        </form>

                        <small>¿No tienes una cuenta? <Link to={"/signup"}> Regístrate ahora</Link></small>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;