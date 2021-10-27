import React from 'react';

const NumberInput = ({ max, id }) => {
    
    const handlePlus = () => {
        if (document.getElementById(id).value < parseInt(max))
          document.getElementById(id).value = parseInt(document.getElementById(id).value) + 1;
    }
    
    const handleMinus = () => {
        if (document.getElementById(id).value > 1)
          document.getElementById(id).value = parseInt(document.getElementById(id).value) - 1;
    }

    return (
        <>
          <button type="button" class="btn btn-sm btn-primary" onClick={handleMinus}><span>&#8722;</span></button>
          <input type="text" value="1" id={id} name="no" class="mx-1" style={{width:"2em", textAlign:"center"}}></input>
          <button type="button" class="btn btn-sm btn-primary" onClick={handlePlus}><span>&#43;</span></button>
        </>
    );
}

export default NumberInput;