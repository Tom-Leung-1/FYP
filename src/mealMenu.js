import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid'; // 1. npm install @material-ui/core 2. npm install @material-ui/data-grid 3.npm install @material-ui/styles
import { Helmet } from "react-helmet";

const columns = [
  { field: 'name', 
    headerName: 'Name', 
    width: 200,
    sortable: false
  },
  {
    field: 'type',
    headerName: 'Type',
    width: 120
  },
  {
    field: 'price',
    headerName: 'Price',
    type: 'number',
    headerAlign: 'left',
    align: 'left',
    width: 120
  },
  {
    field: 'supplytime',
    headerName: 'Supply Time',
    width: 200
  },
  {
    field: 'remarks',
    headerName: 'Remarks',
    width: 300,
    sortable: false
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 150,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <strong>
        <button type="button" title="edit" className="btn p-1 mx-2"><i class="fas fa-edit"></i></button>
        <button type="button" title="delete" className="btn p-1 mx-2"><i class="fas fa-trash"></i></button>
      </strong>
    )
  },
];

const rows = [
  { id: 1, name: 'Set 1', type: 'set', price: 260, supplytime: 'dinner', remarks: 'with 2 free hot drink' },
  { id: 2, name: 'Set 2', type: 'set', price: 48, supplytime: 'full day', remarks: 'with 1 free hot drink' },
  { id: 3, name: 'Set 3', type: 'set', price: 23, supplytime: 'breakfast', remarks: 'with 2 free hot drink' },
  { id: 4, name: 'Big Tasty', type: 'snack', price: 33, supplytime: 'full day', remarks: 'sauce none/less/more' },
  { id: 5, name: 'Bao', type: 'snack', price: 16, supplytime: 'breakfast', remarks: 'with free soy milk' },
  { id: 6, name: 'Salad', type: 'snack', price: 41, supplytime: 'lunch', remarks: 'with chicken/beef/seafood' },
  { id: 7, name: 'Cola', type: 'drink', price: 8, supplytime: 'full day', remarks: 'ice none/less/more' },
  { id: 8, name: 'Coffee', type: 'drink', price: 10, supplytime: 'full day', remarks: 'milk none/less/more' },
  { id: 9, name: 'Red bean ice', type: 'drink', price: 14, supplytime: 'Sunday', remarks: 'ice none/less/more' },
  { id: 10, name: 'Cake', type: 'dessert', price: 25, supplytime: 'lunch/dinner', remarks: 'type normal/choco/green tea' },
  { id: 11, name: 'Ice Cream', type: 'dessert', price: 22, supplytime: 'lunch/dinner', remarks: 'type milk/choco/vanilla' }
];

class mealMenu extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
                    pageSize: 5
                 };
  }

  handlePageSizeChange = (params) => {
    this.setState({pageSize: params.pageSize});
  };

  render() {
    return (
      <>
      <Helmet>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
        <title>Menu</title>
      </Helmet>
      
      <div className="mealMenuBg">
      <div className="container p-2" style={{width: '100%'}}>
      <h2 className="fw-normal mt-3"><strong>Design Menu</strong></h2>
      <hr/>
        <div class="d-grid col-10 mx-auto">
          <button type="button" className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Create Meal</button>
        </div>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-xl">
             <div class="modal-content">
               <div class="modal-header">
                 <h5 class="modal-title" id="exampleModalLabel"><strong>Create Meal</strong></h5>
                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
               <form>
               <div class="modal-body">
               
                 <div class="mb-3">
                   <label for="mealName" class="col-form-label">Name:</label>
                   <input type="text" class="form-control" id="mealName" />
                 </div>
                 <div class="mb-3">
                   <label for="type" class="col-form-label">Type:</label>
                   <input type="text" class="form-control" id="type" />
                 </div>
                 <div class="mb-3">
                   <label for="price" class="col-form-label">Price:</label>
                   <input type="number" class="form-control" required name="price" min="0" step=".1" />
                 </div>
                 <div class="mb-3">
                   <label for="supplyTime" class="col-form-label">Supply time:</label>
                   <input type="text" class="form-control" id="supplyTime" />
                 </div>
                 <div class="mb-3">
                   <label for="remark" class="col-form-label">Remark:</label>
                   <textarea class="form-control" id="remark"></textarea>
                 </div>
               
               </div>
               <div class="modal-footer">
                 <button type="sumbit" class="btn btn-primary">Create</button>
               </div>
               </form>
            </div>
          </div>
        </div>


        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={this.state.pageSize}
          onPageSizeChange={this.handlePageSizeChange}
          rowsPerPageOptions={[5, 10, 20]}
          autoHeight
          disableSelectionOnClick
          className="bg-light"
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
      </div>
      </>
    );
  }
}

export default mealMenu
