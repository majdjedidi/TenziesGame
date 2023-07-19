import React, { useEffect, useState } from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
export default function Main() {
  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }
  const allNewDice = () =>{
    const newDice=[]
    for (let i=0; i<10;i++){
      newDice.push(generateNewDie())
    }
    return newDice
  }
const [tenzies,setTenzies]=useState(false)
const [dice,setDice] = useState(allNewDice())

const diceElements = dice.map(die=> <Die key ={die.id}
  value={die.value}
  isHeld={die.isHeld} 
  id={die.id} 
  holdDice={()=>holdDice(die.id)}/>)

function rollDice (){
  if(!tenzies){
  setDice(oldDice=> oldDice.map(die=>{
    return die.isHeld ? die : generateNewDie()}
  ))
  }else{
    setTenzies(false)
    setDice(allNewDice())
  }
}

function holdDice(id){
setDice(oldDice=>oldDice.map(die=>{
  return die.id === id ?{...die,isHeld:!die.isHeld} :die
}))
}
useEffect(() => {
  const allHeld = dice.every(die => die.isHeld)
  const firstValue = dice[0].value
  const allSameValue = dice.every(die => die.value === firstValue)
  if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won!")
  }
}, [dice])
  return (
    <div className='container'>
        <div className='main'>
          {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className='grid-container'>
           {diceElements}
          </div>
          <button className='roll-dice' onClick={rollDice}>{tenzies?'New Game':'Roll'}</button>
        </div>
    </div>
  )
}
