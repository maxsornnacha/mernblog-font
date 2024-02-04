import axios from "axios"
import Swal from 'sweetalert2'
import tokenFetching from '../services/tokenFectching'
import tokenMemberFetching from '../services/tokenMemberFetching'
import userFetching from '../services/userFetching'
import memberFetching from '../services/memberFetching'

const DeleteComponent=(props)=>{

    const deleteBlog=(event)=>{
        event.preventDefault()
        
        Swal.fire({
            title:`คุณต้องการที่จะลบบทความเรื่อง '${props.title}' หรือไม่`,
            icon:'warning',
            showCancelButton:true
        }).then((result)=>{
            if(result.isConfirmed){
                axios.delete(`${process.env.REACT_APP_API}/${tokenFetching()?'blog':'blog/member'}/${props.id}`,{
                   headers:{
                        Authorization: `Bearer ${tokenFetching()?tokenFetching():tokenMemberFetching()}`
                   }
                })
                .then((response)=>{
                    Swal.fire({
                        title: "สำเร็จ",
                        text: "'ลบข้อมูลสำเร็จ'",
                        icon: "success"
                      }).then((status)=>{
                        if(status.isConfirmed){
                            window.location.reload()
                        }
                      })
                      //อัพเดตบน หน้าหลัก
                      axios.get(`${process.env.REACT_APP_API}/blogs/${userFetching()?  
                        userFetching():memberFetching()}`)
                        .then((response)=>{
                            props.updateState(response.data)
                        })
                        .catch((err)=>{
                            console.log('error',err)
                        })

                      
                })

                .catch((err)=>{
                    Swal.fire({
                        icon: "error",
                        title: "เกิดข้อผิดพลาด",
                        text: err.response.data.error,
                      });
                }) 
            }
        })
         
    }

    return(
    <div>
    <form onSubmit={deleteBlog}>
        <input className="btn btn-dark" type="submit" value="ลบบทความ"/>
    </form>
    </div>
    )
}

export default DeleteComponent