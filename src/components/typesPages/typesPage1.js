import { useEffect, useState } from 'react'
import '../css/blogsTypes.css'
import {Link} from 'react-router-dom'


const BlogsTypes = () =>{
    const [isHover1,setIsHover1] = useState(false)
    const [isHover2,setIsHover2] = useState(false)
    const [isHover3,setIsHover3] = useState(false)
    const [isHover4,setIsHover4] = useState(false)

   
    return(
    <div className="row m-0">
        <div className="col-lg-3 col-md-6 col-sm-6 mb-4" style={{minHeight:'50vh'}}>
        <Link to='/blogs/ทั่วไป' className='text-decoration-none' onMouseEnter={()=>setIsHover1(true)} onMouseLeave={()=>setIsHover1(false)}>
        <div style={{
                backgroundImage:'url(https://cdn.pixabay.com/photo/2015/05/11/14/44/pencils-762555_1280.jpg)',
                height:'100%',
                backgroundPosition:'center',
                backgroundSize:'cover',
                backgroundRepeat:'no-repeat',
                display:'flex',
                justifyContent:'center',
                alignItems:'end'
            }}>
            <div className={isHover1?"topicHover pt-4 pb-4":'topic pt-4 pb-4'} >
                <h5 className="text-white text-center">ทั่วไป</h5>
            </div>
        </div>
        </Link>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-6 mb-4" style={{minHeight:'50vh'}}>
        <Link to='/blogs/ท่องเที่ยว'  className='text-decoration-none' onMouseEnter={()=>setIsHover2(true)} onMouseLeave={()=>setIsHover2(false)}>
        <div className="type" style={{
                backgroundImage:'url(https://cdn.pixabay.com/photo/2021/06/10/16/15/travel-6326482_1280.jpg)',
                height:'100%',
                backgroundPosition:'center',
                backgroundSize:'cover',
                backgroundRepeat:'no-repeat',
                display:'flex',
                justifyContent:'center',
                alignItems:'end'
            }}>
              <div className={isHover2?"topicHover pt-4 pb-4":'topic pt-4 pb-4'}>
                <h5 className="text-white text-center" >การท่องเที่ยว</h5>
            </div>
        </div>
        </Link>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-6 mb-4" style={{minHeight:'50vh'}}>
        <Link to='/blogs/ให้ความรู้' className='text-decoration-none' onMouseEnter={()=>setIsHover3(true)} onMouseLeave={()=>setIsHover3(false)}>
        <div className="type" style={{
                backgroundImage:'url(https://cdn.pixabay.com/photo/2015/11/19/21/11/atlas-1052011_1280.jpg)',
                height:'100%',
                backgroundPosition:'center',
                backgroundSize:'cover',
                backgroundRepeat:'no-repeat',
                display:'flex',
                justifyContent:'center',
                alignItems:'end'
            }}>
              <div className={isHover3?"topicHover pt-4 pb-4":'topic pt-4 pb-4'}>
                <h5 className="text-white text-center" >ให้ความรู้</h5>
            </div>
        </div>
        </Link>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-6 mb-4" style={{minHeight:'50vh'}}>
        <Link to='/blogs/แสดงความเห็น' className='text-decoration-none' onMouseEnter={()=>setIsHover4(true)} onMouseLeave={()=>setIsHover4(false)}>
        <div className="type" style={{
                backgroundImage:'url(https://cdn.pixabay.com/photo/2014/09/27/19/53/blogging-464042_1280.jpg)',
                height:'100%',
                backgroundPosition:'center',
                backgroundSize:'cover',
                backgroundRepeat:'no-repeat',
                display:'flex',
                justifyContent:'center',
                alignItems:'end'
            }}>
              <div className={isHover4?"topicHover pt-4 pb-4":'topic pt-4 pb-4'}>
                <h5 className="text-white text-center" >แสดงความคิดเห็น</h5>
            </div>
        </div>
        </Link>
        </div>

    </div>
    )
}

export default BlogsTypes