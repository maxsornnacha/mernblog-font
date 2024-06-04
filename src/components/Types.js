import './css/blogsTypes.css'
// Import the Font Awesome CSS in your project
import '@fortawesome/fontawesome-free/css/all.min.css';
import {useEffect, useState} from 'react'
import Page1 from './typesPages/typesPage1'
import Page2 from './typesPages/typesPage2'
import Page3 from './typesPages/typesPage3'
import Page4 from './typesPages/typesPage4';

const BlogsTypes = () =>{

    const [page,pageSet] = useState(<Page1/>)

    const handleNext=(event)=>{
        event.preventDefault()
        if(page.type === Page1){
            pageSet(<Page2/>)
        }else if(page.type === Page2){
            pageSet(<Page3/>)
        }else if(page.type === Page3){
            pageSet(<Page4/>)
        }
    }

    const handlePrevious=(event)=>{
        event.preventDefault()
        if(page.type === Page4){
            pageSet(<Page3/>)
        }else if(page.type === Page3){
            pageSet(<Page2/>)
        }else if(page.type === Page2){
            pageSet(<Page1/>)
        }
    }

   

    return(
    <div className="mt-5 mb-5  container">
        <h3 className="" style={{textAlign:'center'}}>ประเภทบทความ</h3>
        <div className="mb-3" style={{textAlign:'center'}}>
        <span className="bg-danger text-danger ps-3 pe-3" style={{borderRadius:'10px',fontSize:'0.5rem'}} >_________________</span>
        </div>
    <div className="row m-0 pt-5 pb-4 page1-onload">

        {/* Page display */}
        {page}

        <div style={{textAlign:'center'}} className="mt-4">
        <span>
            <button className="btn btn-outline-dark" disabled={page.type===Page1?true:false} onClick={handlePrevious}>
            <strong>
            <i className="fa-solid fa-caret-left"></i>
            </strong>
            </button>
        </span>
        &nbsp;&nbsp;
        <span>
            <button className="btn btn-outline-dark" disabled={page.type===Page4?true:false} onClick={handleNext}>
                <strong>
                <i className="fa-solid fa-caret-right"></i>
                </strong>
            </button>
        </span>
    </div>
    </div>
   
    </div>
    )
}

export default BlogsTypes