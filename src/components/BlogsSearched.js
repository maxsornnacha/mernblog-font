import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import {Link} from 'react-router-dom'
import {capitalizeFirstLetter,typesFilter,thaiDateTrans} from '../services/modules'
import userFetching from '../services/userFetching'
import DeleteComponent from "./DeleteButton";
import searching from '../components/images/searching.png'


const BlogsSearched = (props)=>{
    const [state,setState] = useState(props.blogs)
    const [more,moreSet] = useState(false)
    
    const updateState = (newState) => {
        setState(newState)
      };

     //จัดการเกี่ยวกับเพิ่มเติม
const moreHandle = (event)=>{

    event.preventDefault()
    if(more){
      moreSet(false)
    }else{
      moreSet(true)
    }
  }

  useEffect(()=>{
    setState(props.blogs)
  },[props.blogs])
  
    return(
    <div className="bg-white">
        <div className="ps-5 pe-5 pb-3 pt-3 text-dark" >
        <h2 style={{textAlign:'center',fontWeight:'bold'}}>
        <span>ผลการค้นหา <img style={{height:'50px'}} src={searching}/></span> 
        </h2>
        <div className="mb-5"></div>
        <div className="row">
        {state.length !== 0 && state.map((blog,index)=>{
        return (
          <div className="col-lg-3 col-md-6 col-sm-12 mb-3" key={uuidv4()}>
          <div className="card h-100" key={index+1}>
          <Link to={'/blog/'+blog.slug} style={{textDecoration:"none"}} key={uuidv4()}>
            <div>
            <img className="card-img-top" style={{height:'25vh'}} src={blog.image} alt="" />
            </div>
          </Link>
            <div className="card-body pt-2 pb-2 text-dark">
              <p style={{fontSize:'0.8rem'}}><span>{more? (blog.types).map((item,i)=>{
               return <span key={uuidv4()}><strong>{item}</strong>{(blog.types).length!==(i+1)?', ':''}</span>
              })
              :
              (typesFilter(blog.types)).map((item,i)=><span key={uuidv4()}><strong>{item}</strong>{typesFilter(blog.types).length!==(i+1)?', ':''}</span>)}
              {(blog.types).length>3?<button key={uuidv4()} style={{border:'0px solid black',backgroundColor:'white'}} onClick={moreHandle}>{more?'...ย่อกลับ':'...เพิ่มเติม'}</button>:''}
               </span> - {thaiDateTrans(blog.createdAt)}</p>
            <Link to={'/blog/'+blog.slug} style={{textDecoration:"none"}} key={uuidv4()}>
              <h4 className="pb-3 pt-1 text-dark"><strong>{blog.title}</strong></h4>
            </Link>
            </div>
            <div className="card-body" style={{display:"flex",justifyContent:"space-between"}}> 
              <h6 ><img style={{height:'30px',width:'34px',borderRadius:'50%'}} src={blog.accoutimage}/> {capitalizeFirstLetter(blog.author)}</h6>
            </div>
            {userFetching() &&
            <div className="card-footer" style={{display:"flex",justifyContent:"end"}}>
              <Link to={'/edit/'+blog.slug} className="btn btn-outline-success" key={uuidv4()} style={{width:'50%'}} >อัพเดตบทความ</Link>&nbsp;
              <DeleteComponent key={uuidv4()} id={blog._id} title={blog.title} updateState={updateState} style={{width:'50%'}}/>
            </div>
             }
          </div>
          </div>
        )
      }) 
    }
    {state.length === 0 &&
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'70vh'}}>
            <h3 className="text-center">ไม่พบบทความ</h3>
    </div>
    }
    </div>
    </div>
    </div>
    )
}

export default BlogsSearched