//fetch library and do post request, interact with apis
import axios from "axios";
const instance=axios.create({
    baseURL:'https://us-central1-fir-b9fc0.cloudfunctions.net/api'
    //local backend api >>(cloud function URL)
})
export default instance;
    

//http://localhost:5001/fir-b9fc0/us-central1/api/'