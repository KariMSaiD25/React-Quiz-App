import { useState } from "react"




 export default function TextExpander({
  className='',expanded=true,buttonColor='',collapseButtonText='show less',expandButtonText='show more',collapsedNumWords = 4 , children
 }) {


    const [expand , setExpanded] =useState(expanded);
    const [string , setString] = useState(children);
  

  function handleClick  ()  {
    if (!expand) {
      setExpanded(true) ;
      setString(children)
    } 
    else
       {
        setString(collapsingString(children, collapsedNumWords))  
        setExpanded(false)
        
    }

}
    function collapsingString(str, numWords) {
      const words = str.split(/\s+/); // Split the string into words using whitespace as a delimiter
      const slicedWords = words.slice(0, numWords); // Take the first `numWords` words
     return slicedWords.join(' ') // Join the sliced words back into a string
       
    }
  return <div className={className}>
    <p>{string}</p>
    <button style={{color:buttonColor}}
    onClick={handleClick}>
    {expand ? collapseButtonText:expandButtonText}
    </button>
  </div>
  
}


function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        {Array.from({ length: content.length + 1 }, (_, i) => (
          <Tab num={i} key={i} activeTab={activeTab} onClick={setActiveTab} />
        ))}
      </div>

      {activeTab <= 2 ? (
        <TabContent item={content.at(activeTab)} />
      ) : (
        <DifferentContent />
      )}
    </div>
  );
}

function Tab({ num, activeTab, onClick }) {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  );
}

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  function handleInc() {
    setLikes(likes + 1);
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}
      
      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide " : "Show "}  details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button>Undo</button>
        <button>Undo in 2s</button>
      </div>
    </div>
  );
}

function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}

