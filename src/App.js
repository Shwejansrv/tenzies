import React from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'

function App() {


  const [dieNumbers,setDieNumbers] = React.useState(allNewDice());

  const [tenzies,setTenzies] = React.useState(false);


  function newDice(){
    return {
      value : Math.floor(Math.random()*(6) + 1),
      isHeld : false,
      id : nanoid()
    }
  }

  function allNewDice(){
    const randomArr = []
    for(let i=0;i<10;i++){
      randomArr.push(newDice())
    }
    return randomArr
  }
  
  function holdDice(id){
    setDieNumbers(dieNumbers => dieNumbers.map((dice)=>{
      if(dice.id == id){
        return {...dice, isHeld : !dice.isHeld}
      }
      else{
        return dice
      }
    }))
  }

  const newDieArr = dieNumbers.map((num)=>{
    return <Die func={() => holdDice(num.id)} id={num.id} value = {num.value} isHeld = {num.isHeld} key = {num.id}/>
  })


  function rollDice(){
    if(tenzies){
      setDieNumbers(allNewDice)
      setTenzies(!tenzies)
    }
    else{
      setDieNumbers(dieNumbers => dieNumbers.map((dice)=>{
        return dice.isHeld ? dice : newDice()
      }));
    }    
  }

  React.useEffect(()=>{
    const allHeld = dieNumbers.every(die => die.isHeld)
    const firstVal = dieNumbers[0].value
    const sameVal = dieNumbers.every(die => die.value === firstVal)
    if(allHeld && sameVal){
      setTenzies(true)
    }
  },[dieNumbers])


  return (
    <main>
      {tenzies &&  <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {newDieArr}
      </div>
      <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll Dice"}</button>
    </main>
  );
}

export default App;
