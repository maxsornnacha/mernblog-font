import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import {useState} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import {useNavigate,Link} from 'react-router-dom'
import memberFetching from '../../services/memberFetching'
import userFetching from '../../services/userFetching'
import tokenMemberFetching from '../../services/tokenMemberFetching'
import tokenFetching from '../../services/tokenFectching'
import '../../components/css/loadingApi.css'

const CommentComponent=(props)=>{
const [loading,setLoading] = useState(false)
const [state,stateSet] = useState('')

const Text=(event)=>{
    stateSet(event)
}

const redirect = useNavigate()

const addComment=()=>{

if(state.length !== 0){
    Swal.fire({
        title:`คุณต้องการที่จะบันทึกความคิดเห็นหรือไม่`,
        icon:'warning',
        showCancelButton:true
    }).then((result)=>{
    if(result.isConfirmed){
        setLoading(true)
        axios.put(`${process.env.REACT_APP_API}/${userFetching()?'addComment':'addCommentForMember'}/${props.slug}`,{
            comment:state,
            name:(userFetching()?userFetching():memberFetching())
           },{
            headers:{
                 Authorization: `Bearer ${tokenFetching()?tokenFetching():tokenMemberFetching()}`
            }
         })
           .then((response)=>{
            Swal.fire({
                title: "สำเร็จ",
                text: "'บันทึกสำเร็จ'",
                icon: "success"
              }).then(()=>{
                redirect('/')
              }).then(()=>{
                redirect(`/blog/${props.slug}`)
                //555 อันนี้เผื่อให้มันรีเฟรชใหม่ หลังจากเสร็จการทำงาน
                //พอดีโง่เกิน เลยใช้วิธีนี้
              })
           })
           .finally(()=>setLoading(false))

    }else{
        setLoading(false)
    }
    })
}else{
    Swal.fire({
        icon: "error",
        title:"ผิดพลาด",
        text:"กรุณาแสดงความคิดเห็นก่อนบันทึก",
      });
}
  
}



    return(
    <div>
    {userFetching() && 
        <div className="form-group mt-3">
        <label>แสดงความคิดเห็น</label>
        <ReactQuill theme="snow" onChange={Text} value={state} style={{backgroundColor:'white',color:'black',paddingBottom:'10vh',height:"20vh"}}/>
        <input type='submit' className='btn btn-light mt-2' value='บันทึก' onClick={addComment}/>
        </div>
    }
    {memberFetching() && 
        <div className="form-group mt-3">
        <label>แสดงความคิดเห็น</label>
        <ReactQuill theme="snow" onChange={Text} value={state} style={{backgroundColor:'white',color:'black',paddingBottom:'10vh',height:"20vh"}}/>
        <input type='submit' className='btn btn-light mt-2' value='บันทึก' onClick={addComment}/>
    </div>
    }
    {!memberFetching() && !userFetching() &&
        <div className="form-group mt-3">
            <Link to='/login' className='btn btn-outline-light mt-2 pb-4 pt-4' style={{width:'100%'}} >กรุณาเข้าสู่ระบบก่อนที่จะแสดงความคิดเห็น<br/><br/>คลิ๊กเพื่อเข้าสู่ระบบ</Link>
        </div>
    }
    {loading &&
        <div>
            <div  style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
               <span className="loading" > 
                <div className="spinner-border p-5" role="status">
                <span className="visually-hidden" style={{}}>loading...</span>
                </div>
                <div className="mt-3 ms-3">loading...</div>
                </span>
        </div>
        </div>
        }
    </div>
    )
}

export default CommentComponent