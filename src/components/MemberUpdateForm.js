import {useParams} from 'react-router-dom'
import axios from 'axios'
import {useState,useEffect} from 'react'
import NavbarFormComponent from "./navbar/navbarFormComponent"
import Swal from 'sweetalert2'
import {useNavigate,Link} from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import tokenMemberFetching from '../services/tokenMemberFetching'
import Resizer from "react-image-file-resizer"
import '../components/css/loadingApi.css'
import '../components/css/inputFocus.css'

const UpdateComponent=()=>{
    const [loadingSubmit,loadingSubmitSet] = useState(false)
    const [blog,setBlog] = useState({
        title:'',
        content:'',
        author:'',
    })
const {title,content,author} = blog
    const {slug} = useParams()
    const redirect = useNavigate()

const [loading,loadingSet] = useState(true)

const [types,typesSet] = useState([])
const [imgfile,imgfileSet] = useState(null)


const fetchData=()=>{
    axios.get(`${process.env.REACT_APP_API}/blog/${slug}`)
    .then((response)=>{
        setBlog(response.data)
        typesSet(response.data.types)
        imgfileSet(response.data.image)
    })
    .catch((err)=>{
        console.log('error',err)
    })
    .finally(()=>{loadingSet(false)})
}

useEffect(()=>{
    fetchData()
},[])

const Title=(event)=>{
    setBlog((prev)=>{
        return {
            title:event.target.value,
            content:prev.content,
            author:prev.author
        }
    })
}

const Content=(event)=>{
    setBlog((prev)=>{
        return {
            title:prev.title,
            content:event,
            author:prev.author
        }
    })
}

const Author=(event)=>{
    setBlog((prev)=>{
        return {
            title:prev.title,
            content:prev.content,
            author:event.target.value
        }
    })
}


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

//ว่ามันถ้ามันตรงกับข้อมูลในฐานข้อมูลมันจะ ติ๊กถูก
const compareDB=(type)=>{
    if(types.includes(type)){
        return true
    }
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
            imgfileSet(url)
        }, // Is the callBack function of the resized new image URI.
        "base64", // Is the output type of the resized new image.

      );

    
}

//เริ่มการ อัพเดต ข้อมูล
const updataData=  (event)=>{
    event.preventDefault()
    Swal.fire({
        title:`คุณต้องการที่จะอัพเดตบทความหรือไม่`,
        icon:'warning',
        showCancelButton:true
    }).then((result)=>{
        loadingSubmitSet(true)
        if(result.isConfirmed){
            axios.put(`${process.env.REACT_APP_API}/blogMember/${slug}`,{
                title:title,
                content:content,
                author:author,
                types:types,
                imgfile:imgfile
            },{
                headers:{
                     Authorization: `Bearer ${tokenMemberFetching()}`
                }
             })
            .then((result)=>{
                Swal.fire({
                    icon: "success",
                    title: "อัพเดตบทความสำเร็จ"
                  });
                  redirect('/')
            })
            .catch((err)=>{
                Swal.fire({
                  icon: "error",
                  title: "อัพเดตบทความไม่สำเร็จ",
                  text:err.response.data.error
                });
            })
            .finally(()=>loadingSubmitSet(false))
        }else{
            loadingSubmitSet(false)
        }})

   
}

    return(<div className='bg-white'>
      <NavbarFormComponent/>
        <div className="container p-5 pt-3">
        {//load ข้อมูลอยู่
    loading?(
        <div>
        <div style={{display:'flex',flexDirection:'column',minHeight:'100vh',justifyContent:'center',alignItems:'center'}}>
        <div className="spinner-border p-5" role="status">
        <span className="visually-hidden" style={{}}>loading...</span>
        </div>
        <div className="mt-3">loading...</div>
        </div>
        </div>
      ):(
        //load สำเร็จ
        <div>
             <h2 className="mt-3 mb-3" style={{textAlign:'center'}}><strong>แก้ไขบทความ</strong></h2>
        <form onSubmit={updataData}>
            <div className="form-group">
                <label>ชื่อบทความ</label>
                <input type="text" className="form-control" value={title} onChange={Title}/>
            </div>
            <div className="form-group mt-3">
            <label>แทรกรูปภาพหน้าปก</label>
            <div className='text-center'><label htmlFor="file"><img style={{height:'300px',maxWidth:'400px',width:'100%',borderRadius:'20px'}} src={imgfile}></img></label></div>
            <input type="file" className="form-control mt-2 text-bg-dark" onChange={imageHanddleChange}/>
            </div>
            <div className="form-group mt-3">
                <label>รายละเอียด</label>
                <ReactQuill theme="snow" onChange={Content} value={content} style={{backgroundColor:'white',color:'black'}}/>
            </div>

            <div className="form-group mt-3 mb-3 row">
            <label>ประเภทบทความ <span style={{color:'rgb(41, 171, 135)'}}>(เลือกได้มากกว่า 1 ประเภท)</span></label>
            <div className="col-lg-3 col-md-4 col-sm-4">
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="ทั่วไป" id="myCheckbox" checked={compareDB('ทั่วไป')} onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">ทั่วไป</label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="ท่องเที่ยว" id="myCheckbox" checked={compareDB('ท่องเที่ยว')} onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">การท่องเที่ยว</label>
            </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-4">
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="ให้ความรู้" id="myCheckbox" checked={compareDB('ให้ความรู้')} onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">การให้ความรู้</label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="ความบรรเทิง" id="myCheckbox" checked={compareDB('ความบรรเทิง')} onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">ความบรรเทิง</label>
            </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-4">
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="สยองขวัญ" id="myCheckbox" checked={compareDB('สยองขวัญ')} onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">เรื่องสยองขวัญ</label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="ลี้ลับ" id="myCheckbox" checked={compareDB('ลี้ลับ')}  onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">เรื่องลี้ลับ</label>
            </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-4">
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="แสดงความเห็น" id="myCheckbox" checked={compareDB('แสดงความเห็น')} onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">แสดงความคิดเห็น</label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="สัมภาษณ์" id="myCheckbox"  checked={compareDB('สัมภาษณ์')} onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">สัมภาษณ์</label>
            </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-4">
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="บรรยาย" id="myCheckbox" checked={compareDB('บรรยาย')} onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">การอธิบาย/การบรรยาย</label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="วิเคราะห์" id="myCheckbox" checked={compareDB('วิเคราะห์')} onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">เชิงวิเคราะห์</label>
            </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-4">
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="คติสอนใจ" id="myCheckbox" checked={compareDB('คติสอนใจ')} onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">คติสอนใจ/โน้มน้าวใจ</label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="วิจารณ์" id="myCheckbox" checked={compareDB('วิจารณ์')} onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">การวิจารณ์</label>
            </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-4">
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="กึ่งชีวประวัติ" id="myCheckbox" checked={compareDB('กึ่งชีวประวัติ')} onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">กึ่งชีวประวัติ</label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="การเมือง" id="myCheckbox" checked={compareDB('การเมือง')} onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">การเมือง</label>
            </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-4">
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="สารคดี" id="myCheckbox" checked={compareDB('สารคดี')}  onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">สารคดี</label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="checkbox" value="ข่าวสาร" id="myCheckbox" checked={compareDB('ข่าวสาร')} onChange={typesIn}/>
            <label className="form-check-label" htmlFor="myCheckbox">ข่าวสาร</label>
            </div>
        </div>
        </div>
            <div className="form-group mt-3">
                <label>ชื่อผู้แต่ง</label>
                <input type="text" className="form-control" value={author} onChange={Author}/>
            </div>
            <input type="submit" value="บันทึกบทความ" className="btn btn-danger mt-3"/>
            <Link to="/member/manage" className="btn btn-dark mt-3 ms-1">ยกเลิก</Link>
        </form>
        </div>
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
        )
}

export default UpdateComponent