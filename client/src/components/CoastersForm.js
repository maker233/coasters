import React, { Component } from 'react'
import CoastersService from '../service/coastersService'
import Modal from 'react-modal'


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '40%'
    }
}

Modal.setAppElement('#root')




class CoastersForm extends Component {

    constructor(props) {

        super(props)

        this.state = {
            modalIsOpen: false,
            coaster: {
                title: '',
                description: '',
                inversions: '',
                length: '',
                imageUrl: ''
            }
        }

        this.services = new CoastersService()
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    handleState = e => {
        const { name, value } = e.target;

        this.setState({
            coaster: {
                ...this.state.coaster, [name]: value
            }
        })
    }

    handleFileUpload = e => {

        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);

        this.services.handleUpload(uploadData)
            .then(response => {
                this.setState({
                    coaster: {
                        ...this.state.coaster, imageUrl: response.secure_url
                    }
                })
            })
            .catch(err => console.log(err))
    }


    handleSubmit = e => {
        e.preventDefault()

        this.services.postNewCoaster(this.state.coaster)
            .then(x => this.props.refreshCoasters())

        this.setState({
            coaster: {
                title: '',
                description: '',
                inversions: '',
                length: '',
                imageUrl: ''
            }
        })
        this.closeModal()
    }






    render() {
        return (
            <div>
                <button onClick={this.openModal} className="btn newCoaster btn-primary">Nueva montaña rusa</button>
                <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={customStyles}>

                    <h2>Nueva montaña rusa</h2>
                    <form onSubmit={this.handleSubmit}>

                        <div className="form-group">
                            <label>Título</label>
                            <input type="text" className="form-control" name="title" value={this.state.coaster.title} onChange={(e) => this.handleState(e)} />
                        </div>

                        <div className="form-group">
                            <label>Descripción</label>
                            <input type="text" className="form-control" name="description" value={this.state.coaster.description} onChange={(e) => this.handleState(e)} />
                        </div>

                        <div className="form-group">
                            <label>Longitud</label>
                            <input type="number" className="form-control" name="length" value={this.state.coaster.length} onChange={(e) => this.handleState(e)} />
                        </div>

                        <div className="form-group">
                            <label>Inversiones</label>
                            <input type="number" className="form-control" name="inversions" value={this.state.coaster.inversions} onChange={(e) => this.handleState(e)} />
                        </div>

                        <div className="form-group">
                            <label>Imagen</label>
                            <input type="file" className="form-control" onChange={(e) => this.handleFileUpload(e)} />
                        </div>

                        <button type="submit" className="btn btn-primary">Crear</button>

                    </form>

                </Modal>
            </div>
        )
    }
}


export default CoastersForm