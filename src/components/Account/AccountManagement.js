import axios from "axios"
import {useState,useEffect} from 'react'
import memberFetching from '../../services/memberFetching'
import tokenMemberFetching from '../../services/tokenMemberFetching'
import Navbar from '../navbar/navbarSignInUp'
import '../css/AccountProfile.css'
import background from '../images/mapleLeaves2.png'
import Resizer from "react-image-file-resizer"
import Swal from 'sweetalert2'
import '../../components/css/loadingApi.css'
import {Link} from 'react-router-dom'

const AccountManagement=()=>{
    const [loading,loadingSet] = useState(true)
    const [loadingSubmit,loadingSubmitSet] = useState(false)
    const [accountInfo,setAccountInfo] = useState('')
    const [accountInfoForEdit,setAccountInfoForEdit] = useState('')
    const [profile1,setProfile1] = useState(true)
    const [profile2,setProfile2] = useState(false)
  

    //เป็นหน้าระหว่าง โชว์โปรไฟล์ กับ แก้ไขข้อมูลโปรไฟล์
    const ReturnToProfile2=(event)=>{
        event.preventDefault();
        setProfile1(false)
        setProfile2(true)
    }

    const ReturnToProfile1=(event)=>{
        event.preventDefault();
        setProfile1(true)
        setProfile2(false)
    }

    //เรียกดูข้อมูลโปรไฟล์
    const fetchData=()=>{
        axios.get(`${process.env.REACT_APP_API}/account/${memberFetching()}`,{
            headers:{
                 Authorization: `Bearer ${tokenMemberFetching()}`
            }
         })
        .then((response)=>{
            setAccountInfo(response.data)
            setAccountInfoForEdit(response.data)
        })
        .catch((err)=>{
            console.log('error',err)
        })
        .finally(()=>{loadingSet(false)})
    }
    
     
    useEffect(()=>{
        fetchData()
       
    },[])

    //แก้ไขโปรไฟล์
    const Firstname=(event)=>{
        setAccountInfoForEdit((prev)=>{
            return({
              _id:prev._id,
              username:prev.username,
              password:prev.password,
              firstname:event.target.value,
              lastname:prev.lastname,
              email:prev.email,
              userImage:prev.userImage,
              createdAt:prev.createdAt,
              updatedAt:prev.updatedAt
            })
        })
    }

    const Lastname=(event)=>{
        setAccountInfoForEdit((prev)=>{
            return({
              _id:prev._id,
              username:prev.username,
              password:prev.password,
              firstname:prev.firstname,
              lastname:event.target.value,
              email:prev.email,
              userImage:prev.userImage,
              createdAt:prev.createdAt,
              updatedAt:prev.updatedAt
            })
        })
    }

    const Email=(event)=>{
        setAccountInfoForEdit((prev)=>{
            return({
              _id:prev._id,
              username:prev.username,
              password:prev.password,
              firstname:prev.firstname,
              lastname:prev.lastname,
              email:event.target.value,
              userImage:prev.userImage,
              createdAt:prev.createdAt,
              updatedAt:prev.updatedAt
            })
        })
    }

    //เก็บไฟล์รูปภาพ 
const imageHanddleChange=(event)=>{
    const file = event.target.files[0]
    Resizer.imageFileResizer(
        file, // Is the file of the image which will resized.
        720, // Is the maxWidth of the resized new image.
        720, // Is the maxHeight of the resized new image.
        "JPEG", // Is the compressFormat of the resized new image.
        100, // Is the quality of the resized new image.
        0, // Is the degree of clockwise rotation to apply to uploaded image.
        (url)=>{
            setAccountInfoForEdit((prev)=>{
                return({
                  _id:prev._id,
                  username:prev.username,
                  password:prev.password,
                  firstname:prev.firstname,
                  lastname:prev.lastname,
                  email:prev.email,
                  userImage:url,
                  createdAt:prev.createdAt,
                  updatedAt:prev.updatedAt
                })
            })
        }, // Is the callBack function of the resized new image URI.
        "base64", // Is the output type of the resized new image.

      );
}


    const handleEditProfile= (event)=>{
        event.preventDefault();
        const {firstname,lastname,email,userImage} = accountInfoForEdit
        const id = accountInfoForEdit._id
        Swal.fire({
            title:`คุณต้องการที่จะอัพเดตข้อมูลส่วนตัวหรือไม่`,
            icon:'warning',
            showCancelButton:true
        }).then((result)=>{
            loadingSubmitSet(true)
            if(result.isConfirmed){
                axios.put(`${process.env.REACT_APP_API}/profileEdit`,{
                    firstname,lastname,email,userImage,id
                },{
                    headers:{
                         Authorization: `Bearer ${tokenMemberFetching()}`
                    }
                 })
                .then(async (result)=>{
                    
                    //Update Data
                   await axios.get(`${process.env.REACT_APP_API}/account/${memberFetching()}`,{
                        headers:{
                             Authorization: `Bearer ${tokenMemberFetching()}`
                        }
                     })
                    .then((response)=>{
                        setAccountInfo(response.data)
                        setAccountInfoForEdit(response.data)
                    })
                    .catch((err)=>{
                        console.log('error',err)
                    })

                    Swal.fire({
                        icon: "success",
                        title: "แก้ไขข้อมูลส่วนตัวสำเร็จ"
                      }).then((status)=>{
                        if(status.isConfirmed){
                            ReturnToProfile1(event)
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
     {//load ข้อมูลอยู่
    loading?
    (
        <div>
        <div style={{display:'flex',flexDirection:'column',minHeight:'100vh',justifyContent:'center',alignItems:'center'}}>
        <div className="spinner-border p-5" role="status">
        <span className="visually-hidden" style={{}}>loading...</span>
        </div>
        <div className="mt-3">loading...</div>
        </div>
        </div>
    )
    :
    (
        <div className="bg-white row m-0" style={{minHeight:'100vh'}}>
        {profile1 &&
        <form className="col-lg-6 col-md-6 col-sm-12 mb-5" style={{display:'flex',flexDirection:'column',minHeight:'100vh'}} >
            <h3 className="mb-5 mt-5 text-center"><strong>ข้อมูลส่วนตัว</strong></h3>
            <div className="text-center mb-5"><img src={accountInfo.userImage} style={{height:'150px',width:'150px',borderRadius:'50%',boxShadow:'3px 3px 5px grey'}}/></div>
            <span className="row m-0 ms-3 me-5">
                <div className="col-lg-6 bg-white pt-2 pb-1  mb-3" style={{borderBottom:'1px solid rgb(114, 115, 116)',textTransform:'capitalize'}}><h5><strong>ชื่อจริง:</strong> {accountInfo.firstname}</h5></div>
                <div  className="col-lg-6 bg-white pt-2 pb-1 mb-3" style={{borderBottom:'1px solid rgb(114, 115, 116)',textTransform:'capitalize'}}><h5><strong>นามสกุล:</strong> {accountInfo.lastname}</h5></div>
            </span>
            <span className="row m-0 mb-3 ms-3 me-3">
                <div  className="col-lg-11  bg-white pt-2 pb-2" style={{borderBottom:'1px solid rgb(114, 115, 116)'}}>
                <h5><strong>ชื่อผู้ใช้งาน:</strong> {accountInfo.username}</h5>
                </div>
            </span>
            <span className="row m-0 mb-3 ms-3 me-3">
                 <div className="col-lg-11 bg-white pt-2 pb-2" style={{borderBottom:'1px solid rgb(114, 115, 116)'}}>
                <h5><strong>อีเมล:</strong> {accountInfo.email}</h5>
                </div>
            </span>
            <span className="row m-0 ms-3 me-5 mt-4">
                <button className="btn btn-danger" onClick={ReturnToProfile2}>แก้ไขข้อมูลส่วนตัว</button>
            </span>
            <span className="row m-0 ms-3 me-5 mt-4">
                <Link to='/change/password' className="btn btn-outline-dark">เปลี่ยนรหัสผ่าน</Link>
            </span>
        </form>
        }
        {profile2 &&
      <form className="col-lg-6 col-md-6 col-sm-12 mb-5" onSubmit={handleEditProfile} style={{ display: 'flex', flexDirection: 'column',minHeight:'100vh' }}>
        <h3 className="mb-5 mt-5 text-center"><strong>แก้ไขข้อมูลส่วนตัว</strong></h3>
        <div className="text-center mb-2">
          <img src={accountInfoForEdit.userImage} style={{ height: '150px', width: '150px', borderRadius: '50%', boxShadow: '3px 3px 5px grey' }} />
          <div style={{display:'flex',justifyContent:'center'}}><input type="file" onChange={imageHanddleChange} className="form-control text-bg-dark mt-3 w-50" style={{borderRadius:'5px'}}/></div>
        </div>
        <label className="firstname" >ชื่อจริง</label>
        <label className="lastname" >นามสกุล</label>
        <span className="row ms-3 me-1 me-4">
          <input  type="text" value={accountInfoForEdit.firstname} onChange={Firstname} className="input col-lg-5 bg-white pt-2 pb-2 mb-4 me-4" style={{ textTransform: 'capitalize' }} />
          <input  type="text" value={accountInfoForEdit.lastname} onChange={Lastname} className="input col-lg-6 bg-white pt-2 pb-2 mb-4" style={{ textTransform: 'capitalize' }} />
        </span>
        <label className="email text-center">อีเมล</label>
        <span className="row mb-3 ms-1 me-3">
          <div className="col-lg-12">
            <input type='email' value={accountInfoForEdit.email} onChange={Email} className="input bg-white pt-2 pb-2 w-100" />
          </div>
        </span>
        <span className="row ms-4 me-5 mt-4">
          <button className="btn btn-danger"  type="submit">บันทึก</button>
        </span>
        <span className="row ms-4 me-5 mt-3">
          <button className="btn btn-dark" onClick={ReturnToProfile1}>ยกเลิก</button>
        </span>
      </form>
        }
        <div className="col-lg-6 col-md-6 col-sm-12 bg-dark" style={{backgroundImage:`url(${background})`,backgroundPosition:'center',backgroundRepeat:'no-repeat',backgroundSize:'cover'}} >
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
    )
    }
    </div>
    )
}

export default AccountManagement