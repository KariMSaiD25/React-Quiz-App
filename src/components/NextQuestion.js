import { useEffect, useRef } from "react";

function NextQuestion({ answer, index, qNums, dispatch }) {
  const ref = useRef(null);
  useEffect(
    function () {
      const handleKeyDown = (event) => {
        if (event.code === "Enter") {
          ref.current?.click();
        }
      };
      document.addEventListener("keydown", handleKeyDown);
    
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
    }
     } ,
    [dispatch, qNums, index]
  );

  if (answer == null) return null;
  return (
    <button
      ref={ref}
      className="btn btn-ui"
      onClick={() =>
        dispatch({ type: index === qNums - 1 ? "finish" : "next" })
      }
    >
      {index === qNums - 1 ? "finish" : "next"}
    </button>
  );
}

export default NextQuestion;
