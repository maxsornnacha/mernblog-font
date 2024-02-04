import { Link } from "react-router-dom"
import clientServerModel from '../components/images/clientServerModel.jpg'
import blogs from '../components/images/blogs.jpg'
import './css/inputFocus.css'
import { useState } from "react"
import tokenFetching from '../services/tokenFectching'
import tokenMemberFetching from '../services/tokenMemberFetching'
import userFetching from '../services/userFetching'
import Swal from 'sweetalert2'
import axios from "axios"

const FooterComponent =()=>{
    const [email,setEmail] = useState('')
    const [loadingSubmit,loadingSubmitSet]= useState(false)

    const handleSendingEmail=(event)=>{
        event.preventDefault()
        
        Swal.fire({
            title:`คุณต้องการจะส่งอีเมลเพื่อรับข่าวสารใหม่ๆหรือไม่`,
            icon:'warning',
            showCancelButton:true
        }).then((result)=>{
            loadingSubmitSet(true)
            if(result.isConfirmed){
                axios.post(`${process.env.REACT_APP_API}/emailnotification`,{
                    email
                })
                .then((result)=>{
                    Swal.fire({
                        icon: "success",
                        title: "ส่งอีเมลสำเร็จ",
                        text: `ขอบคุณที่ใช้บริการ อีเมล'${result.data.email}'ได้เข้าสู่ระบบแล้ว`
                      });
                })
                .catch((err)=>{
                    Swal.fire({
                      icon: "error",
                      title: "ส่งอีเมลไม่สำเร็จ",
                      text: err.response.data.error
                    });
                })
                .finally(()=>loadingSubmitSet(false))
            }else{
                loadingSubmitSet(false)
            }})
    
       
    }

    return(
    <div>
    <div className="text-bg-dark mt-5 pt-5 pb-5" style={{minHeight:'40vh',height:'100%'}}>
        <div className="row ps-5 pt-5 pb-5">
            <div className="col-lg-6 col-md-6 col-sm-12 ">
                <h4 className="pb-3">Sending your email below here for new notifiations or news</h4>
            <form onSubmit={handleSendingEmail}>
                <input className="w-75 ps-1 pt-1 pb-1" type="email" onChange={(event)=>setEmail(event.target.value)} value={email} placeholder="กรุณาป้อนอีเมลเพื่อรับข่าวสารใหม่ๆ" 
                style={{fontSize:'0.88rem',borderTopLeftRadius:'8px',borderBottomLeftRadius:'8px',border:'1px solid white'}}
                />
                <input id='footersubmit' className="text-bg-danger border border-danger" type="submit" value="Submit"
                style={{borderTopRightRadius:'8px',borderBottomRightRadius:'8px',padding:'0.19rem'}}
                />
            </form>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 pt-5">
            <div className="nav-item pb-3"><Link className="nav-link" data-bs-toggle="modal" data-bs-target="#product">The Product</Link></div>
                <div className="nav-item pb-3"><Link className="nav-link" data-bs-toggle="modal" data-bs-target="#company">Company</Link></div>
                <div className="nav-item pb-3"><Link className="nav-link" data-bs-toggle="modal" data-bs-target="#contactUs">Contact us</Link></div>
            </div>
            {loadingSubmit &&
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
    </div>

    {/* สินค้า */}
    <div>
    <div className="modal fade" id="product">
    <div className="modal-dialog">
    <div className="modal-content">
            <div className="modal-header text-bg-danger">
                <h3>ผลิตภัณฑ์</h3>
                <button className="btn btn-close bg-white" style={{border:'2px solid black'}} data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body" style={{display:'flex',flexDirection:'column'}}>
            
               <p>&nbsp;&nbsp;&nbsp;&nbsp;ผลิตภัณฑ์นี้เป็นเว็บไซด์แอพพลิเคชั่นที่เกี่ยวกับการสร้างบทความ 
                โดยจัดทำขึ้นเพื่อเป็นโปรเจคเพื่อการเรียนรู้เกี่ยวกับการทำงานของหน้าบ้านและหลังบ้าน</p>
                <img src={clientServerModel} style={{height:'30vh',width:'40vh',alignSelf:'center'}}/>
                <br/>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;โดยการเข้ามาดูบทความพร้อมทั้งการค้นหาบทความ 
                ทุกคนสามารถเข้ามาใช้งานได้โดยที่ไม่ต้องทำการเข้าสู่ระบบ แต่ทว่าในการที่จะสร้างบทความจะต้องทำการเข้าสู่ระบบก่อนที่จะสร้างบทความพร้อมทั้งสามารถใช้งานฟังชั่นอื่นๆได้ เช่น การแสดงความคิดเห็น และการจัดการบทความของบัญชีนั้นๆ เป็นต้น</p>
                <img src={blogs} style={{height:'30vh',width:'40vh',alignSelf:'center'}}/>
                <br/>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;ทั้งนี้ทั้งนั้น ผลิตภัณฑ์ถูกสร้างมาเพื่อการเรียนรู้เท่านั้น ซึ่งทำให้อาจจะมีปัญหาระหว่างการใช้งานเกิดขึ้นได้</p>
                <br/>
            </div>
            <div className="modal-footer">
                <p className="text-muted">เขียนโดย: นาย ศรณชา บูรณพงศ์วัฒนะ</p>
            </div>
    </div>
    </div>
    </div>
    </div>

         {/* บริษัท */}
     <div>
    <div className="modal fade" id="company">
    <div className="modal-dialog">
    <div className="modal-content">
            <div className="modal-header text-bg-danger">
                <h3>บริษัท</h3>
                <button className="btn btn-close bg-white" style={{border:'2px solid black'}} data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body text-center" >
                <p>จัดทำขึ้นมาเอง</p>
                <p>ในนามของ นายศรณชา บูรณพงศ์วัฒนะ</p>
            </div>
            <div className="modal-footer">
                <p className="text-muted">เขียนโดย: นาย ศรณชา บูรณพงศ์วัฒนะ</p>
            </div>
    </div>
    </div>
    </div>
    </div>

    
    
    {/* ติดต่อเรา */}
    <div>
    <div className="modal fade" id="contactUs">
    <div className="modal-dialog">
    <div className="modal-content">
            <div className="modal-header text-bg-danger">
                <h3>ข้อมูลการติดต่อ</h3>
                <button className="btn btn-close bg-white" style={{border:'2px solid black'}} data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body" style={{height:'50vh'}}>
                <form>
                    <label htmlFor="name" className="form-label">ชื่อ:</label>
                    <p>นาย ศรณชา บูรณพงศ์วัฒนะ</p>
                    <label htmlFor="sname" className="form-label">เบอร์โทรศัพท์:</label>
                    <p>086-773-5460</p>
                    <label htmlFor="email" className="form-label">อีเมล:</label>
                    <p>sornnacha.bu@gmail.com</p>
                </form>
            </div>
            <div className="modal-footer">
                <p className="text-muted">เขียนโดย: นาย ศรณชา บูรณพงศ์วัฒนะ</p>
            </div>
           
    </div>
    </div>
    </div>
    </div>

    </div>
    )
}

export default FooterComponent