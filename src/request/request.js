import axios from 'axios'
import qs from 'qs'

function get(str){
    return axios({
            method:'get',
            url:str.url,
            responseType:'json'
        })
}
function post(str){
    return axios({
            method:'post',
            url:str.url,
            data:qs.stringify(str.data),
            withCredentials:str.withCredentials,
            responseType:'json',
            // headers:{
            //     'token':'123'
            // }
        })
}
export default {get,post}