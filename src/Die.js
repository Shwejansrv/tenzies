import React from "react";
import ReactDOM from "react-dom";

function Die(props){
    const styles = {
        backgroundColor : props.isHeld === true ? "#59E391" : "white"
      }
    return(
        <div style={styles} className="die-face">
            <h2 onClick={props.func} className="die-num">{props.value}</h2>
        </div>
    )
}

export default Die;