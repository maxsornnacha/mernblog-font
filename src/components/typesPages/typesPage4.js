import { useState } from 'react'
import '../css/blogsTypes.css'
import {Link} from 'react-router-dom'


const BlogsTypes = () =>{
    const [isHover1,setIsHover1] = useState(false)
    const [isHover2,setIsHover2] = useState(false)
    const [isHover3,setIsHover3] = useState(false)
    const [isHover4,setIsHover4] = useState(false)
 
    return(
    <div className="row page4">
        <div className="col-lg-3 col-md-6 col-sm-6 mb-4" style={{minHeight:'50vh'}}>
        <Link to='/blogs/วิเคราะห์' className='text-decoration-none' onMouseEnter={()=>setIsHover1(true)} onMouseLeave={()=>setIsHover1(false)}>
        <div className="" style={{
                backgroundImage:'url(https://cdn.pixabay.com/photo/2016/10/09/08/32/digital-marketing-1725340_1280.jpg)',
                height:'100%',
                backgroundPosition:'center',
                backgroundSize:'cover',
                backgroundRepeat:'no-repeat',
                display:'flex',
                justifyContent:'center',
                alignItems:'end'
            }}>
            <div className={isHover1?"topicHover pt-4 pb-4":'topic pt-4 pb-4'}>
                <h4 className="text-white text-center" >เชิงวิเคราะห์</h4>
            </div>
        </div>
        </Link>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-6 mb-4" style={{minHeight:'50vh'}}>
        <Link to='/blogs/วิจารณ์'  className='text-decoration-none' onMouseEnter={()=>setIsHover2(true)} onMouseLeave={()=>setIsHover2(false)}>
        <div className="" style={{
                backgroundImage:'url(https://cdn.pixabay.com/photo/2017/08/06/05/41/people-2589168_1280.jpg)',
                height:'100%',
                backgroundPosition:'center',
                backgroundSize:'cover',
                backgroundRepeat:'no-repeat',
                display:'flex',
                justifyContent:'center',
                alignItems:'end'
            }}>
              <div className={isHover2?"topicHover pt-4 pb-4":'topic pt-4 pb-4'}>
                <h4 className="text-white text-center" >วิจารณ์</h4>
            </div>
        </div>
        </Link>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-6 mb-4" style={{minHeight:'50vh'}}>
        <Link to='/blogs/การเมือง' className='text-decoration-none' onMouseEnter={()=>setIsHover3(true)} onMouseLeave={()=>setIsHover3(false)}>
        <div className="" style={{
                backgroundImage:'url(https://cdn.pixabay.com/photo/2018/03/07/08/13/shaking-hands-3205463_1280.jpg)',
                height:'100%',
                backgroundPosition:'center',
                backgroundSize:'cover',
                backgroundRepeat:'no-repeat',
                display:'flex',
                justifyContent:'center',
                alignItems:'end'
            }}>
              <div className={isHover3?"topicHover pt-4 pb-4":'topic pt-4 pb-4'}>
                <h4 className="text-white text-center" >การเมือง</h4>
            </div>
        </div>
        </Link>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-6 mb-4" style={{minHeight:'50vh'}}>
        <Link to='/blogs/ข่าวสาร' className='text-decoration-none' onMouseEnter={()=>setIsHover4(true)} onMouseLeave={()=>setIsHover4(false)}>
        <div className="" style={{
                backgroundImage:'url(https://cdn.pixabay.com/photo/2014/05/21/22/28/old-newspaper-350376_1280.jpg)',
                height:'100%',
                backgroundPosition:'center',
                backgroundSize:'cover',
                backgroundRepeat:'no-repeat',
                display:'flex',
                justifyContent:'center',
                alignItems:'end'
            }}>
              <div className={isHover4?"topicHover pt-4 pb-4":'topic pt-4 pb-4'}>
                <h4 className="text-white text-center" >ข่าวสาร</h4>
            </div>
        </div>
        </Link>
        </div>

    </div>
    )
}

export default BlogsTypes