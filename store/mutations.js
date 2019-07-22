import {accountLogin} from '../src/request/api'
let mutations = {
    TDATA(state,arg){
        if(arg){
            state.tdata = {code:0}
        }else{
            accountLogin('t','t').then(res =>{
                state.tdata = res.data
            })
        }
    },
    UUID(state,arg){
        state.uuid = arg
    },
    UUID_2(state,arg){
        state.uuid_2 = arg
    }
}

export default mutations