import React, { Component } from 'react';
import "./Table.css"
import TableRow from "./TableRow";

class Table extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            data : null,
        }
    }

    loadOrders = () => {
        return [
            {order_id: 1, name: "Cafe De Coral", time: "2018-10-15 17:17:13", type: "take away",  status: "pending", },
            {order_id: 2, name: "Cafe De Coral", time: "2018-10-15 17:17:13", type: "eat here",  status: "done", },
            {order_id: 3, name: "Cafe De Coral", time: "2018-10-15 17:17:13", type: "delivery",  status: "pending", },
            {order_id: 4, name: "Cafe De Coral", time: "2018-10-15 17:17:13", type: "take away",  status: "done", },
            {order_id: 5, name: "Cafe De Coral", time: "2018-10-15 17:17:13", type: "take away",  status: "done", },
            {order_id: 6, name: "Cafe De Coral", time: "2018-10-15 17:17:13", type: "take away",  status: "done", },
            {order_id: 7, name: "Cafe De Coral", time: "2018-10-15 17:17:13", type: "take away",  status: "done", },
            {order_id: 8, name: "Cafe De Coral", time: "2018-10-15 17:17:13", type: "take away",  status: "done", },
            {order_id: 9, name: "Cafe De Coral", time: "2018-10-15 17:17:13", type: "take away",  status: "done", },
            {order_id: 10, name: "Cafe De Coral", time: "2018-10-15 17:17:13", type: "take away",  status: "done", },
            {order_id: 11, name: "Cafe De Coral", time: "2018-10-15 17:17:13", type: "take away",  status: "done", },
            {order_id: 12, name: "Cafe De Coral", time: "2018-10-15 17:17:13", type: "take away",  status: "done", },
            {order_id: 13, name: "Cafe De Coral", time: "2018-10-15 17:17:13", type: "take away",  status: "done", },
            {order_id: 14, name: "Cafe De Coral", time: "2018-10-15 17:17:13", type: "take away",  status: "done", },
            {order_id: 15, name: "Cafe De Coral", time: "2018-10-15 17:17:13", type: "take away",  status: "done", },
            {order_id: 16, name: "Cafe De Coral", time: "2018-10-15 17:17:13", type: "take away",  status: "done", },
        ]
    }

    render() {
        const {data} = this.state
        const {headers, needModify} = this.props
        let rows = data?.map((data) => 
            <TableRow oneSelect={this.oneSelect} data={data} needModify={needModify}/>)
        return (
            <div className="tbl-wrapper">
                <div class="tbl-header">
                    <table>
                        <thead>
                            <tr>
                                {headers?.map(header => <th>{header}</th>)}
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="tbl-content">
                    {rows}
                </div>
            </div>
            
        )
    }
    componentDidMount() {
        let {data} = this.props
        if (!data) {
            data = this.loadOrders()
        }
        this.setState({data})
    }
}

export default Table;