import React from 'react'

function Progress({index,numsQuestions,points,maxPossiblePoints,answer}) {
  return (
    <div>
      <header className='progress'>
        <progress max={numsQuestions} 
          value={index + Number(answer != null)}
        
         />

        <p>Question <strong>{index + 1}</strong>/ {numsQuestions}</p>
        <p><strong>{points}</strong> / {maxPossiblePoints}</p>
      </header>
    </div>
  )
}

export default Progress
