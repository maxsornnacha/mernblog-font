//เก็บ MemberName && Status ลงใน SessionStorage
const Authentication=(response)=>{
    if(window !== "undefined"){
        //เก็บข้อมูลลง session Storage
        sessionStorage.setItem('member',JSON.stringify(response.data.member))
        sessionStorage.setItem('status',JSON.stringify(response.data.status))
        sessionStorage.setItem('imageURL',JSON.stringify(response.data.image))
        sessionStorage.setItem('tokenMember',JSON.stringify(response.data.tokenMember))
    }
}

export default Authentication