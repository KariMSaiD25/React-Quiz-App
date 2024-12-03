import { useEffect } from "react"


function Timer({dispatch , timeRemaining}) {
  const min  =Math.floor(timeRemaining /60) 
  const sec = timeRemaining %60
  useEffect(function (){
  const id =  setInterval(function(){
           dispatch({type:'tick'})
    } ,1000 )

    return () => clearInterval(id)

  },[dispatch])

   // Format time with leading zeros
  const formattedTime = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;


  return (
    <div className="timer">
    {formattedTime}
    </div>
  )
}

export default Timer
