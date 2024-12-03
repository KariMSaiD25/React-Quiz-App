function FinishScreen({ points, total , highscore , dispatch}) {
  const percentage = (points / total) * 100;
  return (
    <>
    <p className="result">
      <strong> You scored {points}</strong> out of {total} (
      {Math.ceil(percentage)}%)
    </p>
    <p className="highscore">(Highscore :{highscore} points)</p>

    <button className='btn btn-ui' onClick={() => dispatch({type:'restart'})}> Restart</button>
    </> 
  );
} 

export default FinishScreen;
