//ดึง iamgeURL

const getImage=()=>{
    if(window !== 'undefined'){
        if(sessionStorage.getItem('imageURL')){
            return JSON.parse(sessionStorage.getItem("imageURL"))
        }else{
            return false
        }
    }
}

export default getImage