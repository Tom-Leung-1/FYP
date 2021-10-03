import React from 'react';

const TextInput = ({ value, sm_md_lg, id, required, placeholder, onChange, name, errorMsg, valid }) => {
    const [sm, md, lg] = sm_md_lg.split('_')
    return (
        <div className={`${sm !== "-1" ? `col-sm-${sm}` : ""} ${md !== "-1" ? `col-md-${md}` : ""} ${lg !== "-1" ? `col-lg-${lg}` : ""}`}>
            <label htmlFor={id} className={`form-label ${required ? "required" : ""}`}><b><small>{name}</small></b></label>
            <input value={value} type="text" id={id} className={`${errorMsg === "OK" ? "is-valid" : errorMsg ? "is-invalid" : ""} form-control form-control-sm shadow-sm`} placeholder={placeholder} onChange={onChange} />
            {errorMsg && <div className="invalid-feedback">{errorMsg}</div>}
        </div>
    );
}

export default TextInput;