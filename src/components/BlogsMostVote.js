import axios from 'axios'
import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import DeleteComponent from "./DeleteButton";
import React from "react";
import userFetching from '../services/userFetching'
import { v4 as uuidv4 } from 'uuid';
import {capitalizeFirstLetter,typesFilter,thaiDateTrans,randomNumber} from '../services/modules'
import './css/blogsMostView.css'

const CurrentBlogs=(props)=>{
  
  const [state,setState] = useState([])
  const [loading,loadingSet] = useState(true)
  const [more,moreSet] = useState(false)
  const [currentPage,cerrentPageSet] = useState(1)
  const [cardPerPage,cardPerPageSet] = useState(4)
  const [allPages,allPagesSet] = useState([])
  const [cardCurrentPerPage,setCardCurrentPerPage] = useState([])
  
  

  const fetchData=()=>{
    axios.get(`${process.env.REACT_APP_API}/blogs`)
    .then((response)=>{
      const dataGet = response.data.reverse()
      setState(dataGet)
      props.blogsData(dataGet)
  
    //คำนวนหาว่าควรมีทั่งหมดกี่ page โดย 1page = 8 cards
    //หาโดยเอา จำนวนทั่งหมด/จำนวนไอเทมต่อpage จะได้ จำนวน page ทั้งหมดเป็น number
      const numberOfPages = Math.ceil((response.data).length/4)
    //แยกเป็น Array เช่น [1,2,3,4]
      const allPageArray = Array.from(({length:numberOfPages}), (_,index)=>index+1)
    //Set ให้มีแค่2 หน้าเท่านั้น 
      allPagesSet([1,2])
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

//เรียงลำดับบทความตามคะแนน
  const sortingBlogs=()=>{
      const sortedBlogs = state.sort((a,b)=>{
        const sumRatingA = (a.rating).reduce((total,score)=>{
          return total+score.ratingScore
        },0)
        const sumRatingB = (b.rating).reduce((total,score)=>{
          return total+score.ratingScore
        },0)
        return sumRatingB - sumRatingA
      })
      return sortedBlogs
  }

 

  useEffect(()=>{
    fetchData()
      //จัดการเกี่ยวกับ Display Page
  //คำนวนหา cards ของแต่ละหน้า
  const indexOfLastCard = currentPage*cardPerPage //การ์ดอันสุดท้ายของแต่ละหน้า
  const indexOfFirstCard = indexOfLastCard-cardPerPage //การ์ดอันสุดแรกของแต่ละหน้า
  setCardCurrentPerPage(sortingBlogs().slice(indexOfFirstCard,indexOfLastCard))//การ์ดทั้งหมด6ใบในแต่ละ page

  },[loading,currentPage])


  //การเปลี่ยนหน้า
  const pageNavigation=(pageNumber)=>{
     cerrentPageSet(pageNumber)
  }

  

    return(
    <div className='bg-white text-dark'>
    {//load ข้อมูลอยู่
    loading?(
        <div>
        <div className="pb-5 pt-3">
        <div className='mt-5'>
        <h2 style={{textAlign:'center'}}>8 บทความที่มียอดโหวดเยอะที่สุด</h2>
        <div className="mb-3" style={{textAlign:'center'}}>
        <span className=" text-dark ps-3 pe-3" style={{borderRadius:'10px',fontSize:'0.8rem'}} >__________________</span>
        </div>
        </div>

        <div style={{display:'flex',flexDirection:'column',minHeight:'50vh',justifyContent:'center',alignItems:'center'}}>
        <div className="spinner-border p-5" role="status">
        <span className="visually-hidden" style={{}}>loading...</span>
        </div>
        <div className="mt-3">loading...</div>
        </div>
        </div>
        </div>
      ):(
        //load สำเร็จ
        <div >
        <div className="container pb-5 pt-3 cardItem-onload">
        <h4 className='pt-3' style={{textAlign:'center'}}>
        <span>8 บทความที่มียอดโหวดเยอะที่สุด</span> 
        </h4>
        <div className="mb-3" style={{textAlign:'center'}}>
        <span className="text-dark ps-3 pe-3" style={{borderRadius:'5px',fontSize:'0.8rem'}} >__________________</span>
        </div>
        <div className="mb-5"></div>
        <div className="row m-0 card-most-view">
    {cardCurrentPerPage.map((blog,index)=>{
        return (
          <div className="col-lg-3 col-md-6 col-sm-12 col-10 mb-5" key={uuidv4()}>

          <div className="h-100 bg-light border border-muted" style={{borderRadius:'5px'}} key={index+1}>
          <Link to={'/blog/'+blog.slug} style={{textDecoration:"none"}} key={uuidv4()}>
            <div>
            <img className="card-img-top" style={{height:'28vh',borderTopLeftRadius:'5px',borderTopRightRadius:'5px'}} src={blog.image} alt="" />
            </div>
          </Link>
            <div className="card-body ps-3 pt-3 pb-4 text-dark">
              <p style={{fontSize:'0.8rem'}}><span>{more? (blog.types).map((item,i)=>{
               return <span><strong>{item}</strong>{(blog.types).length!==(i+1)?', ':''}</span>
              })
              :
              (typesFilter(blog.types)).map((item,i)=><span key={uuidv4()}><strong>{item}</strong>{typesFilter(blog.types).length!==(i+1)?', ':''}</span>)}
              {(blog.types).length>3?<button style={{border:'0px solid black',backgroundColor:'white'}} onClick={moreHandle} key={uuidv4()}>{more?'...ย่อกลับ':'...เพิ่มเติม'}</button>:''}
               </span> - {thaiDateTrans(blog.createdAt)}</p>
              
              <div>
              {(blog.rating).reduce((total,rating)=>{
                 return  total + rating.ratingScore
              },0)} <span className='text-warning'>&#9733;</span>
              </div>

            <Link to={'/blog/'+blog.slug} style={{textDecoration:"none"}} key={uuidv4()}>
              <h6 className=" pt-1 text-dark"><strong>{blog.title}</strong></h6>
            </Link>
            </div>
            <div className="card-body mx-3 text-dark" style={{display:"flex",justifyContent:"space-between"}}> 
              <h6 ><img style={{height:'26px',width:'26px',borderRadius:'50%'}} src={blog.accoutimage}/> <span style={{fontSize:'0.8rem'}}>{capitalizeFirstLetter(blog.author)}</span></h6>
            </div>
            {userFetching() &&
            <div className="card-footer " style={{display:"flex",justifyContent:"center"}}>
              <Link to={'/edit/'+blog.slug} className="btn btn-outline-success" key={uuidv4()} style={{width:'50%'}} >อัพเดตบทความ</Link>&nbsp;
              <DeleteComponent key={uuidv4()} id={blog._id} title={blog.title} updateState={updateState} style={{width:'50%'}}/>
            </div>
             }
          </div>
          </div>
        )
      }) 
    }
    
    {true && state.length > 4 &&
         <div className="mt-1" style={{textAlign:'center'}}>
           <span><h6 style={{display:'inline-block'}}></h6></span> {allPages.map((page)=>{
              return <button onClick={()=>pageNavigation(page)} className={currentPage === page?"btn btn-outline-light me-2 active border border-muted":"btn btn-outline-light border border-muted text-dark me-2 "} key={uuidv4()}>{page}</button>
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