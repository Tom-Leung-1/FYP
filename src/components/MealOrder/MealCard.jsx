import React from 'react';

function MealCard({name, price, avalibleTime, maxOrder, imgSrc, addOnClick}) {
    return (
        <div class="card mb-1 mx-3" id={`mealCard${name}`}>                  
            <div class="card-body mt-1">
                <img src={imgSrc} class="rounded img-fiuld mx-3" style={{float:"left", width:120, height:120}}/>		
                <h3 class="card-title">{name}</h3>
                <h5 class="card-text text-danger">${price}</h5>
                <p class="card-text"><small class="text-muted">Avalible Time: {avalibleTime}</small>
                <br/>
                <button type="button" class="btn btn-primary btn-sm" style={{float:"right"}} data-bs-toggle="modal" data-bs-target={`#mealDetail${name}`}>Select</button></p>
            </div>
        </div>
    );
}

export default MealCard;