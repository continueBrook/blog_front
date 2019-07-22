let actions = {
    getUuid({commit},arg){
        commit('UUID',arg)
    },
    getUuid_2({commit},arg){
        commit('UUID_2',arg)
    },
    getTdata({commit},arg){
        commit('TDATA',arg)
    }
}
export default actions