import { useState } from 'react'
import '../css/blogsTypes.css'
import {Link} from 'react-router-dom'



const BlogsTypes = () =>{
    const [isHover1,setIsHover1] = useState(false)
    const [isHover2,setIsHover2] = useState(false)
    const [isHover3,setIsHover3] = useState(false)
    const [isHover4,setIsHover4] = useState(false)

    return(
    <div className="row page3">
        <div className="col-lg-3 col-md-6 col-sm-6 mb-4" style={{minHeight:'50vh'}}>
        <Link to='/blogs/บรรยาย' className='text-decoration-none' onMouseEnter={()=>setIsHover1(true)} onMouseLeave={()=>setIsHover1(false)}>
        <div className="" style={{
                backgroundImage:'url(https://cdn.pixabay.com/photo/2014/03/02/21/53/lecture-278583_1280.jpg)',
                height:'100%',
                backgroundPosition:'center',
                backgroundSize:'cover',
                backgroundRepeat:'no-repeat',
                display:'flex',
                justifyContent:'center',
                alignItems:'end'
            }}>
            <div className={isHover1?"topicHover pt-4 pb-4":'topic pt-4 pb-4'}>
                <h4 className="text-white text-center" >บรรยาย | อธิบาย</h4>
            </div>
        </div>
        </Link>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-6 mb-4" style={{minHeight:'50vh'}}>
        <Link to='/blogs/คติสอนใจ'  className='text-decoration-none' onMouseEnter={()=>setIsHover2(true)} onMouseLeave={()=>setIsHover2(false)}>
        <div className="" style={{
                backgroundImage:'url(https://cdn.pixabay.com/photo/2019/06/29/04/00/fisherman-4305368_1280.jpg)',
                height:'100%',
                backgroundPosition:'center',
                backgroundSize:'cover',
                backgroundRepeat:'no-repeat',
                display:'flex',
                justifyContent:'center',
                alignItems:'end'
            }}>
              <div className={isHover2?"topicHover pt-4 pb-4":'topic pt-4 pb-4'}>
                <h4 className="text-white text-center" >คติสอนใจ</h4>
            </div>
        </div>
        </Link>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-6 mb-4" style={{minHeight:'50vh'}}>
        <Link to='/blogs/กึ่งชีวประวัติ' className='text-decoration-none' onMouseEnter={()=>setIsHover3(true)} onMouseLeave={()=>setIsHover3(false)}>
        <div className="" style={{
                backgroundImage:'url(https://cdn.pixabay.com/photo/2020/01/22/01/56/venice-4784340_1280.jpg)',
                height:'100%',
                backgroundPosition:'center',
                backgroundSize:'cover',
                backgroundRepeat:'no-repeat',
                display:'flex',
                justifyContent:'center',
                alignItems:'end'
            }}>
              <div className={isHover3?"topicHover pt-4 pb-4":'topic pt-4 pb-4'}>
                <h4 className="text-white text-center" >กึ่งชีวประวัติ</h4>
            </div>
        </div>
        </Link>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-6 mb-4" style={{minHeight:'50vh'}}>
        <Link to='/blogs/สารคดี' className='text-decoration-none' onMouseEnter={()=>setIsHover4(true)} onMouseLeave={()=>setIsHover4(false)}>
        <div className="" style={{
                backgroundImage:'url(https://cdn.pixabay.com/photo/2022/05/03/14/33/photographer-7171846_1280.jpg)',
                height:'100%',
                backgroundPosition:'center',
                backgroundSize:'cover',
                backgroundRepeat:'no-repeat',
                display:'flex',
                justifyContent:'center',
                alignItems:'end'
            }}>
              <div className={isHover4?"topicHover pt-4 pb-4":'topic pt-4 pb-4'}>
                <h4 className="text-white text-center" >สารคดี</h4>
            </div>
        </div>
        </Link>
        </div>

    </div>
    )
}

export default BlogsTypes