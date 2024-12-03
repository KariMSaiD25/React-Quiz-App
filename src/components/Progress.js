

function Progress({index , numQuestions , answer   , points , total}) {
  
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer!==null)}/>
      <p>
    <strong> {index+1} </strong> /{numQuestions}
      </p>

      <p><strong>{points}</strong>/{total}</p>
      
    </header>
  )
}

export default Progress
