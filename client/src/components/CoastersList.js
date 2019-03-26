import React, { Component } from 'react'
import CoastersService from '../service/coastersService'
import CoasterCard from './CoasterCard'
import CoastersForm from './CoastersForm'

class CoastersLists extends Component {

    constructor(props) {

        super(props)

        this.state = {
            loggedInUser: null,
            coasters: []
        }

        this.services = new CoastersService()
    }


    componentWillReceiveProps(nextProps) {
        this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] })
    }


    getAllCoasters = () => {
        return this.services.getCoasters()
            .then(data => {
                this.setState({
                    coasters: data
                })
            })
    }


    componentDidMount() {
        this.getAllCoasters()
    }


    render() {
        return (

            <div className="container">

                <h1>Montañas rusas</h1>

                {
                    this.state.loggedInUser ?
                        <CoastersForm refreshCoasters={this.getAllCoasters} />
                        : null
                }


                <div className="row coaster-list">

                    {
                        this.state.coasters.map(coaster => <CoasterCard key={coaster._id} {...coaster} />)
                    }

                </div>
            </div>
        )
    }
}


export default CoastersLists