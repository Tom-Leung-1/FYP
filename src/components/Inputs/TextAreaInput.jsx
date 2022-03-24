import React from 'react';

const TextAreaInput = ({ value, onChange, sm_md_lg, id, name, required, height }) => {
    const [sm, md, lg] = sm_md_lg.split('_')
    return (
        <div className={`${sm !== "-1" ? `col-sm-${sm}` : ""} ${md !== "-1" ? `col-md-${md}` : ""} ${lg !== "-1" ? `col-lg-${lg}` : ""}`}>
            <label htmlFor={id} className={`form-label ${required ? "required" : ""}`}><b><small>{name}</small></b></label>
            <textarea onChange={onChange} value={value} type="text" id={id} className="form-control shadow-sm" style={{ height: height }} />
        </div>
    );
}

export default TextAreaInput;