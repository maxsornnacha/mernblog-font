import {useState} from 'react'
import NavbarFormComponent from "../navbar/navbarSignInUp"
import axios from 'axios'
import Swal from 'sweetalert2'
import {Link, useNavigate} from 'react-router-dom'
import userAccount from '../images/defaultProfile.png'
import Resizer from "react-image-file-resizer"
import '../../components/css/loadingApi.css'
import '../../components/css/SignInOut.css'
import '../../components/css/inputFocus.css'

const RegisterComponent = () =>{
    const [loading,setLoading] = useState(false)
    const [state,setState] = useState({
        firstname:"",
        lastname:"",
        username:"",
        password:"",
        passwordConfirm:"",
        email:""
    })
    
    const {firstname,lastname,username,password,passwordConfirm,email} = state

    const [image,imageSet] = useState(null)


    const redirect = useNavigate()

    const Firstname=(event)=>{
        setState((prev)=>{
         return ({
             firstname:event.target.value,
             lastname:prev.lastname,
             username:prev.username,
             password:prev.password,
             passwordConfirm:prev.passwordConfirm,
             email:prev.email
         })
        })
     }

     const Lastname=(event)=>{
        setState((prev)=>{
         return ({
             firstname:prev.firstname,
             lastname:event.target.value,
             username:prev.username,
             password:prev.password,
             passwordConfirm:prev.passwordConfirm,
             email:prev.email
         })
        })
     }

    const Username=(event)=>{
        setState((prev)=>{
         return ({
             firstname:prev.firstname,
             lastname:prev.lastname,
             username:event.target.value,
             password:prev.password,
             passwordConfirm:prev.passwordConfirm,
             email:prev.email
         })
        })
     }

     const Password=(event)=>{
        setState((prev)=>{
         return ({
             firstname:prev.firstname,
             lastname:prev.lastname,
             username:prev.username,
             password:event.target.value,
             passwordConfirm:prev.passwordConfirm,
             email:prev.email
         })
        })
     }

     const PasswordConfirm=(event)=>{
        setState((prev)=>{
         return ({
             firstname:prev.firstname,
             lastname:prev.lastname,
             username:prev.username,
             password:prev.password,
             passwordConfirm:event.target.value,
             email:prev.email
         })
        })
     }

     const Email=(event)=>{
        setState((prev)=>{
         return ({
             firstname:prev.firstname,
             lastname:prev.lastname,
             username:prev.username,
             password:prev.password,
             passwordConfirm:prev.passwordConfirm,
             email:event.target.value
         })
        })
     }

     const handleFileUpload=(event)=>{
        const file = event.target.files[0]
        Resizer.imageFileResizer(
            file, // Is the file of the image which will resized.
            720, // Is the maxWidth of the resized new image.
            720, // Is the maxHeight of the resized new image.
            "JPEG", // Is the compressFormat of the resized new image.
            100, // Is the quality of the resized new image.
            0, // Is the degree of clockwise rotation to apply to uploaded image.
            (url)=>{
                imageSet(url)
            }, // Is the callBack function of the resized new image URI.
            "base64", // Is the output type of the resized new image.
    
          );

     }
     
     const submitForm=(event)=>{
        event.preventDefault()
    
    Swal.fire({
            title:`คุณต้องการที่จะสมัครสมาชิคหรือไม่`,
            icon:'warning',
            showCancelButton:true
        }).then((result)=>{
            setLoading(true)

         if(result.isConfirmed){
            axios.post(`${process.env.REACT_APP_API}/registration`,{firstname,lastname,username,password,passwordConfirm,email,image})
            .then((result)=>{
                Swal.fire({
                        icon: "success",
                     title: "สมัครสมาชิคสำเร็จ"
              });
              redirect('/login')
             })
             .catch((err)=>{
                 Swal.fire({
                     icon: "error",
                     title: "เกิดข้อผิดพลาด",
                        text: err.response.data.error,
              });
             }) 
            .finally(()=>setLoading(false))
         }else{
        setLoading(false)
        }
    })

    }

    return(
        <div className='bg-white signup cover' >
        <NavbarFormComponent/>
        <div className='row m-0' style={{height:'89vh'}}>
        <div className='col-lg-6 col-md-12 text-bg-danger signup-firstpart box' style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <div>
            <div className='ms-5 text-center' style={{fontSize:'3rem'}}>Welcome Back!</div>
            <p className='text-center m-3 ms-5 me-5' style={{fontSize:'1.1rem'}}>To keep connected with us, please sign in with your personal information
            </p>
            </div>
            <Link to="/login" className="btn btn-outline-light mt-2 ps-5 pe-5">เข้าสู่ระบบ</Link>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 signup-secondpart">
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
             <h3 className="my-4" style={{textAlign:'center'}}>สร้างบัญชีผู้ใช้งาน</h3>
        <form onSubmit={submitForm} style={{width:'90%'}}>
        <div style={{display:'flex',justifyContent:'center'}}>
        <div className='form-group  text-center'>
        <label htmlFor='fileUpload'>
           <img src={image || userAccount} style={{height:'100px',width:'100px',cursor:'pointer',borderRadius:'50%',boxShadow: '3px 3px 5px grey'}}/>
           <p className='pt-3'>อัพโหลดรูปภาพบัญชี</p>
        </label>
            <input 
            className='form-control-file'
            style={{display:'none'}}
             type='file' 
             label='image' 
             name='account image' 
             id='fileUpload' 
             accept='.jpeg,.png,.jpg'
             onChange={handleFileUpload}
             />
        </div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',}}>
            <div className="form-group m-2" style={{width:'45%'}}>
                <input placeholder='ชื่อจริง' type="text" className="form-control" value={firstname} onChange={Firstname} style={{textTransform: 'capitalize'}}/>
            </div>
            <div className="form-group m-2" style={{width:'50%'}}>
                <input placeholder='นามสกุล' type="text" className="form-control" value={lastname} onChange={Lastname} style={{textTransform: 'capitalize'}}/>
            </div>
        </div> 
            <div className="form-group m-2 mb-3">
                <input placeholder='ชื่อผู้ใช้งาน' type="text" className="form-control" value={username} onChange={Username}/>
            </div>
            <div className="form-group m-2 mb-3">
                <input placeholder='รหัสผ่าน' type="text" className="form-control" value={password} onChange={Password}/>
                <div style={{fontSize:'0.7rem'}}>&nbsp;จำเป็น* รหัสผ่านต้องมีอย่างน้อย 8 ตัว ประกอบด้วยตัวอักษรภาษาอังกฤษและตัวเลข</div>
            </div>
            <div className="form-group m-2 mb-3">
                <input placeholder='ยืนยันรหัสผ่าน'  type="text" className="form-control" value={passwordConfirm} onChange={PasswordConfirm}/>
            </div>
            <div className="form-group m-2 mb-3">
                <input placeholder='อีเมล' type="email" className="form-control" value={email} onChange={Email}/>
            </div>
            <div className='m-2' style={{display:'flex',flexDirection:'column'}}>
                <input type="submit" value="ลงทะเบียน" className="btn btn-danger mt-3"/>
                <Link to="/" className="btn btn-dark mt-3 ms-1">ยกเลิก</Link>
            </div>
        </form>
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
        </div>
        </div>
    )
}

export default RegisterComponent