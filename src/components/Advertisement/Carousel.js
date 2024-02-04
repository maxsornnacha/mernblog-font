import axios from 'axios'
import { useEffect, useState } from 'react'
import  Carousel from 'react-bootstrap/Carousel';
import {Link} from 'react-router-dom'
import userFetching from '../../services/userFetching'



const CarouselItem=()=>{
  const [ads,adsSet] = useState([])
  const [loading,loadingSet] = useState(true)
    
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

useEffect(()=>{
  fetchData()
},[])


return(
<div>
{loading?
<div>
<div style={{display:'flex',flexDirection:'column',minHeight:'50vh',justifyContent:'center',alignItems:'center'}}>
      <div className="spinner-border p-5" role="status">
      <span className="visually-hidden" style={{}}>loading...</span>
      </div>
      <div className="mt-3">loading...</div>
      </div>
</div>   
:
<div >
<Carousel>
      {ads.map((item, index) => (
        <Carousel.Item key={index}>
          <div className="d-block"
            style={{width:'100vw',
            height:'35rem',
            backgroundImage:`url(${item.image})`,
            backgroundPosition:'center',
            backgroundSize:'cover',
            backgroundRepeat:'no-repeat'
          }}
            alt={`Slide ${index + 1}`}>
          </div>
          <Carousel.Caption>
            <div>
            <h1 className='mb-5' style={{textShadow:'1px 3px 5px black'}}>{item.topic}</h1>
            <p className='pb-5' style={{textShadow:'1px 3px 5px black'}}>{item.description}</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
  </Carousel>
</div>
}{userFetching() &&
  <div className='w-100 mt-2' style={{display:'flex',justifyContent:'center'}}>
    <Link to='/adsCreate' className='btn btn-outline-success' style={{textAlign:'center'}}>เพิ่มโฆษณา</Link>
    &nbsp;
    <Link to='/adsManage' className='btn btn-outline-success' style={{textAlign:'center'}}>จัดการโฆษณา</Link>
  </div>
  }
</div>
)
}

export default CarouselItem