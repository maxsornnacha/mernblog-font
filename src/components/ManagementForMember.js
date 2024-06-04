import axios from "axios"
import { useEffect, useState } from "react"
import NavbarComponent from "./navbar/navbarFormComponent"
import memberFetching from "../services/memberFetching"
import userFetching from "../services/userFetching"
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import DeleteButtonMember from '../components/DeleteButtonMember'

const MemberManage=()=>{
    const [blogs,blogsSet] = useState([])
    const [loading,loadingSet] = useState(true)

  
    const fetchData=()=>{

        axios.get(`${process.env.REACT_APP_API}/blogs/${userFetching()?  
        userFetching():memberFetching()}`)
        .then((response)=>{
            blogsSet(response.data)
        })
        .catch((err)=>{
            console.log('error',err)
        })
        .finally(()=>{loadingSet(false)})
    }

    const updateState = (newState) => {
        blogsSet(newState)
      };

     //แปลงเป็น เวลาไทย
 const thaiDateTrans = (data)=>{
    const date = new Date(data)
    const thaiData = date.toLocaleDateString('th-TH',{
        year:'numeric',
        month:'long',
        day:'numeric',
        weekday:'long'
    })
  
    return thaiData
  
  }


    useEffect(()=>{
        fetchData()   
    },[])

    return(
    <div className="bg-white" style={{minHeight:'100vh',height:'100%'}}>
    <NavbarComponent/>
        <div className="container">
        <div className="pt-5 pb-4" style={{textAlign:'center'}}>
        <h3><strong>บทความของฉัน</strong></h3>
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
    (
    <table className="table table-striped table-bordered"> 
            <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">หัวข้อบทความ</th>
                <th scope="col">เวลาที่อัพโหลด</th>
                <th scope="col">แก้ไขบทความ</th>
                <th scope="col">ลบบทความ</th>
            </tr> 
            </thead>
            <tbody>
                {blogs.map((blog,index)=>{
                   return (
                    <tr key={uuidv4()}>
                   <th scope="row m-0">{index+1}</th>
                   <td>
                   <Link className="text-dark" to={'/blog/'+blog.slug} style={{textDecoration:"none"}} key={uuidv4()}>
                    {blog.title}
                    </Link>
                    </td>
                   <td>{thaiDateTrans(blog.createdAt)}</td>
                   {/* เพิ่มอัพเดต กับ ลบ */}
                   <td style={{textAlign:'center'}}><Link to={'/editMember/'+blog.slug} key={uuidv4()} className="btn btn-danger">แก้ไข</Link></td>
                   <td style={{textAlign:'center'}}><DeleteButtonMember key={uuidv4()} title={blog.title} id={blog._id} updateState={updateState}/></td>
                   </tr>
                   )
                })}
            </tbody>
        </table>
    )
    }
    {blogs.length === 0 &&
        <h5 className="mt-5" style={{textAlign:'center'}}>คุณยังไม่มีบทความ</h5>
    }
        </div>
    </div>
    )
}


export default MemberManage