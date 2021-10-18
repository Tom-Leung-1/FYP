import React from 'react';

const LargeTextInput = ({ value, id, type, placeholder, onChange, name, errorMsg}) => {
    return (
        <>
            <input value={value} type={type} id={id} className={`${errorMsg === "OK" ? "is-valid" : errorMsg ? "is-invalid" : ""} form-control`} placeholder={placeholder} onChange={onChange} />
            <label htmlFor={id} className="text-secondary">{name}</label>
            {errorMsg && <div className="invalid-feedback">{errorMsg}</div>}
        </>
    );
}

export default LargeTextInput;