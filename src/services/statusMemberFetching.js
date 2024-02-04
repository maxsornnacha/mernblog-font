
//ดึง Status

const getToken=()=>{
    if(window !== 'undefined'){
        if(sessionStorage.getItem('status')){
            return JSON.parse(sessionStorage.getItem("status"))
        }else{
            return false
        }
    }
}

export default getToken