import axios from "axios";

export default class services {

    constructor() {

        this.service = axios.create({
            baseURL: "http://localhost:3000/api/",
            withCredentials: true
        })
    }

    getCoasters = () => {
        const promise = this.service.get("getAllCoasters", { withCredentials: true })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
            })

        return promise;
    }

    postNewCoaster = coaster => {
        const promise = this.service.post("postCoaster", coaster, { withCredentials: true })
            .then(res => {
                console.log(res);
                return res.data;
            })

        return promise;
    }

    getOneCoaster = idCoaster => {
        const promise = this.service.get(`getOneCoaster/${idCoaster}`, { withCredentials: true })
            .then(res => {
                console.log(res);
                return res.data;
            })

        return promise;
    }


    handleUpload = theFile => {

        console.log('file in service: ', theFile)

        return this.service.post('/upload', theFile)
            .then(res => res.data)
            .catch(err => console.log(err));
    }
}
