import NavbarFormComponent from "../navbar/navbarFormComponent"
import axios from 'axios'
import Swal from 'sweetalert2'
import tokenFetching from '../../services/tokenFectching'
import Resizer from "react-image-file-resizer"
import {Link,useNavigate} from 'react-router-dom'
import { useState } from "react";
import '../../components/css/loadingApi.css'
import '../../components/css/inputFocus.css'

const CreateAds=()=>{
    const [loading,setLoading] = useState(false)
    const redirect = useNavigate()
    const [detail,setDetail] = useState({
        topic:'',
        description:''
    })
    const {topic,description} = detail
    const [adsImg,setAdsImg] = useState(null)

    const Topic=(event)=>{
        setDetail((prev)=>{
            return ({
                topic:event.target.value,
                description:prev.description
            })
        })
    }
    
    const Description=(event)=>{
        setDetail((prev)=>{
            return ({
                topic:prev.topic,
                description:event.target.value
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
                setAdsImg(url)
            }, // Is the callBack function of the resized new image URI.
            "base64", // Is the output type of the resized new image.
    
          );

     }

    const Submit=(event)=>{
        event.preventDefault()
        setLoading(true)

        axios.post(`${process.env.REACT_APP_API}/createAds`,{topic,description,adsImg},{
            headers:{
                 Authorization: `Bearer ${tokenFetching()}`
            }
         })
        .then((result)=>{
            Swal.fire({
                icon: "success",
                title: "เพิ่มโฆษณาสำเร็จ"
              });
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

    }

    return(
    <div style={{height:'100vh'}}>
        <NavbarFormComponent/>
        <div className="container p-5 pt-3">
         <h2 className="mt-3 mb-3" style={{textAlign:'center'}}><strong>เพิ่มโฆษณา</strong></h2>
    <form onSubmit={Submit}>
    <div className='form-group'>
        <div className="text-center" >
           <img src={adsImg} style={adsImg && {height:'300px',maxWidth:'400px',width:'100%'}}/>
        </div>
        <br/>
        <p>แทรกรูปภาพโฆษณา<span className="text-success">(จำเป็น)</span></p>
            <input 
            className='form-control text-bg-dark'
             type='file' 
             label='image' 
             name='advertisement image' 
             id='fileUpload' 
             onChange={handleFileUpload}
             />
        </div>
        <div className="form-group mt-3">
            <label>หัวข้อ</label>
            <input type="text" className="form-control" onChange={(value)=>Topic(value)} value={topic} />
        </div>
        <div className="form-group mt-3">
            <label>รายละเอียด</label>
            <textarea className="form-control" onChange={(value)=>Description(value)} value={description} />
        </div>
        <input type="submit" value="บันทึกโฆษณา" className="btn btn-dark mt-3"/>
        <Link to="/" className="btn btn-danger mt-3 ms-1">ยกเลิก</Link>
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

export default CreateAds