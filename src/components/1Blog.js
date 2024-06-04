import {useParams} from 'react-router-dom'
import axios from 'axios'
import {useState,useEffect} from 'react'
import NavbarFormComponent from "./navbar/navbarFormComponent"
import React from 'react'
import CommentComponent from './comment/commentForm'
import ShowComment from './comment/comments'
import { v4 as uuidv4 } from 'uuid';

const SingleBlogComponent=()=>{
const [blog,setBlog] = useState({})
    const {slug} = useParams()

const [comments,commentsSet]= useState([])
const [loading,loadingSet] = useState(true)
    
const fetchData=()=>{
    axios.get(`${process.env.REACT_APP_API}/blog/${slug}`)
    .then((response)=>{
        setBlog(response.data)
        commentsSet(response.data.comments)
    })
    .catch((err)=>{
        console.log('error',err)
    })
    .finally(()=>{loadingSet(false)})
}

const commentsGet = comments.map((item, index) => {
  return (
          <ShowComment text={item.comment} index={index} slug={blog.slug} name={item.name} key={uuidv4()} />
  );
});


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

    return (<div className="text-bg-dark">
    <NavbarFormComponent/>
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
            <div className='container' style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <div className="col card mt-5">
              <div className="pt-3 mb-5" style={{height:"10vh",textAlign:'center'}}>
                <h1>{blog.title}</h1>
              </div>
              <div style={{minHeight:"70vh",maxHeight:'auto',height:"70%"}}>
                {blog && 
                  <div className='container-fluid'>
                  <div dangerouslySetInnerHTML={{__html:blog.content}} />
                  </div>
                }
              </div>
              <div className="container-fluid row m-0 mt-5" style={{minHeight:"10vh",maxHeight:'auto'}}> 
                <p className="text-muted col-lg-6">เขียนโดย: <img style={{height:'40px',width:'45px',borderRadius:'50%'}} src={blog.accoutimage}/> {blog.author}</p>
                <p className="text-muted col-lg-6">เขียน ณ {thaiDateTrans(blog.createdAt)}</p>
              </div>
            </div>
            <div className='m-5'>
            <CommentComponent slug={blog.slug}/>
            </div>
            <div>
            {commentsGet}
            </div>
            </div>
        </div>
    )}
    </div> 
    );
}

export default SingleBlogComponent