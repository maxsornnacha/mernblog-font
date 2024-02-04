
import {BrowserRouter, Routes, Route } from "react-router-dom"
import App from './App'
import FormComponent from "./components/AddBlogsForm.js"
import SingleBlogComponent from "./components/1Blog.js"
import UpdateComponent from "./components/UpdateBlogForm.js"
import LoginComponent from "./components/Account/Login.js"
import userFetching from './services/userFetching.js'
import RegisterComponent from "./components/Account/Registration.js"
import memberFetching from './services/memberFetching.js'
import statusMemberFetching from './services/statusMemberFetching.js'
import MemberManage from "./components/ManagementForMember.js"
import MemberUpdateForm from './components/MemberUpdateForm.js'
import ManageCarousel from "./components/Advertisement/ManageCarousel.js"
import CreateAds from "./components/Advertisement/CreateAds.js"
import IndexType from "./components/BlogsForEachType/index.js"
import UpdateCarousel from './components/Advertisement/UpdateForm.js'
import AccountManagement from "./components/Account/AccountManagement.js"
import ChangePassword from './components/Account/ChangePassword.js'
const MyRoute = ()=>{
  
    return(<BrowserRouter>
       <Routes>
            <Route path="/" exact Component={App}/>
            <Route path="/blog/:slug" exact Component={SingleBlogComponent} />
            <Route path="/blogs/:type" exact Component={IndexType} />
            <Route path="/login" exact Component={LoginComponent} />
            <Route path="/registration" exact Component={RegisterComponent} />
       

            {/* สร้างบทความสำหรับ admin */}
             {userFetching() && 
              <Route path="/create" exact 
                Component={userFetching()?FormComponent
                :LoginComponent}
                />
            }
  
            {/* สร้างบทความสำหรับ member */}
            {memberFetching() &&
                 <Route path="/create" exact 
                 Component={statusMemberFetching()?FormComponent
                 :LoginComponent}
                 />
            }

            {/* สร้างบทความถ้ายังไม่ได้ Login มันจะ Render Login Component แทน */}
            {!memberFetching() && !userFetching() &&
                 <Route path="/create" exact 
                 Component={userFetching()?FormComponent
                 :LoginComponent}
                 />
            }

            {/* แก้ไขบทความสำหรับ Admin */}
            {
              <Route path="/edit/:slug" exact 
              Component={userFetching()?UpdateComponent
              :LoginComponent}
              />
            }

          {/* การจัดการบทความสำหรับ Member */}
           {
              <Route path="/member/manage" exact 
              Component={statusMemberFetching()?MemberManage
              :LoginComponent}
              />
            }

          {/* แก้ไขบทความสำหรับ Member */}
          {
              <Route path="/editMember/:slug" exact 
              Component={statusMemberFetching()?MemberUpdateForm
              :LoginComponent}
              />
            }

          {/* การจัดการโฆษณาสำหรับ Admin */}
          {userFetching() && 
              <Route path="/adsManage" exact 
                Component={userFetching()?ManageCarousel
                :LoginComponent}
                />
            }

          {/* การสร้างโฆษณาสำหรับ Admin */}
            {userFetching() && 
              <Route path="/adsCreate" exact 
                Component={userFetching()?CreateAds
                :LoginComponent}
                />
            }

            {/* การแก้ไขโฆษณาสำหรับ Admin */}
            {
              <Route path="/edit/carousel/:id" exact 
              Component={userFetching()?UpdateCarousel
              :LoginComponent}
              />
            }

             {/* การจัดการบัญชี member */} 
              <Route path="/account" exact 
                Component={memberFetching()?AccountManagement
                :LoginComponent}
                />

               {/* เปลี่ยนรหัสผ่าน */} 
               <Route path="/change/password" exact 
                Component={memberFetching()?ChangePassword
                :LoginComponent}
                />


        
       </Routes>
    </BrowserRouter>)
}

export default MyRoute