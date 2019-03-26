import React, { Component } from 'react'
import CoastersService from '../service/coastersService'
import { Link } from 'react-router-dom'

class CoasterDetails extends Component {

    constructor(props) {

        super(props)

        this.state = { coaster: {} }

        this.service = new CoastersService()
    }

    componentDidMount() {

        this.service.getOneCoaster(this.props.match.params.id)
            .then(response => this.setState({ coaster: response }))
    }




    render() {
        return (
            <div className="container coaster-detail">
                <h1>{this.state.coaster.title}</h1>
                <div className="row">

                    <div className="col-md-8">
                        <img src={this.state.coaster.imageUrl} alt={this.state.coaster.title}></img>
                    </div>
                    <div className="col-md-4">
                        <h4>Descripción</h4>
                        <p>{this.state.coaster.description}</p>
                        <h4>Inversiones</h4>
                        <p>{this.state.coaster.inversions}</p>
                        <h4>Longitud</h4>
                        <p>{this.state.coaster.length} metros</p>
                        <Link className="btn btn-outline-dark" to={`/coasters`}>Volver</Link>


                    </div>

                </div>
            </div>

        )
    }

}

export default CoasterDetails