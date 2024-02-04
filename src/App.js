import NavbarComponent from "./components/navbar/navbarComponent";
import './App.css'
import CarouselComponent from './components/Advertisement/Carousel'
import CurrentBlogs from "./components/BlogsCurrent";
import FooterComponent from "./components/Footer";
import BlogsTypes from "./components/Types";
import CopyRight from "./components/Copyright";
import { useState } from "react";
import BlogsSearched from "./components/BlogsSearched";
import BlogsMostVote from './components/BlogsMostVote'

function App() {
  const [state,setState] = useState([])
  const [filter,filterSet] = useState([])

  const blogsData=(blogsData)=>{
    setState(blogsData)
    filterSet(blogsData)
  }

  const dataFromChild=(data)=>{
    filterSet(data)
  }
  

  return (
    <div style={{width:'100%'}}>
      <NavbarComponent dataGet={state} sending={dataFromChild}/>
    {/* ยังไม่ได้ค้นหาหรือค้นหาบทความไม่เจอ */}
    {filter.length === state.length &&
    <div>
        <div className="pb-4"><CarouselComponent/></div>
    <div className="mt-5"><BlogsTypes/></div>
    <div className="col-lg-12 col-md-12" style={{margin:'0px',padding:'0px'}}>
    <div className="container-fluid mt-5" >
        <BlogsMostVote blogsData={blogsData}/>
    </div>
    </div>
    <div className="col-lg-12 col-md-12" style={{margin:'0px',padding:'0px'}}>
    <div className="container-fluid mt-5">
        <CurrentBlogs blogsData={blogsData}/>
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
  );
}

export default App;
