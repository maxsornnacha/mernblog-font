//ดึง Username

const getUsername=()=>{
    if(window !== 'undefined'){
        if(sessionStorage.getItem('username')){
            return JSON.parse(sessionStorage.getItem("username"))
        }else{
            return false
        }
    }
}

export default getUsername