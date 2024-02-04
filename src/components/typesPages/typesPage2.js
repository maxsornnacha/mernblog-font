import '../css/blogsTypes.css'
import { useState } from 'react'
import {Link} from 'react-router-dom'



const BlogsTypes = () =>{
    const [isHover1,setIsHover1] = useState(false)
    const [isHover2,setIsHover2] = useState(false)
    const [isHover3,setIsHover3] = useState(false)
    const [isHover4,setIsHover4] = useState(false)

    return(
    <div className="row page2">
        <div className="col-lg-3 col-md-6 col-sm-6 mb-4" style={{minHeight:'50vh'}}>
        <Link to='/blogs/สยองขวัญ' className='text-decoration-none' onMouseEnter={()=>setIsHover1(true)} onMouseLeave={()=>setIsHover1(false)}>  
        <div className="" style={{
                backgroundImage:'url(https://cdn.pixabay.com/photo/2016/11/29/09/11/candles-1868640_1280.jpg)',
                height:'100%',
                backgroundPosition:'center',
                backgroundSize:'cover',
                backgroundRepeat:'no-repeat',
                display:'flex',
                justifyContent:'center',
                alignItems:'end'
            }}>
            <div className={isHover1?"topicHover pt-4 pb-4":'topic pt-4 pb-4'}>
                <h4 className="text-white text-center" >สยองขวัญ</h4>
            </div>
        </div>
        </Link>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-6 mb-4" style={{minHeight:'50vh'}}>
        <Link to='/blogs/ลี้ลับ'  className='text-decoration-none' onMouseEnter={()=>setIsHover2(true)} onMouseLeave={()=>setIsHover2(false)}>
        <div className="" style={{
                backgroundImage:'url(https://cdn.pixabay.com/photo/2015/09/13/19/42/forest-938635_1280.jpg)',
                height:'100%',
                backgroundPosition:'center',
                backgroundSize:'cover',
                backgroundRepeat:'no-repeat',
                display:'flex',
                justifyContent:'center',
                alignItems:'end'
            }}>
              <div className={isHover2?"topicHover pt-4 pb-4":'topic pt-4 pb-4'}>
                <h4 className="text-white text-center" >เรื่องลี้ลับ</h4>
            </div>
        </div>
        </Link>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-6 mb-4" style={{minHeight:'50vh'}}>
        <Link to='/blogs/ความบรรเทิง' className='text-decoration-none' onMouseEnter={()=>setIsHover3(true)} onMouseLeave={()=>setIsHover3(false)}>
        <div className="" style={{
                backgroundImage:'url(https://cdn.pixabay.com/photo/2016/05/12/13/16/graffiti-1387786_1280.jpg)',
                height:'100%',
                backgroundPosition:'center',
                backgroundSize:'cover',
                backgroundRepeat:'no-repeat',
                display:'flex',
                justifyContent:'center',
                alignItems:'end'
            }}>
              <div className={isHover3?"topicHover pt-4 pb-4":'topic pt-4 pb-4'}>
                <h4 className="text-white text-center" >ความบันเทิง</h4>
            </div>
        </div>
        </Link>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-6 mb-4" style={{minHeight:'50vh'}}>
        <Link to='/blogs/สัมภาษณ์' className='text-decoration-none' onMouseEnter={()=>setIsHover4(true)} onMouseLeave={()=>setIsHover4(false)}>
        <div className="" style={{
                backgroundImage:'url(https://cdn.pixabay.com/photo/2018/11/02/10/51/job-3790033_1280.jpg)',
                height:'100%',
                backgroundPosition:'center',
                backgroundSize:'cover',
                backgroundRepeat:'no-repeat',
                display:'flex',
                justifyContent:'center',
                alignItems:'end'
            }}>
              <div className={isHover4?"topicHover pt-4 pb-4":'topic pt-4 pb-4'}>
                <h4 className="text-white text-center" >สัมภาษณ์</h4>
            </div>
        </div>
        </Link>
        </div>

    </div>
    )
}

export default BlogsTypes