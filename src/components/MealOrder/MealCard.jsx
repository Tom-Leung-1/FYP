import React from 'react';

function MealCard({name, price, avalibleTime, maxOrder, imgSrc, addOnClick}) {
    return (
        <div class="card mb-1" id={`mealCard${name}`}>                  
            <div class="card-body">
                <img src={imgSrc} class="rounded img-fiuld mr-3" style={{float:"left", width:120, height:120}}/>		
                <h3 class="card-title">{name}</h3>
                <h5 class="card-text text-danger">${price}</h5>
                <p class="card-text"><small class="text-muted">Avalible Time: {avalibleTime}</small></p>
                <button type="button" class="btn btn-primary btn-sm" style={{float:"right"}} data-bs-toggle="modal" data-bs-target={`#mealDetail${name}`}>Select</button>
            </div>
        </div>
    );
}

export default MealCard;