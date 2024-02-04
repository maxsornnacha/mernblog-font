import {useState,useEffect} from "react"
import NavbarFormComponent from "./navbar/navbarFormComponent"
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate,Link } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import tokenFetching from '../services/tokenFectching'
import userFetching from '../services/userFetching'
import memberFetching from '../services/memberFetching'
import Resizer from "react-image-file-resizer"
import tokenMemberFetching from '../services/tokenMemberFetching'
import '../components/css/loadingApi.css'
import '../components/css/inputFocus.css'

const FormComponent =()=>{
const [loading,setLoading] = useState(false)
const [state,setState] = useState({
    title:"",
    content:"",
    author:(userFetching()?userFetching():memberFetching())
})

let {title,content,author} = state

const [types,typesSet] = useState([])
const [imgfile,imgfileSet] = useState(null)

const typesIn=(event)=>{
    // check ว่าใน state มีประเภทนี้แล้วรึยัง
    const isChecked = types.includes(event.target.value)
    console.log(isChecked)
    if(!isChecked){
        typesSet((prev)=>{
            return [...prev,event.target.value]
        })
    }else{
        typesSet(types.filter((items)=>{
            return items !== event.target.value
        }))
    }
}

//เรียกดูข้อมูลบัญชีที่ได้ Login
const [accountInfo,setAccountInfo] = useState('')

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
}


useEffect(()=>{
  fetchData()
 
},[])


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
            imgfileSet(url)
        }, // Is the callBack function of the resized new image URI.
        "base64", // Is the output type of the resized new image.

      );
}

const Title=(event)=>{
   setState((prev)=>{
    return ({
        title:event.target.value,
        content:prev.content,
        author:prev.author
    })
   })
}

const Content=(event)=>{
    setState((prev)=>{
     return ({
         title:prev.title,
         content:event,
         author:prev.author
     })
    })
 }

 const Author=(event)=>{
    setState((prev)=>{
     return ({
         title:prev.title,
         content:prev.content,
         author:event.target.value
     })
    })
 }

 const redirect = useNavigate()

 const submitForm=  (event)=>{
    event.preventDefault()
    

    if(author === ''){
       author = 'ไม่ระบุตัวตน'
    }

    Swal.fire({
        title:`คุณต้องการที่จะสร้างบทความหรือไม่`,
        icon:'warning',
        showCancelButton:true
    }).then(async (result)=>{
        setLoading(true)
        if(result.isConfirmed){
             await axios.post(`${process.env.REACT_APP_API}/${userFetching()?'create':'createForMember'}`,{title,content,author,types,imgfile,
        accoutimage:memberFetching()?accountInfo.userImage:
        //กรณี login ด้วย Admin ซึ่งไม่มี Image
        "https://res.cloudinary.com/dakcwd8ki/image/upload/v1705994843/xxrt19gktwya9pcg87x0.png",
        username:memberFetching()?memberFetching():userFetching()
            },{
                headers:{
                        Authorization: `Bearer ${tokenFetching()?tokenFetching():tokenMemberFetching()}`
                         }
            })
            .then((res)=>{
                Swal.fire({
                    title: "สำเร็จ",
                    text: "'บันทึกข้อมูลเรียบร้อย'",
                    icon: "success"
             });
                setState({
                 title:"",
                content:"",
                 author:""
             })
                 redirect('/')

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

    return(<div>
      <NavbarFormComponent/>
    <div className="container p-5 pt-3">
         <h2 className="mt-3 mb-3" style={{textAlign:'center'}}><strong>เขียนบทความ</strong></h2>
    <form onSubmit={submitForm} >
        <div className="text-center mb-3" >
           <img src={imgfile} style={imgfile && {height:'300px',maxWidth:'400px',width:'100%',borderRadius:'5px'}}/>
        </div>
        <div className="form-group">
            <label>ชื่อบทความ</label>
            <input type="text" className="form-control" value={title} onChange={Title}/>
        </div>
        <div className="form-group">
            <label>แทรกรูปภาพ</label>
            <input type="file" className="form-control text-bg-dark"  onChange={imageHanddleChange}/>
        </div>
        <div className="form-group mt-3 mb-5">
            <label>รายละเอียด</label>
            <ReactQuill theme="snow" onChange={Content} value={content} style={{backgroundColor:'white',color:'black',paddingBottom:'5vh',height:"50vh"}}/>
        </div>
        <div className="form-group mt-3 mb-4 row">
            <label>ประเภทบทความ <span style={{color:'rgb(41, 171, 135)'}}>(เลือกได้มากกว่า 1 ประเภท)</span></label>
        <div className="col-lg-3 col-md-4 col-sm-4">
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="ทั่วไป" id="myCheckbox" onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">ทั่วไป</label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="ท่องเที่ยว" id="myCheckbox" onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">การท่องเที่ยว</label>
            </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-4">
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="ให้ความรู้" id="myCheckbox" onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">การให้ความรู้</label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="ความบรรเทิง" id="myCheckbox" onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">ความบรรเทิง</label>
            </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-4">
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="สยองขวัญ" id="myCheckbox" onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">เรื่องสยองขวัญ</label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="ลี้ลับ" id="myCheckbox" onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">เรื่องลี้ลับ</label>
            </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-4">
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="แสดงความเห็น" id="myCheckbox" onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">แสดงความคิดเห็น</label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="สัมภาษณ์" id="myCheckbox" onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">สัมภาษณ์</label>
            </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-4">
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="บรรยาย" id="myCheckbox" onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">การอธิบาย/การบรรยาย</label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="วิเคราะห์" id="myCheckbox" onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">เชิงวิเคราะห์</label>
            </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-4">
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="คติสอนใจ" id="myCheckbox" onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">คติสอนใจ/โน้มน้าวใจ</label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="วิจารณ์" id="myCheckbox" onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">การวิจารณ์</label>
            </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-4">
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="กึ่งชีวประวัติ" id="myCheckbox" onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">กึ่งชีวประวัติ</label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="การเมือง" id="myCheckbox" onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">การเมือง</label>
            </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-4">
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="สารคดี" id="myCheckbox" onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">สารคดี</label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="ข่าวสาร" id="myCheckbox" onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">ข่าวสาร</label>
            </div>
        </div>
        <div className="form-group mt-3">
            <label>ชื่อผู้แต่ง</label>
            <input type="text" className="form-control" value={author} onChange={Author}/>
        </div>
        </div>
        <input type="submit" value="บันทึกบทความ" className="btn btn-danger mt-3"/>
        <Link to="/" className="btn btn-dark mt-3 ms-1">ยกเลิก</Link>
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
    )
}

export default FormComponent