


function StartScreen({qNums , dispatch}) {
  return (
    <div className="start">
      <h2>Welcome to React Quiz</h2>
      <h3> {qNums} questions to test your react mastery</h3>
      <button className="btn btn-ui"  onClick={() => dispatch({type:'start'}) }>Let's Start</button>
    </div>
  )
}

export default StartScreen
