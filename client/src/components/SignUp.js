import React, { Component } from 'react';
import AuthService from '../service/authService';
import { Link } from 'react-router-dom'

class Signup extends Component {

    constructor(props) {

        super(props)

        this.state = { username: '', password: '' }

        this.service = new AuthService()
    }


    handleFormSubmit = event => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;

        this.service.signup(username, password)
            .then(response => {
                this.setState({
                    username: "",
                    password: ""
                });
                this.props.setUser(response)
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
                <h1>Formulario de registro</h1>
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

                        <small>¿Ya tienes una cuenta? <Link to={"/"}> Inicia sesión ahora</Link></small>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;