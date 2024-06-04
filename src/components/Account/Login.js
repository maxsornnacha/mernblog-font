import {useState,useEffect} from "react"
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate,Link } from 'react-router-dom'
import Authentication from "../../services/autherize"
import AuthenMember from '../../services/autherizeMember'
import NavbarFormComponent from "../navbar/navbarSignInUp"
import '../../components/css/SignInOut.css'
import '../../components/css/loadingApi.css'
import '../../components/css/inputFocus.css'
const LoginComponent =()=>{
    const [loading,setLoading] = useState(false)
    const [state,setState] = useState({
        username:"",
        password:""
    })
    
    let {username,password} = state


    const Username=(event)=>{
        setState((prev)=>{
         return ({
             username:event.target.value,
             password:prev.password
         })
        })
     }

     const Password=(event)=>{
        setState((prev)=>{
            return ({
                username:prev.username,
                password:event.target.value
        })
       })
     }
     const redirect = useNavigate()
     const submitForm= async (event)=>{
        event.preventDefault()
        setLoading(true)
        axios.post(`${process.env.REACT_APP_API}/login`,{username,password})
        .then(async (response)=>{
              if(typeof(response.data.token) === 'undefined' && typeof(response.data.username) === 'undefined'){
                //Member login
                await AuthenMember(response)
                await redirect('/')
              }else{
                //Admin login 
                await Authentication(response)
                await redirect('/')
              }
              //หน้าต่าง login สำเร็จ
              Swal.fire({
                title: "สำเร็จ",
                text: "'เข้าสู่ระบบสำเร็จ'",
                icon: "success"
              }).then(()=>{
                //เมื่อกดตกลง หน้าเว็บจะ refresh เพื่ออัพเดตข้อมูล
                window.location.reload()
              })
        })
        .catch((err)=>{
            console.log(err)
            Swal.fire({
                icon: "error",
                title:"ผิดพลาด",
                text:err.response.data.error,
              });
        })
        .finally(()=>setLoading(false))
     }
     
     

    return(<div className="bg-white">
           <NavbarFormComponent/>
        <div className="row m-0">
        <div className="col-lg-6 col-md-12 col-sm-12 " style={{height:'89vh'}}>
        <div className="h-100" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <h3 className="mb-3" style={{textAlign:'center'}}>เข้าสู่ระบบ</h3>
                <form onSubmit={submitForm} className="row d-flex justify-content-center" style={{width:'80%'}}>
                <div className="form-group my-2 col-md-7 col-lg-10">
                    <input placeholder="ชื่อผู้ใช้" type="text" className="form-control" value={username} onChange={Username}/>
                </div>
                <div className="form-group my-2m-3 col-md-7 col-lg-10">
                   <input placeholder="รหัสผ่าน" type="password" className="form-control" value={password} onChange={Password}/>
                 </div>
                <div className="my-2 col-md-7 col-lg-10" style={{display:'flex',flexDirection:'column'}}>
                    <input type="submit" value="เข้าสู่ระบบ" className="btn btn-danger mt-3"/>
                    <Link to="/" className="btn btn-dark mt-3 ms-1">ยกเลิก</Link>
                </div>
                </form>
           </div>
        </div>
        </div>
        <div className='col-lg-6 col-md-12 text-bg-danger pb-5 pt-5 signin-secondpart' style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <div>
            <div className='mx- text-center' style={{fontSize:'3rem'}}>Hello, Friends!</div>
            <p className='text-center m-3 ms-5 me-5' style={{fontSize:'1.1rem'}}>Being a part of us by entering your personal details and start 
            journey with us</p>
            </div>
            <Link to="/registration" className="btn btn-outline-light mt-2 ps-5 pe-5">สร้างบัญชี</Link>
        </div>
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
        </div>
    )
}

export default LoginComponent