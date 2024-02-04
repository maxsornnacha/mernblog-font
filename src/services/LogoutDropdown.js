import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'


//Clear sessionStorage
const Logout=()=>{

    const redirect = useNavigate()

    const confirm=()=>{
        Swal.fire({
            title:`คุณต้องการที่จะออกจากระบบหรือไม่`,
            icon:'warning',
            showCancelButton:true
        })
        .then((status)=>{
           if(status.isConfirmed){
            Swal.fire({
                title: "สำเร็จ",
                text: "'ออกจากระบบสำเร็จ'",
                icon: "success"
              });
            sessionStorage.clear();
            redirect('/login')
           }
        })
    }
  

    return(
    <div>
        <button className="p-2 dropdown-item b text-dark"  type="submit" onClick={confirm}>ออกจากระบบ </button>
    </div>
    )

}

export default Logout