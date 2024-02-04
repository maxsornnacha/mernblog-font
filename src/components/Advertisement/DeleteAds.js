import axios from 'axios'
import Swal from 'sweetalert2'
import tokenFetching from '../../services/tokenFectching'

const DeleteAds =(props)=>{
    
    const deleteAds=(event)=>{
        event.preventDefault()
        Swal.fire({
            title:`คุณต้องการที่จะลบบทความเรื่อง '${(props.topic).length>0?props.topic:'ไม่มีหัวข้อ'}' หรือไม่`,
            icon:'warning',
            showCancelButton:true
        }).then((result)=>{
            if(result.isConfirmed){
                axios.delete(`${process.env.REACT_APP_API}/adsDelete/${props.id}`,{
                   headers:{
                        Authorization: `Bearer ${tokenFetching()}`
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

                       //เรียนข้อมูลโฆษณาทั้งหมด
                     axios.get(`${process.env.REACT_APP_API}/ads`)
                     .then((response)=>{
                            props.updataAds(response.data)
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
        <button type="submit" onClick={deleteAds} className="btn btn-dark"  style={{width:'100%'}}>ลบ</button>
    </div>
    )
}

export default DeleteAds