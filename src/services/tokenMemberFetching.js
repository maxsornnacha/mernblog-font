
//ดึง Token

const getTokenMember=()=>{
    if(window !== 'undefined'){
        if(sessionStorage.getItem('tokenMember')){
            return JSON.parse(sessionStorage.getItem("tokenMember"))
        }else{
            return false
        }
    }
}

export default getTokenMember
