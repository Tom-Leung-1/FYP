import React from 'react';

function MealCard({id, name, price, avalibleTime, imgSrc, onSale}) {
    return (
        <div class="card mb-1 mx-3 col-11" id={`mealCard${name}`}>                  
            <div class="card-body mt-1">
                <img src={imgSrc} class="rounded img-fiuld mx-3" style={{float:"left", width:120, height:120}}/>		
                <h3 class="card-title">{name} <span class="badge bg-danger" style={{display: onSale ? 'none' : 'inline-block'}}>SOLD OUT</span> </h3>
                <h5 class="card-text text-danger">${price}</h5>
                <p class="card-text"><small class="text-muted">Avalible Time: {avalibleTime}</small>
                <br/>
                <button type="button" class="btn btn-primary btn-sm" style={{float:"right", display: onSale ? 'inline-block' : 'none'}} data-bs-toggle="modal" data-bs-target={`#mealDetail${id}`}>Select</button></p>
            </div>
        </div>
    );
}

export default MealCard;