import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid'; // 1. npm install @material-ui/core 2. npm install @material-ui/data-grid 3.npm install @material-ui/styles
import { Helmet } from "react-helmet";
import axios from "axios";
import CreateMeal from './CreateMeal';
import { Link } from 'react-router-dom';

class MealMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pageSize: 5, 
      data: [],
      columns: [
        {
          field: 'photo',
          headerName: 'Photo',
          flex: 1,
          renderCell: (params) => <img src={`images/meals/${params.value}`} class="img-fiuld" style={{height: 100, width:100}}/>
        },
        { field: 'name', 
          headerName: 'Name', 
          flex: 1,
        },
        {
          field: 'type',
          headerName: 'Type',
          flex: 1,
        },
        {
          field: 'price',
          headerName: 'Price',
          type: 'number',
          headerAlign: "left",
          align : "left",
          flex: 1,
        },
        {
          field: 'avalibleTime',
          headerName: 'Avalible Time',
          flex: 1,
        },
        { field: 'status', 
          headerName: 'Status', 
          flex: 1,
        },
        {
          field: 'action',
          headerName: 'Action',
          flex: 1,
          sortable: false,
          filterable: false,
          renderCell: (params) => {
            const id = params?.row.id
            return (
            <strong>
              <button type="button" title="edit" data-bs-toggle="modal" data-bs-target={`#meal${id}`} className="btn p-1 mx-2"><i class="fas fa-edit"></i></button>
              <button onClick={() => this.deleteRow(id)} type="button" title="delete" className="btn p-1 mx-2"><i class="fas fa-trash"></i></button>
            </strong>
          )}
        },
      ],
    };
  }

  deleteRow = async (id) => {
    if(window.confirm('Please click OK to delete the meal.')) {
      await this.deleteMeal(id)
      this.reFetchData()
      return 
    }
    alert("no")
  }

  deleteMeal = async (id) => {
    await axios.get(`http://localhost:3001/deleteMeal?id=${id}`)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  }

  reFetchData = async () => {
    const {restaurantId} = this.props
    const data = await this.loadData(restaurantId)
    console.log()
    this.setState({data})
  }

  handlePageSizeChange = (pageSize) => {
    this.setState({pageSize});
  };

  handleValueOnChange = (e) => {
    console.log(e.currentTarget.value)
  }

  render() {
    const {columns, data, pageSize} = this.state
    const {restaurantId} = this.props
    console.log("hello", {data})
    return (
      <>
      <Helmet>
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
        <title>Menu</title>
      </Helmet>
      
      <div className="mealMenuBg">
        <div className="container p-2" style={{width: '100%'}}>
          <nav aria-label="breadcrumb" className="mt-3">
            <ol className="breadcrumb">
                <Link to="/OwnerOption" className="breadcrumb-item text-decoration-none">Restaurant Owner</Link>
                <li className="breadcrumb-item active" aria-current="page">Design Menu</li>
            </ol>
          </nav>
          <h2 className="fw-normal mt-3"><strong>Design Menu</strong></h2>
          <hr/>
          <div class="d-grid col-10 mx-auto">
            <button type="button" className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#newMeal">Create Meal</button>
          </div>
          <CreateMeal reFetchData={this.reFetchData} restaurantId={restaurantId}/>
          {data?.map(({restaurantId, id, name, type, price, avalibleTime, remarks, withSet, photo}) => 
            <CreateMeal reFetchData={this.reFetchData} restaurantId={restaurantId} id={id} photo={photo} name={name} type={type} price={price} avalibleTime={avalibleTime} remarks={remarks} onChange={this.handleValueOnChange} withSet={withSet} onSale={true} />
          )}
          <DataGrid
            rowHeight={120}
            rows={data}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={this.handlePageSizeChange}
            rowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
            autoHeight
            disableSelectionOnClick
            className="bg-light mb-5"
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>
      </div>
      </>
    );
  }

  componentDidMount = async () => {
    const {restaurantId} = this.props
    const data = await this.loadData(restaurantId)
    this.setState({data})
  }

  loadData = async (id) => {
    let data
    await axios.get(`http://localhost:3001/getdata?id=${id}`)
      .then(response => {
        data = response.data
      })
      .catch(error => {
        console.log(error)
    })
    console.log(data)
    return data || []
  }
}

export default MealMenu

/*
{
          field: 'remarks',
          headerName: 'Remarks',
          flex: 1,
        },
        {
          field: 'withSet',
          headerName: 'with Set?',
          valueGetter: params => { return params.value === 0 ? "No" : "Yes" },
          flex: 1,
        },
*/
