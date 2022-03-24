import React from 'react';

function FileInput({imgSrc, fileType, accept, name, required, onChange, id }) {
    return (
        <div>
            <label htmlFor="upload" className={`form-label ${required ? "required" : ""}`}><b><small>{name}</small></b></label>
            <br />
            <div className="input-group mb-3">
                <input data-type={fileType} type="file" accept={accept} onChange={onChange} id={id} />
            </div>
            {imgSrc && <img src={imgSrc} class="img-fiuld" style={{height: 100}}/>}
        </div>
    );
}

export default FileInput;