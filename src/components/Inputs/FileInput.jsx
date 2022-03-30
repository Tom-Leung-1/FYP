import React from 'react';

//TODO: New upload image does not show (only show the image in db)
function FileInput({imgSrc, fileType, accept, name, required, onChange, id }) {
    return (
        <div className='mb-1'>
            <label htmlFor="upload" className={`form-label ${required ? "required" : ""}`}><b><small>{name}</small></b></label>
            <br />
            
            <button type="button" class="btn btn-primary btn-sm border-0" style={{backgroundColor:"#6E5EFE", marginRight:10}} data-bs-toggle="modal" data-bs-target={`#fileModal${fileType}`}>Upload new image</button>
            {imgSrc ? <span className='text-success fw-bold'>Image received <i class="bi bi-check-lg"></i></span> : <span></span>}

            <div class="modal fade" id={`fileModal${fileType}`} tabindex="-1" aria-labelledby="fileModal" aria-hidden="true">
              <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title fw-bold">{name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div className="input-group mb-3">
                      <input data-type={fileType} type="file" accept={accept} onChange={onChange} id={id} />
                    </div>
                    {imgSrc && <img src={imgSrc} class="img-fiuld" style={{width: "75%"}}/>}
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" style={{backgroundColor:"#6E5EFE"}}>Save</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
}

export default FileInput;