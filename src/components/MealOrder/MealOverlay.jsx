import React from 'react';
import NumberInput from "../Inputs/NumberInput"

function MealOverlay({withSetData, name, price, type, avalibleTime, maxOrder, imgSrc, addOnClick}) {
    return (
        <div class="modal fade" id={`mealDetail${name}`} tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body">
                    <button type="button" class="btn-close" style={{float:"right"}} data-bs-dismiss="modal" aria-label="Close"></button>
                    <img src={imgSrc} class="my-2" style={{width:"100%", height:300, objectFit:"cover"}}/>
                    <h3>{name}</h3>
                    <h5 class="text-danger">${price}</h5>
                    <p class="card-text"><small class="text-muted">Avalible Time: {avalibleTime}</small></p>
                    <NumberInput max={maxOrder} id={`noOf${name}`}/>
                    <p class="card-text"><small class="text-muted">At most {maxOrder} for an order</small></p>
                    {type === "Set" ?
                    <>
                    <h5 class="mb-2 mt-4">Drinks</h5> 
                    {withSetData?.filter(({type}) => type === "Drink").map((drink) => 
                    
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name={`radio${name}`} value={drink.price} id={drink.name} />
                            <label class="form-check-label" for="flexRadioDefault1">
                            {drink.price ? drink.name + " +$" + drink.price : drink.name}
                            </label>
                        </div>)}
                    </>
                    : null}
                    <h5 class="mb-2 mt-4">Special Order</h5>
                    <textarea id={`specialOrder${name}`} class="form-control" rows="4" cols="50"/>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={addOnClick}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MealOverlay;