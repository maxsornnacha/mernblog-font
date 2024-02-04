import NavbarComponent from "../../components/navbar/navbarComponent";
import '../../App.css'
import CarouselComponent from '../../components/Advertisement/Carousel'
import BlogsCurrentTypes from './BlogsCurrentTypes'
import FooterComponent from "../../components/Footer";
import CopyRight from "../../components/Copyright";
import { useState } from "react";
import BlogsSearched from "../../components/BlogsSearched";
import { useParams } from "react-router-dom";

const Index=()=>{

    const {type} = useParams()
    const [state,setState] = useState([])
    const [filter,filterSet] = useState([])

  const blogsData=(blogsData)=>{
    setState(blogsData)
    filterSet(blogsData)
  }

  const dataFromChild=(data)=>{
    filterSet(data)
  }



    return(
        <div style={{width:'100%'}}>
        <NavbarComponent dataGet={state} sending={dataFromChild}/>

      {/* ยังไม่ได้ค้นหาหรือค้นหาบทความไม่เจอ */}
      {filter.length === state.length &&
      <div>
          <div><CarouselComponent/></div>
      <div className="col-lg-12 col-md-12" style={{margin:'0px',padding:'0px'}}>
      <div className="container-fluid mt-5">
          <BlogsCurrentTypes blogsData={blogsData} type={type}/>
      </div>
      </div>
      </div>
      }
  
      {/* ค้นหาบทความเจอแล้ว */}
      {filter.length !== state.length &&
      <div>
      <div className="col-lg-12 col-md-12" style={{margin:'0px',padding:'0px'}}>
      <div className="container-fluid mt-5" style={{height:'100%'}}>
          <BlogsSearched blogs={filter}/>
      </div>
      </div>
      </div>
      } 
      <FooterComponent/> {/*Footer*/}
      <CopyRight/> {/*CopyRight*/}
      </div>
    )
}

export default Index