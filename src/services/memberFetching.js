//ดึง Member

const getUsername=()=>{
    if(window !== 'undefined'){
        if(sessionStorage.getItem('member')){
            return JSON.parse(sessionStorage.getItem("member"))
        }else{
            return false
        }
    }
}

export default getUsername