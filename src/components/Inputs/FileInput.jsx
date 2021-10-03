import React from 'react';

function FileInput({ accept, name, required, onChange, id }) {
    return (
        <div>
            <label htmlFor="upload" className={`form-label ${required ? "required" : ""}`}><b><small>{name}</small></b></label>
            <br />
            <div className="input-group mb-3">
                <input type="file" accept={accept} onChange={onChange} id={id} />
            </div>
        </div>
    );
}

export default FileInput;