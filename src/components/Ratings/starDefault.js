import '../css/stars.css'

const StarDefault=()=>{
    return(
        <div>
            {[1,2,3,4,5].map((star)=>{
            return (
            <span 
            key={star}
            className='star'
            > 
                &#9733;&nbsp;
            </span>)
            })}
        </div>
        )
    }
    
export default StarDefault
