import React, { Component } from 'react';
import NumberInput from "../Inputs/NumberInput"

const Meal = ({name, price, avalibleTime, maxOrder, imgSrc, addOnClick}) => {
    return (
        <>

        <div class="card mb-1" id={`mealCard${name}`}>                  
          <div class="card-body">
                    
                    <img src={imgSrc} class="rounded img-fiuld mr-3" style={{float:"left", width:120, height:120}}/>		
                    <h3 class="card-title">{name}</h3>
                    <h5 class="card-text text-danger">${price}</h5>
                    <p class="card-text"><small class="text-muted">Avalible Time: {avalibleTime}</small></p>
                    
                    <button type="button" class="btn btn-primary btn-sm" style={{float:"right"}} data-bs-toggle="modal" data-bs-target={`#mealDetail${name}`}>Select</button>
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

                            <h5 class="mb-2 mt-4">Drink</h5>
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name={`radio${name}`} value="0" id="Horlicks(Hot)" />
                              <label class="form-check-label" for="flexRadioDefault1">
                                Horlicks(Hot)
                              </label>
                            </div>
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name={`radio${name}`} value="2" id="凍好利時 +$2" />
                              <label class="form-check-label" for="flexRadioDefault1">
                                凍好利時 +$2
                              </label>
                            </div>

                            <h5 class="mb-2 mt-4">Special Order</h5>
                            <textarea id={`specialOrder${name}`} class="form-control" rows="4" cols="50"/>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={addOnClick}>Add to Cart</button>
                          </div>
                        </div>
                      </div>
                   </div>
                   
          </div>
        </div>

        </>
    );
}

export default Meal;