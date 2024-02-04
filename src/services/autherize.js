

//เก็บ token && username ลงใน SessionStorage
const Authentication=(response)=>{
    if(window !== "undefined"){
        //เก็บข้อมูลลง session Storage
        sessionStorage.setItem('token',JSON.stringify(response.data.token))
        sessionStorage.setItem('username',JSON.stringify(response.data.username))
    }
}

export default Authentication