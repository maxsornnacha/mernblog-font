
import {Link} from 'react-router-dom'
import userFetching from '../../services/userFetching'
import memberFetching from '../../services/memberFetching'
import LogoutDropdown from '../../services/LogoutDropdown'
import SearchComponent from '../SearchingBlogs'
import '../css/navbar.css'
import {capitalizeFirstLetter} from '../../services/modules'
import axios from "axios"
import { useState,useEffect } from 'react'
import tokenMemberFetching from '../../services/tokenMemberFetching'

const NavbarComponent=(props)=>{
    const [accountInfo,setAccountInfo] = useState('')

      //เรียกดูข้อมูลโปรไฟล์
      const fetchData=()=>{
        if(memberFetching()){
        axios.get(`${process.env.REACT_APP_API}/account/${memberFetching()}`,{
            headers:{
                 Authorization: `Bearer ${tokenMemberFetching()}`
            }
         })
        .then((response)=>{
            setAccountInfo(response.data)
        })
        .catch((err)=>{
        })
    }
    }
    
     
    useEffect(()=>{
        if(memberFetching()){
        fetchData()
        }
    },[])

  
    const send=(data)=>{
        //ส่ง props จาก seaching ไปยัง App
        props.sending(data)
    }


    return(
    <div className='sticky-top'> 
    <div className='bg-white border-bottom box-shadow  px-2'>
        <nav className='navbar navbar-expand-lg navbar-light'>
            <Link to='/' className='navbar-brand '><h3>&nbsp;&nbsp;LOGO|<span className='text-danger'>B</span>log&nbsp;&nbsp;</h3></Link>
            <button className='navbar-toggler' type='button' data-bs-toggle="collapse" data-bs-target="#show" aria-controls='navbarNav'
            aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
            </button>
        <div className="collapse navbar-collapse" id="show">
        <ul className="navbar-nav" style={{display:'flex',justifyContent:'center',alignItems:'center'}}> 
            
        <li className="nav-item">
            <SearchComponent dataGet={props.dataGet} sending={send}/>
            </li>
            
            <li className="nav-item a ">
           <Link to="/" className="nav-link text-dark" >หน้าแรก</Link>
            </li>
     

            {userFetching() &&
            <li className="nav-item a  ">
                <Link to="/create" className="nav-link text-dark">เพิ่มบทความ</Link>
            </li>
            }   
            {memberFetching() &&
            <li className="nav-item a ">
                <Link to="/create" className="nav-link text-dark">เพิ่มบทความ</Link>
            </li>
            }   
            {!userFetching() && !memberFetching() &&
                <li className="nav-item a ">
                <Link to="/login" className="nav-link  text-dark">เข้าสู่ระบบ</Link>
                </li>
            }

             {!userFetching() && !memberFetching() &&
                <li className="nav-item a ">
                <Link to="/registration" className="nav-link  text-dark">ลงทะเบียน</Link>
                </li>
            }
    

            {userFetching() &&
                <li className="nav-item d px-1">
                <div className='dropdown'> 
                <a className='dropdown-toggle text-dark font-weight-bold mr-3' style={{textDecoration:'none'}} data-bs-toggle='dropdown' type='button'>{capitalizeFirstLetter(userFetching())}</a>
                <ul className='dropdown-menu'>
                <li className="dropdown-item c">
                <LogoutDropdown/>
                </li>
                </ul>
                </div>
                </li>
            }


            {memberFetching() &&
                <li className="nav-item d pt-2 pb-1 px-2">
                <div className='dropdown'> 
                <a className='dropdown-toggle text-dark  font-weight-bold mr-3' style={{textDecoration:'none'}} data-bs-toggle='dropdown' type='button'><img style={{height:'30px',width:'32px',borderRadius:'50%'}} src={accountInfo.userImage}/> {capitalizeFirstLetter(memberFetching())}</a>
                <ul className='dropdown-menu'>
                <li className="p-2 dropdown-item b">
                <Link to="/account" className='text-dark dropdown-item ' style={{textDecoration:'none'}}>ข้อมูลส่วนตัว</Link>
                </li>
                <li className="p-2 dropdown-item b">
                <Link to="/member/manage" className='text-dark dropdown-item ' style={{textDecoration:'none'}}>การจัดการบทความ</Link>
                </li>
                <li className="ps-3 dropdown-item b">
                <LogoutDropdown/>
                </li>
                </ul>
                </div>
                </li>
            }

        </ul>
        </div>
        </nav>
    </div>
    </div>
    )
}

export default NavbarComponent