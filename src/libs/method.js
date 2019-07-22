let method = {
    removeDuplicate:function(str,option){
        let obj = {};
        let a = str.reduce((cur,next) => {
            obj[next[option]] ? "" : obj[next[option]] = true && cur.push(next);
            return cur;
        },[]) //设置cur默认类型为数组，并且初始值为空的数组
        return a
    },
    data2json:function (str){
        let res = []
        str.forEach(item =>{
            Object.defineProperties(item,{
                children:{
                    value:[],
                    enumerable:true,
                    writable:true
                }
            }),
            str.forEach(a =>{
                if(item.commentId == a.belongId){
                    item.children.push(a);
                }
            })
        })
        str.forEach(item =>{
            if(item.belongId == null){
                res.push(item)
            }
        })
        return res
    },
    flattened:function(arr){
        let str = arr.reduce((a,b) =>{
            return a.concat(b)
        },[])
        return str
    },
    cookieReg:function(str,target){
        let res = ''
        if(str.indexOf(';')){
            let a = str.split('; ')
            a.forEach(item =>{
                let b = item.split('=')
                if(b[0] == target) {
                    res = b[1]
                }
            })
            return res
        }else{
            let a = str.indexOf('=')
            let b = str.substring(a,str.length)
            return b
        }
    }
}
export default method