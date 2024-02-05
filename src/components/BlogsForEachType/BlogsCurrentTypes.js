import axios from 'axios'
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import DeleteComponent from "./../DeleteButton";
import React from "react";
import userFetching from '../../services/userFetching'
import memberFetching from '../../services/memberFetching'
import { v4 as uuidv4 } from 'uuid';
import {capitalizeFirstLetter,typesFilter,thaiDateTrans} from '../../services/modules'
import Stars from '../Ratings/stars';
import StarDefault from '../Ratings/starDefault';

const CurrentBlogs=(props)=>{
    const [state,setState] = useState([])
    const [loading,loadingSet] = useState(true)
    const [more,moreSet] = useState(false)
    const [currentPage,cerrentPageSet] = useState(1)
    const [cardPerPage,cardPerPageSet] = useState(12)
    const [allPages,allPagesSet] = useState([])

    const fetchData=()=>{
        axios.get(`${process.env.REACT_APP_API}/blogs/type/${props.type}`)
        .then((response)=>{
          const dataGet = response.data.reverse()
          setState(dataGet)
          props.blogsData(dataGet)
      
        //คำนวนหาว่าควรมีทั่งหมดกี่ page โดย 1page = 8 cards
        //หาโดยเอา จำนวนทั่งหมด/จำนวนไอเทมต่อpage จะได้ จำนวน page ทั้งหมดเป็น number
          const numberOfPages = Math.ceil((response.data).length/12)
        //แยกเป็น Array เช่น [1,2,3,4]
          const allPageArray = Array.from(({length:numberOfPages}), (_,index)=>index+1)
          allPagesSet(allPageArray)
        })
        .catch((err)=>{
          console.log('error',err)
        })//
        .finally(()=>{loadingSet(false)})
      }

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
        fetchData()
       
      },[])

     //จัดการเกี่ยวกับ Display Page
  //คำนวนหา cards ของแต่ละหน้า
  const indexOfLastCard = currentPage*cardPerPage //การ์ดอันสุดท้ายของแต่ละหน้า
  const indexOfFirstCard = indexOfLastCard-cardPerPage //การ์ดอันสุดแรกของแต่ละหน้า
  const cardCurrentPerPage = state.slice(indexOfFirstCard,indexOfLastCard)//การ์ดทั้งหมด6ใบในแต่ละ page


  //การเปลี่ยนหน้า
  const pageNavigation=(pageNumber)=>{
     cerrentPageSet(pageNumber)
  }

    return(
        <div className='bg-white'>
        {//load ข้อมูลอยู่
        loading?(
            <div>
            <h2 style={{textAlign:'center'}}>บทความประเภท{props.type}</h2>
            <div className="mb-3" style={{textAlign:'center'}}>
            <span className="bg-danger text-danger ps-3 pe-3" style={{borderRadius:'10px',fontSize:'0.8rem'}} >_____________</span>
            </div>
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
            <div className="ps-5 pe-5 pb-3 pt-3 text-dark" >
            <h2 style={{textAlign:'center',fontWeight:'bold'}}>
            <span>บทความประเภท{props.type}</span> 
            </h2>
            <div className="mb-3" style={{textAlign:'center'}}>
            <span className="bg-danger text-danger ps-3 pe-3" style={{borderRadius:'10px',fontSize:'0.8rem'}} >_____________</span>
            </div>
            <div className="mb-5"></div>
            <div className="row">
          {cardCurrentPerPage.length === 0 &&
            <div style={{minHeight:'50vh',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                      <h3>ยังไม่มีบทความ</h3>
            </div>
          }
        {cardCurrentPerPage.map((blog,index)=>{
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
                   return <span><strong>{item}</strong>{(blog.types).length!==(i+1)?', ':''}</span>
                  })
                  :
                  (typesFilter(blog.types)).map((item,i)=><span key={uuidv4()}><strong>{item}</strong>{typesFilter(blog.types).length!==(i+1)?', ':''}</span>)}
                  {(blog.types).length>3?<button style={{border:'0px solid black',backgroundColor:'white'}} onClick={moreHandle} key={uuidv4()}>{more?'...ย่อกลับ':'...เพิ่มเติม'}</button>:''}
                   </span> - {thaiDateTrans(blog.createdAt)}</p>
                <Link to={'/blog/'+blog.slug} style={{textDecoration:"none"}} key={uuidv4()}>
                  <h4 className="pt-1 text-dark"><strong>{blog.title}</strong></h4>
                </Link>
                {blog.username !== memberFetching() && blog.username !== userFetching()  &&
                  <Stars rating={blog.rating} slug={blog.slug}/>
                }
                 {blog.username === memberFetching() && 
                  <StarDefault/>
                }
                 {blog.username === userFetching() && 
                  <StarDefault/>
                }
                </div>
                <div className="card-body" style={{display:"flex",justifyContent:"space-between"}}> 
                  <h6 ><img style={{height:'30px',width:'34px',borderRadius:'50%'}} src={blog.accoutimage}/> {capitalizeFirstLetter(blog.author)}</h6>
                </div>
                {userFetching() &&
                <div className="card-footer" style={{display:"flex",justifyContent:"center"}}>
                  <Link to={'/edit/'+blog.slug} className="btn btn-outline-success" key={uuidv4()}>อัพเดตบทความ</Link>&nbsp;
                  <DeleteComponent key={uuidv4()} id={blog._id} title={blog.title} updateState={updateState} style={{width:'50%'}}/>
                </div>
                 }
              </div>
              </div>
            )
          }) 
        }
        
        {state.length > 1 &&
             <div className="mt-4" style={{textAlign:'center'}}>
               <span><h6 style={{display:'inline-block'}}>Page</h6></span> {allPages.map((page)=>{
                  return <button onClick={()=>pageNavigation(page)} className={currentPage === page?"btn btn-outline-dark me-2 active ":"btn btn-outline-dark me-2 "} key={uuidv4()}>{page}</button>
                })}
            </div>
          }
            </div>
            </div>
            </div>
          )   
        }
        </div>
    )
}

export default CurrentBlogs