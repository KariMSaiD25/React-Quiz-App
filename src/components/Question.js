// function Question({question , dispatch ,status , checkAnswer}) {


//   const ref = useRef()
//   function handleOption (i){

//   return  ref.current.classList.add(question.correctOption===i ?'correct' :'wrong')
//   }
//   return (
//     <div>
//     <h4>{question.question}</h4>
//     <div className="options">

//     {question.options.map((option , i) =>(
//     <button ref={ref} key={i} className= {` btn btn-option ${status==='finished'&&handleOption(i)} `} onClick={() => dispatch({type:'finished' , payload:i  })}>{option}</button>
//     ) )}

//     </div></div>
//   )
// }

// export default Question

function Question({ question, dispatch, answer , qNums , index }) {
  function handleAnswer(i) {
    const choosenOption = answer === i ? " answer " : "";

    const correctOPtion = question.correctOption === i ? "correct" : " wrong";

    return choosenOption + correctOPtion;
  }


  return (
    <div>
      <h4>{question?.question}</h4>
      <div className="options">
        {question.options.map((option, i) => (
          <button
            disabled={answer !== null}
            key={i}
            className={`btn btn-option ${answer !== null &&   handleAnswer(i)}`}
            onClick={() => dispatch({ type: "newAnswered", payload: i })}
          >
            {option}
          </button>
        ))}
      </div>
    
    </div>
  );
}

export default Question;
