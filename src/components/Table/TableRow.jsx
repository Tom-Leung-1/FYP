import React, { Component } from 'react';
import "./TableRow.css";
import {BsPencilSquare} from "react-icons/bs"
import { IconContext } from "react-icons";

class  TableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldExtend: false,
        }
    }

    render() {
        const {oneSelect, id, checked, data} = this.props
        console.log(Object.entries(data))
        return (
            <div className={`row-wrapper ${checked ? "row-wrapper-bgblue"  : "row-wrapper-bgwhite"}`}> 
                <table>
                        <tbody>
                            <tr>
                                {Object.entries(data).map(keyValue => <td className={keyValue[0]}>{keyValue[1]}</td>)}
                                {<td className="view-details">
                                    <BsPencilSquare onClick={() => console.log(data)}/>
                                </td>}
                            </tr>
                        </tbody>
                    </table>
            </div>
        )
    }
}

export default TableRow;