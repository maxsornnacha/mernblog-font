import axios from 'axios'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import NavbarComponent from "../navbar/navbarFormComponent"
import DeleteAds from './DeleteAds';


const ManageCarousel=()=>{
    const [ads,adsSet] = useState([])
    const [loading,loadingSet] = useState(true)

    //เรียนข้อมูลโฆษณาทั้งหมด
    const fetchData=()=>{
        axios.get(`${process.env.REACT_APP_API}/ads`)
        .then((response)=>{
            adsSet(response.data)
        })
        .catch((err)=>{
            console.log('error',err)
        })
        .finally(()=>{loadingSet(false)})
    }

    const updataAds=(data)=>{
        adsSet(data)
    }

    useEffect(()=>{
        fetchData()   
    },[])


    return(
    <div className="text-bg-light" style={{minHeight:'100vh',height:'100%'}}>
    <NavbarComponent/>
        <div className="container">
        <div className="pt-5 pb-4" style={{textAlign:'center'}}>
        <h3><strong>การจัดการโฆษณา</strong></h3>
        </div>
    {loading?
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
    (<table className="table table-striped table-bordered"> 
            <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">รูปภาพ</th>
                <th scope="col">หัวข้อโฆษณา</th>
                <th scope="col">แก้ไขโฆษณา</th>
                <th scope="col">ลบโฆษณา</th>
            </tr> 
            </thead>
            <tbody>
                {ads.map((ads,index)=>{
                   return (
                    <tr key={uuidv4()}>
                   <th scope="row m-0">{index+1}</th>
                   <td className='text-center'><img src={ads.image} style={{height:'100px',width:'100px'}}/></td>
                   <td>{ads.topic ===''?'ไม่มีชื่อหัวข้อ':ads.topic}</td>
                   {/* เพิ่มอัพเดต กับ ลบ */}
                   <td style={{textAlign:'center'}}><Link to={`/edit/carousel/${ads._id}`} className="btn btn-danger" style={{width:'100%'}}>แก้ไข</Link></td>
                   <td style={{textAlign:'center'}}><DeleteAds topic={ads.topic} id={ads._id} updataAds={updataAds}/></td>
                   </tr>
                   )
                })}
            </tbody>
        </table>
    )
    }
    {ads.length === 0 &&
        <h5 className="mt-5" style={{textAlign:'center'}}>คุณยังไม่มีโฆษณา</h5>
    }
        </div>
    </div>
    )
}

export default ManageCarousel