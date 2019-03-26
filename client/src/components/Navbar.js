import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authService from '../service/authService';

class Navbar extends Component {

    constructor(props) {

        super(props)

        this.state = { loggedInUser: null }

        this.service = new authService()
    }


    componentWillReceiveProps(nextProps) {
        this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] })
    }


    logoutUser = () => {
        this.service.logout()
            .then(() => {
                this.setState({ loggedInUser: null });
                this.props.setUser(null);
            })
    }

    render() {

        if (this.state.loggedInUser) {

            return (
                <nav className="nav-style">
                    <small>Bienvenido, {this.state.loggedInUser.username}</small>
                    <ul>
                        <li>
                            <Link to='/coasters'>Administrar montañas rusas</Link>
                        </li>
                        <Link to='/coasters'>
                            <a href="#" onClick={() => this.logoutUser()}>Cerrar sesión</a>
                        </Link>
                    </ul>
                </nav>
            )
        }

        else {

            return (
                <nav className="nav-style">
                    <ul>
                        <li>
                            <Link to='/coasters'>Ver montañas rusas</Link>
                        </li>
                        <li>
                            <Link to='/login'>Iniciar sesión</Link>
                        </li>
                        <li>
                            <Link to='/signup'>Registrarse</Link>
                        </li>
                    </ul>
                </nav>
            )
        }
    }

}

export default Navbar;