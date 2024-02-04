import axios from "axios"
import {useState,useEffect} from 'react'
import memberFetching from '../../services/memberFetching'
import tokenMemberFetching from '../../services/tokenMemberFetching'
import Navbar from '../navbar/navbarSignInUp'
import '../css/ChangePassword.css'
import background from '../images/mapleLeaves2.png'
import {Link,useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import '../css/inputFocus.css'

const ChangePassword=()=>{
    const redirect = useNavigate()
    const [accountInfo,setAccountInfo] = useState('')
    const [loading,loadingSet] = useState(true)
    const [loadingSubmit,loadingSubmitSet] = useState(false)
    const [accountInput,setAccountInput] = useState({
        prevPasswordInput:'',
        newPasswordInput:'',
        newPasswordConfirmedInput:''
    })
    const {prevPasswordInput,newPasswordInput,newPasswordConfirmedInput} = accountInput
    const prevPasswordHashed = accountInfo.password

    //เรียกดูข้อมูลโปรไฟล์
    const fetchData=()=>{
        axios.get(`${process.env.REACT_APP_API}/account/${memberFetching()}`,{
            headers:{
                 Authorization: `Bearer ${tokenMemberFetching()}`
            }
         })
        .then((response)=>{
            setAccountInfo(response.data)
        })
        .catch((err)=>{
            console.log('error',err)
        })
        .finally(()=>{loadingSet(false)})
    }
    
     
    useEffect(()=>{
        fetchData()
       
    },[])

    const PrevPaswordInput=(event)=>{
        setAccountInput((prev)=>{
            return({
                prevPasswordInput:event.target.value,
                newPasswordInput:prev.newPasswordInput,
                newPasswordConfirmedInput:prev.newPasswordConfirmedInput
            })
        })
    }

    const NewPasswordInput=(event)=>{
        setAccountInput((prev)=>{
            return({
                prevPasswordInput:prev.prevPasswordInput,
                newPasswordInput:event.target.value,
                newPasswordConfirmedInput:prev.newPasswordConfirmedInput
            })
        })
    }

    const NewPasswordConfirmedInput=(event)=>{
        setAccountInput((prev)=>{
            return({
                prevPasswordInput:prev.prevPasswordInput,
                newPasswordInput:prev.newPasswordInput,
                newPasswordConfirmedInput:event.target.value
            })
        })
    }

    const handleChangingPassword=(event)=>{
        event.preventDefault()
    
        Swal.fire({
            title:`คุณต้องการที่จะเปลี่ยนรหัสผ่านหรือไม่`,
            icon:'warning',
            showCancelButton:true
        }).then((result)=>{
            loadingSubmitSet(true)
            if(result.isConfirmed){
                axios.put(`${process.env.REACT_APP_API}/account/changepassword`,{
                   prevPasswordHashed,prevPasswordInput,newPasswordInput,newPasswordConfirmedInput,id:accountInfo._id
                },{
                    headers:{
                         Authorization: `Bearer ${tokenMemberFetching()}`
                    }
                 })
                .then((result)=>{
                    Swal.fire({
                        icon: "success",
                        title: "เปลี่ยนรหัสผ่านสำเร็จ"
                      }).then((status)=>{
                        if(status.isConfirmed){
                            sessionStorage.clear();
                            redirect('/login')
                        }
                      })
                    
                })
                .catch((err)=>{
                    Swal.fire({
                      icon: "error",
                      title: "เกิดข้อผิดพลาด",
                      text: err.response.data.error
                    });
                })
                .finally(()=>loadingSubmitSet(false))
            }else{
                loadingSubmitSet(false)
            }})

    }


    return(
    <div className="bg-white">
        <Navbar/>
    <div className="bg-dark">
    <div className="cover" style={{
        display:'flex',justifyContent:'center',
        backgroundImage:`url(${background})`,
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        height:'100vh'
        }}>
    {//load ข้อมูลอยู่
    loading?(
        <div>
        <div className="bg-white" style={{display:'flex',flexDirection:'column',minHeight:'100vh',width:'30rem',justifyContent:'center',alignItems:'center'}}>
        <div className="spinner-border p-5" role="status">
        <span className="visually-hidden" style={{}}>loading...</span>
        </div>
        <div className="mt-3">loading...</div>
        </div>
        </div>
      ):(
        <form className="pt-5 bg-white" style={{paddingLeft:'2rem',paddingRight:'2rem',paddingBottom:'10rem',width:'30rem',height:'100vh'}}>
            <div className="mb-5">
                <h3 className="text-center"><strong>เปลี่ยนรหัสผ่าน</strong></h3>
            </div>
            <div>
            <label>รหัสผ่านเดิม</label><br/>
            <input type="text" className="form-control" onChange={PrevPaswordInput} value={prevPasswordInput}/>
            </div>
            <div>
            <label>รหัสผ่านใหม่</label><br/>
            <input type="text" className="form-control" onChange={NewPasswordInput} value={newPasswordInput}/>
            <div className="text-danger" style={{fontSize:'0.7rem'}}>&nbsp;จำเป็น* รหัสผ่านต้องมีอย่างน้อย 8 ตัว ประกอบด้วยตัวอักษรภาษาอังกฤษและตัวเลข</div>
            </div>
            <div>
            <label>ยืนยันรหัสผ่านใหม่</label><br/>
            <input type="text" className="form-control" onChange={NewPasswordConfirmedInput} value={newPasswordConfirmedInput}/>
            </div>
            <div className="mt-4 text-center">
            <button className="btn btn-danger w-100" onClick={handleChangingPassword}>เปลี่ยนรหัสผ่าน</button>
            </div>
            <div className="mt-4 text-center">
            <Link to='/account' className="btn btn-dark w-100">ยกเลิก</Link>
            </div>
        </form>
      )}
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
    </div>
    )
}

export default ChangePassword