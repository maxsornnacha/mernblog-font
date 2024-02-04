import '../css/stars.css'
import { useEffect, useState } from 'react'
import userFetching from '../../services/userFetching'
import memberFetching from '../../services/memberFetching'
import tokenFectching from '../../services/tokenFectching'
import tokenMemberFetching from '../../services/tokenMemberFetching'
import Swal from 'sweetalert2'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const Stars=(props)=>{
    const redirect = useNavigate()
    const [previousScore,setPreviousScore] = useState(0)
    const [rating,setRating] = useState(0)
    const [username,setUsername] = useState('')
    const [objectId,setObjectId] = useState('')

    const VoteAlreadyChecking=()=>{
        for(let i=0;i<(props.rating).length;i++){
            if(props.rating[i].ratingName === userFetching() || props.rating[i].ratingName === memberFetching() ){
                setUsername(props.rating[i].ratingName)
                setRating(props.rating[i].ratingScore)
                setPreviousScore(props.rating[i].ratingScore)
                setObjectId(props.rating[i]._id)
            }
        }
    }

    const handleStarClick=(starRate)=>{

                setRating(starRate)
                //ถ้าคลิ๊กอีกรอบ จะเหลือ 0 คะแนน
               if(starRate === rating){
                setRating(0)
               }
    }

    const sendRatingData = (event)=>{
        event.preventDefault()

        Swal.fire({
            title:`คุณต้องการที่จะให้คะแนนหรือไม่`,
            icon:'warning',
            showCancelButton:true
        }).then((result)=>{
            if(result.isConfirmed){
                axios.post(`${process.env.REACT_APP_API}/${userFetching()?'scoregiving':'scoregivingMember'}/${props.slug}`,{
                    ratingName:userFetching()?userFetching():memberFetching(),
                    ratingScore:rating
                },{
                    headers:{
                         Authorization: `Bearer ${tokenFectching()?tokenFectching():tokenMemberFetching()}`
                    }
                 })
                .then((result)=>{
                    Swal.fire({
                        icon: "success",
                        title: "ให้คะแนนสำเร็จ"
                      }).then((status)=>{
                        if(status.isConfirmed){
                            window.location.reload()
                        }
                      }
                        )
                })
                .catch((err)=>{
                    Swal.fire({
                      icon: "error",
                      title: "ให้คะแนนไม่สำเร็จ กรุณาเข้าสู่ระบบก่อนให้คะแนน",
                    }).then(()=>redirect('/login'));
                })
            }})
    }

    const changeRatingData = (event)=>{
        event.preventDefault()
        console.table({rating})

        Swal.fire({
            title:`คุณต้องการแก้ไขจาก '${previousScore}คะแนน' เป็น '${rating}คะแนน' หรือไม่`,
            icon:'warning',
            showCancelButton:true
        }).then((result)=>{
            if(result.isConfirmed){
                axios.post(`${process.env.REACT_APP_API}/${userFetching()?'scorechange':'scorechangeMember'}/${props.slug}`,{
                    ratingName:userFetching()?userFetching():memberFetching(),
                    ratingScore:rating,
                    objectId:objectId
                },{
                    headers:{
                         Authorization: `Bearer ${tokenFectching()?tokenFectching():tokenMemberFetching()}`
                    }
                 })
                .then((result)=>{
                    Swal.fire({
                        icon: "success",
                        title: "แก้ไขคะแนนสำเร็จ"
                      }).then((status)=>{
                        if(status.isConfirmed){
                            window.location.reload()
                        }
                      }
                        )
                })
                .catch((err)=>{
                    Swal.fire({
                      icon: "error",
                      title: "แก้ไขคะแนนไม่สำเร็จ โปรดลองใหม่อีกครั้ง",
                    });
                })
            }})
    }

    useEffect(()=>{
        VoteAlreadyChecking()
    },[])

    return(
    <div>
        {[1,2,3,4,5].map((star)=>{
        return (
        <span 
        key={star}
        className={star <= rating ? 'star selected':'star'}
        onClick={()=>handleStarClick(star)}
        > 
            &#9733;&nbsp;
        </span>)
        })}
        { username !== memberFetching() && username !== userFetching()?
        <button className='text-bg-danger border border-danger' onClick={sendRatingData} style={{fontSize:'0.8rem',borderRadius:'5px'}}>ส่งคะแนน</button>
        :<span></span>
        }
        {username === memberFetching()?
        <button className='text-bg-danger border border-danger' onClick={changeRatingData} style={{fontSize:'0.8rem',borderRadius:'5px'}}>แก้ไขคะแนน</button>
        :<span></span>
        }
         {username === userFetching()?
        <button className='text-bg-danger border border-danger' onClick={changeRatingData} style={{fontSize:'0.8rem',borderRadius:'5px'}}>แก้ไขคะแนน</button>
        :<span></span>
        }
    </div>
    )
}

export default Stars