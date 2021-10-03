import React from 'react';
import GM from "../GoogleMap/GoogleMap";
function AddressInput({ sm_md_lg, id, address, required, placeholder, onChange, name, errorMsg, onMarkerComplete }) {
    const [sm, md, lg] = sm_md_lg.split('_')
    return (
        <div className={`${sm !== "-1" ? `col-sm-${sm}` : ""} ${md !== "-1" ? `col-md-${md}` : ""} ${lg !== "-1" ? `col-lg-${lg}` : ""}`}>
            <label htmlFor={id} className={`form-label ${required ? "required" : ""}`}><b><small>{name}</small></b></label>
            <input type="text" id={id} className="form-control form-control-sm shadow-sm" value={address} onChange={onChange} />
            <GM setMarker={onMarkerComplete} />
            {/* {errorMsg && <div className="invalid-feedback">{errorMsg}</div>} */}
        </div>
    );
}

export default AddressInput;