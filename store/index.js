import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

let state = {
    uuid:'',
    uuid_2:'',
    tdata:''
}
let store = new Vuex.Store({
    state,
    mutations,
    actions
})

export default store