import React, { Component } from 'react';

class TaskForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            ID : '',
            Name : '',
            Status : 0
        }
    }

    componentWillMount(){
        if(this.props.task){
            this.setState({
                ID : this.props.task.ID,
                Name : this.props.task.Name,
                Status : this.props.task.Status
            });
            //console.log(this.state);
        }
    }
    
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if(nextProps && nextProps.task){
            this.setState({
                ID : nextProps.task.ID,
                Name : nextProps.task.Name,
                Status : nextProps.task.Status
            });
            //console.log(this.state);
        } else if(!nextProps.task){
            this.setState({
                ID : '',
                Name : '',
                Status : 0
            });
        }
    }
    onChange = (event) =>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        console.log(name);
        console.log(value);
        if(name === 'Status'){
            value = target.value === '1' ? 1 : 0
        }
        this.setState({
            [name] : value
        });
    }

    onSubmit = (event) =>{
        event.preventDefault();
        this.props.onSubmit(this.state);
        this.onClear();
        this.onCloseForm();
        console.log(this.state);
    }

    onCloseForm = () =>{
        this.props.onCloseForm();
    }
    
    onClear = () =>{
        this.setState({
            Name : '',
            Status : 0
        });
    }
    render(){
        
        var {ID} = this.state;
        
        return (

            
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        { ID !== '' ? "Cập Nhật Công Việc" : "Thêm Công Việc" }
                        <i className="fa fa-times-circle ml-x" onClick={this.onCloseForm}></i>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input type="text" className="form-control" name="Name" value={this.state.Name} onChange={this.onChange} />
                        </div>
                        <label>Trạng Thái :</label>
                        <select className="form-control" required="required" name="Status" value={this.state.Status} onChange={this.onChange}>
                            <option value={1}>Kích Hoạt</option>
                            <option value={0}>Ẩn</option>
                        </select>
                        <br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <i className="fa fa-plus mr-5"></i>Lưu Lại</button>&nbsp;
                            <button type="button" className="btn btn-danger" onClick={this.onClear}>
                                <i className="fa fa-times mr-5"></i>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
            
          );
    }
  
}

export default TaskForm;
