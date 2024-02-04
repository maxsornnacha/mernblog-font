import {useState,useEffect} from 'react'

const SearchComponent=(props)=>{
    const [state,stateSet] = useState('')

    const scan=()=>{
        let get = props.dataGet.filter((item)=>{
                    return (item.title.toLowerCase()).includes(state.toLowerCase())
                    }) 
        return get
    }


    const searching=(event)=>{
        stateSet(event.target.value)
      
    }

useEffect(()=>{
    //ส่ง Value ไปยัง Navbar
    props.sending(scan())
},[state])

    


    return(
    <div>
    <span className="form">
        <input className="inputsearch p-1 ps-2 me-4" value={state} type="text" onChange={searching} style={{display:'inline-block',width:'40vw',borderRadius:'20px'}} placeholder="ค้นหาหัวข้อบทความ"/>
    </span>

    </div>
        )
}

export default SearchComponent