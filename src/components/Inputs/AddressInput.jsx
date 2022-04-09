import React from 'react';
import GM from "../GoogleMap/GoogleMap";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Pin from "../../images/pin.png";

function AddressInput({ sm_md_lg, id, address, required, placeholder, onChange, name, errorMsg, onMarkerComplete, position, firstCenter }) {
    const [sm, md, lg] = sm_md_lg.split('_')
    console.log({position})
    return (
        <>
        <div className={`${sm !== "-1" ? `col-sm-${sm}` : ""} ${md !== "-1" ? `col-md-${md}` : ""} ${lg !== "-1" ? `col-lg-${lg}` : ""}`}>
            <label htmlFor={id} className={`form-label ${required ? "required" : ""}`}><b><small>{name}</small></b></label>
            <Alert severity="info">
                <AlertTitle>How to input the address</AlertTitle>
                1. click on the <img src={Pin} style={{height:"1.5em", width:"1.5em"}}/> button<br/>
                2. set the marker on the loaction of your address on the map<br/>
                3. Edit the address in the input box if it is needed<br/>
                <b><i class="bi bi-exclamation-diamond"></i> You cannot input the address without setting any marker on the map</b>
            </Alert>
            <input onChange={onChange} type="text" id={id} className="form-control form-control-sm shadow-sm" value={address} />
            <GM firstCenter={firstCenter} position={position} setMarker={onMarkerComplete} />
            {/* {errorMsg && <div className="invalid-feedback">{errorMsg}</div>} */}
        </div>
        
        </>
    );
}

export default AddressInput;