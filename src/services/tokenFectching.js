
//ดึง Token

const getToken=()=>{
    if(window !== 'undefined'){
        if(sessionStorage.getItem('token')){
            return JSON.parse(sessionStorage.getItem("token"))
        }else{
            return false
        }
    }
}

export default getToken
