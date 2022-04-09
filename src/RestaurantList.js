import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid'; // 1. npm install @material-ui/core 2. npm install @material-ui/data-grid 3.npm install @material-ui/styles
import { Helmet } from "react-helmet";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



const currencyFormatter = new Intl.NumberFormat('zh-HK', {
    style: 'currency',
    currency: 'HKD',
  });

class RestaurantList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { 
                    pageSize: 10,
                    data: [
                        { id: 1, RNo: '10000', name: 'Eliza Pride', status: 1, total: 10.5},
                        { id: 2, RNo: '15545', name: 'Golden City', status: 0, total: 10 },
                        { id: 3, RNo: '13452', name: 'May My Baby', status: 0, total: 11.2},
                        { id: 4, RNo: '36754', name: 'Tony Bin', status: 1, total: 30.5},
                        { id: 5, RNo: '67856', name: 'Yes My Lord', status: 1, total: 9.4 },
                        { id: 6, RNo: '34222', name: 'Moon Madness', status: -1, total: 11.2 },
                        { id: 7, RNo: '00001', name: 'My Big Boy', status: -1, total: 8},
                      ],
                    columns: [
                        {
                          field: 'id',
                          headerName: 'Restaurant No.',
                          width: 130,
                          sortable: false,
                        },
                        {
                          field: 'profile',
                          headerName: "Restaurant Profile",
                          headerAlign: 'center',
                          align: 'center',
                          sortable: false,
                          filterable: false,
                          width: 155,
                          renderCell: (params) => (
                            <strong>
                              <small onClick={() => this.dialogOpen('pro', params.row)} type="button" className="btn btn-link" style={{textDecoration: "none", fontSize: "1em"}}>View</small>
                            </strong>
                          )
                        },
                        {
                          field: 'brFile',
                          headerName: "Business Registration Licence",
                          headerAlign: 'center',
                          align: 'center',
                          sortable: false,
                          filterable: false,
                          width: 220,
                          renderCell: (params) => (
                            <strong>
                              <small onClick={() => this.dialogOpen('br', params.row)} type="button" className="btn btn-link" style={{textDecoration: "none", fontSize: "1em"}}>View</small>
                            </strong>
                          )
                        },
                        {
                          field: 'resPhoto',
                          headerName: "Restaurant Photo",
                          headerAlign: 'center',
                          align: 'center',
                          sortable: false,
                          filterable: false,
                          width: 155,
                          renderCell: (params) => (
                            <strong>
                              <small type="button" onClick={() => this.dialogOpen('photo', params.row)} className="btn btn-link" style={{textDecoration: "none", fontSize: "1em"}}>View</small>
                            </strong>
                          )
                        },
                        {
                          field: 'status',
                          headerName: 'Status',
                          headerAlign: 'center',
                          align: 'center',
                          width: 200,
                          filterable: false,
                          valueFormatter: ({ value }) => (value === 1 ? "Approve" : value === 0 ? "Decline" : "Waiting for approvement"),
                        },
                        {
                          field: 'action',
                          headerName: 'Action',
                          headerAlign: 'center',
                          align: 'center',
                          sortable: false,
                          filterable: false,
                          renderCell: (params) => (
                            <strong>
                              <button type="button" title="approve" className="btn p-1 mx-2"><i class="fas fa-check"></i></button>
                              <button type="button" title="decline" className="btn p-1 mx-2"><i class="fas fa-times"></i></button>
                            </strong>
                          )
                        },
                      ],
                    proOpen: false,
                    brOpen: false,
                    photoOpen: false,
                    select: []
                 };
  }

  handlePageSizeChange = (params) => {
    this.setState({pageSize: params.pageSize});
  };

  dialogOpen = (type, params) => {    
    this.setState({select: params})
    if (type === "pro")
      this.setState({proOpen: true})
    else if (type === "br")
      this.setState({brOpen: true})
    else if (type === "photo")
      this.setState({photoOpen: true})
  }

  dialogClose = () => {
    this.setState({proOpen: false, brOpen: false, photoOpen: false, select: []})
  }

  render() {
    const {data, columns, select} = this.state
    return (
      <>
      <Helmet>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
      </Helmet>
        <div className="container p-2">
        <h2 className="fw-normal mt-3"><strong>Business Registration Management</strong></h2>
        <hr/>

        <div className="container px-5">
        <div className="row">
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={this.state.pageSize}
          onPageSizeChange={this.handlePageSizeChange}
          rowsPerPageOptions={[10, 20, 50]}
          autoHeight
          disableSelectionOnClick
          className="bg-light position-sticky"
          disableColumnSelector
        />
        </div>
        </div>
        </div>

        <Dialog fullWidth='true' maxWidth='sm' open={this.state.proOpen} onClose={() => this.dialogClose()}>
                <DialogTitle className="text-capitalize">Restaurant Profile</DialogTitle>
                <DialogContent>
                <DialogContentText className='text-dark'>
                  <p className="fw-normal"><strong>Owner's Information:</strong>
                  <br/>
                  <small>First Name:</small>
                  <br/>
                  <small>Last Name:</small>
                  <br/>
                  <small>Business Phone Number: </small>
                  <br/>
                  <small>HKID Card Number: </small>
                  <br/>
                  </p>
                  <p className="fw-normal"><strong>Restaurant's Information:</strong>
                  <br/>
                  <small>Restaurant's Name: {select.name}</small>
                  <br/>
                  <small>Address:</small>
                  <br/>
                  <small>Open Hours: </small>
                  <br/>
                  <small>Description: </small>
                  <br/>
                  </p>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => this.dialogClose()} className="text-secondary">close</Button>
                </DialogActions>
            </Dialog>

            <Dialog fullWidth='true' maxWidth='sm' open={this.state.brOpen} onClose={() => this.dialogClose()}>
                <DialogTitle className="text-capitalize">Business Registration Licence</DialogTitle>
                <DialogContent>
                {select.name} BR
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => this.dialogClose()} className="text-secondary">close</Button>
                </DialogActions>
            </Dialog>

            <Dialog fullWidth='true' maxWidth='sm' open={this.state.photoOpen} onClose={() => this.dialogClose()}>
                <DialogTitle className="text-capitalize">Restaurant Photo</DialogTitle>
                <DialogContent>
                {select.name} Photo
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => this.dialogClose()} className="text-secondary">close</Button>
                </DialogActions>
            </Dialog>
      </>
    );
  }
}

export default RestaurantList