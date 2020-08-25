import React, { Component } from 'react';

class TaskItem extends Component {

    onUpdateStatus = () =>{
        this.props.onUpdateStatus(this.props.task.ID);
    }

    onDelete = () =>{
        this.props.onDelete(this.props.task.ID);
    }

    onUpdate = () =>{
        this.props.onUpdate(this.props.task.ID);
    }

    // onShow = () =>{
    //     this.props.onShow(this.props.index);
    // }

    render(){
        
        var {task,index}=this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.Name}</td>
                <td className="text-center">
                    <span className={task.Status === 1 ? "label label-success":"label label-danger"} onClick={this.onUpdateStatus}>
                                {task.Status === 1 ? "Kích hoạt":"Ẩn"}
                    </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={this.onUpdate}>
                        <i className="fa fa-pencil mr-5"></i>Sửa
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={this.onDelete}>
                        <i className="fa fa-trash mr-5"></i>Xóa
                    </button>
                </td>
            </tr>
          );
    }
  
}

export default TaskItem;
