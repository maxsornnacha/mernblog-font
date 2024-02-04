 import { useState } from "react";

 //ตัวข้างหน้าพิมพ์ใหญ่
 export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  
   //ย่อชนิดของบทความ ให้แสดงมากสุด3อัน
export const typesFilter = (types) =>{
    if(types.length > 3){
      return types.slice(0,3)
    }else{
      return types
    }
  }




  //แปลงเป็น เวลาไทย
export const thaiDateTrans = (data)=>{
    const date = new Date(data)
    const thaiData = date.toLocaleDateString('th-TH',{
        year:'numeric',
        month:'long',
        day:'numeric',
        weekday:'long'
    })

    return thaiData

  }

//สุ่มเลข
export const randomNumber=()=>{
  return Math.random()*250
}