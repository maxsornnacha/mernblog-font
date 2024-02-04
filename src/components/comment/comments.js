import userFetching from '../../services/userFetching'
import axios from 'axios'
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'
import tokenFetching from '../../services/tokenFectching'

const ShowComment = (props)=>{

  const redirect =useNavigate()

  const Delete=()=>{
    Swal.fire({
      title:`คุณต้องการที่จะลบ 'ความคิดเห็นที่${props.index+1}' หรือไม่`,
      icon:'warning',
      showCancelButton:true
  }).then((result)=>{
      if(result.isConfirmed){
    axios.put(`${process.env.REACT_APP_API}/deleteComment/${props.slug}`,{
      index:props.index
    },{
      headers:{
           Authorization: `Bearer ${tokenFetching()}`
      }
   })
    .then((response)=>{
      Swal.fire({
          title: "สำเร็จ",
          text: "'ลบความคิดเห็นสำเร็จ'",
          icon: "success"
        }).then(()=>{
          redirect('/')
        }).then(()=>{
          redirect(`/blog/${props.slug}`)
          //555 อันนี้เผื่อให้มันรีเฟรชใหม่ หลังจากเสร็จการทำงาน
          //พอดีโง่เกิน เลยใช้วิธีนี้
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
    <div className="card mb-2 mt-2">
        <div className="card-body" style={{display:'flex',justifyContent:"space-between"}}>
          <div>ความคิดเห็นที่ {props.index+1}:</div>
          <div className='text-muted'>ผู้เขียน: {props.name}</div>
          </div>
        <div className="card-body">
          <div dangerouslySetInnerHTML={{__html:props.text}} />
        </div>
        {userFetching() &&
        <div>
           <div className="card-footer" style={{display:"flex",justifyContent:"end"}}>
                <button type="submit"  className="btn btn-outline-danger" onClick={Delete}>ลบ</button>&nbsp;
          </div>
        </div>
        }
    </div>
    )
}

export default ShowComment