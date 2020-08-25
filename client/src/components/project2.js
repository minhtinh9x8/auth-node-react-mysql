import React, { Component } from 'react';
import '../App.css';
import TaskForm from './TaskForm';
import Control from './Control';
import TaskList from './TaskList';
import {findIndex} from 'lodash';
import axios from 'axios';

//import Product from './components/Product';
/* 
    Lưu ý kiểu dữ liệu giữa client và server
    các keyword ([{ID: 1, Name: 'ádaas', Status: 0}]) trùng với các tên cột trong db.
    tạo các API (xem thêm xóa sửa) ở server, từ client gọi lại để dùng
 */

class Project2 extends Component {

    constructor(props){
        super(props);
        this.state = {
            tasks : [],
            isDisplayForm : false,
            taskEditing : null,
            filter : {
                name : '',
                status : -1
            },
            keyword : '',
            sort : {
                by : 'name',
                value : 1
            }
        }
    }

    componentDidMount() {
        axios.get('/api/task')
             .then(res => {
              const task = res.data;
              console.log(task.task);
              this.setState({tasks: task.task})
             }).catch(error => console.log(error));
      };
    
    // componentWillMount(){
    //     if(localStorage && localStorage.getItem('tasks')){
    //         var tasks = JSON.parse(localStorage.getItem('tasks'));
    //         this.setState({
    //             tasks : tasks
    //         });
    //     }
    // }

    // onGenerateData = () =>{
    //     var randomstring = require("randomstring");
    //     var tasks = [
    //         {
    //             id : randomstring.generate(),
    //             name : 'Học lập trình',
    //             status : true
    //         },
    //         {
    //             id : randomstring.generate(),
    //             name : 'Đi bơi',
    //             status : false
    //         },
    //         {
    //             id : randomstring.generate(),
    //             name : 'Đi ngủ',
    //             status : true
    //         }
    //     ];
    //     this.setState({
    //         tasks : tasks
    //     });
    //     localStorage.setItem('tasks', JSON.stringify(tasks));
    // }

    onToggleForm = () =>{
        if(this.state.isDisplayForm && this.state.taskEditing !== null){
            this.setState({
                isDisplayForm : true,
                taskEditing : null
            });
        }
        else{
            this.setState({
                isDisplayForm : !this.state.isDisplayForm,
                taskEditing : null
            });
        }
        
    }
    onCLoseForm = () =>{
        this.setState({
            isDisplayForm : false
        });
    }

    onShowForm = () =>{
        this.setState({
            isDisplayForm : true
        });
    }

    // findIndex = (id) =>{
    //     var {tasks} = this.state;
    //     var result = -1;
    //     tasks.forEach((task, index)=>{
    //         if(task.id === id){
    //             result = index;
    //         }
    //     });
    //     return result;
    // }
    
    onSubmit = (data) =>{
        
        var {tasks} = this.state;
        
        if(data.ID === ''){
            var randomstring = require("randomstring");
            data.ID = randomstring.generate();
            tasks.push(data);
            console.log(data);
            const newItem = {
                ID: data.ID,
                Name: data.Name,
                Status: data.Status
            };
    
            axios.post('/api/insert', newItem).then(res => {
                // let tasks = this.state.tasks;
                // //tasks = [newItem,...tasks];
                // tasks.push(data);
                // this.setState({tasks: tasks});
            }).catch(err => console.log(err));
            window.location.reload();
        }else{
            var index = findIndex(tasks, (task) => {
                return task.ID === data.ID
            });
            tasks[index] = data;
            const newup = {
                ID: data.ID,
                Name: data.Name,
                Status: data.Status
            };
            axios.post('/api/edit',newup).then(res => {
                //tasks[index] = data;
            }).catch(err => console.log(err));
        }
        
        this.setState({
            tasks : tasks,
            taskEditing : null
        });
        //localStorage.setItem('tasks',JSON.stringify(tasks));
        
    }

    onUpdateStatus = (id) => {
        
        var {tasks} = this.state;
        tasks.map(task => {
            if(task.ID === id){
                task.Status = task.Status === 1 ? 0:1;
                this.setState({
                    tasks : tasks
                });
                const newItem = {
                    ID: task.ID,
                    Name: task.Name,
                    Status: task.Status
                };
                axios.post('/api/edit',newItem).then(res => {
                    // this.setState({
                    //     tasks : tasks
                    // });
                }).catch(err => console.log(err));
            }
        });
        //console.log(this.state.tasks);
        //localStorage.setItem('tasks',JSON.stringify(tasks));
    }

    onDelete = (id) => {
        var {tasks} = this.state;
        var index = findIndex(tasks, (task) => {
            return task.ID === id
        });
        const taskID = {ID : id};
        tasks.map(task =>{
            if(task.ID === id){
                    tasks.splice(index, 1);
                    this.setState({
                        tasks : tasks
                    });

                    axios.post('/api/delete', taskID)
                    .then(res => {
                    //     tasks.splice(index, 1);
                    //     this.setState({
                    //     tasks : tasks
                    // });
                    })
                    .catch(error => console.log(error));
                                    }
        });
        //localStorage.setItem('tasks',JSON.stringify(tasks));
        this.onCLoseForm();

    }
    
    onUpdate = (id) => {
        
        var {tasks} = this.state;
        var index = findIndex(tasks, (task) => {
            return task.ID === id
        });
        var taskEditing;
        tasks.map(task =>{
            if(task.ID === id){
                    taskEditing = tasks[index];
                    this.setState({
                        taskEditing : taskEditing
                    }, () => {console.log(this.state.taskEditing);});
                }
        });
        //console.log(this.state.taskEditing);
        this.onShowForm();
    }

    onFilter = (filterName,filterStatus) =>{
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter : {
                name : filterName.toLowerCase(),
                status : filterStatus
            }
        });
        
    }

    onSearch = (keyword) => {
        this.setState({
            keyword : keyword.toLowerCase()
        });
    }

    onSort = (sort) =>{
        this.setState({
            sort : sort
        });
    }
    
    
    render(){
        
        var { tasks, isDisplayForm, taskEditing, keyword, filter, sort } = this.state;
        if(filter){
            if(filter.name){
                tasks = tasks.filter((task) => {
                    return task.Name.toLowerCase().indexOf(filter.name) !== -1;
                });
            }
            tasks = tasks.filter((task) => {
                if(filter.status === -1){
                    return task;
                }else{
                    return task.Status === (filter.status === 1 ? 1 : 0);
                }
            });
        }
        if(keyword){
            tasks = tasks.filter((task)=>{
                return task.Name.toLowerCase().indexOf(keyword) !== -1;
            })
            // tasks = filter(tasks, (task) => {
            //     return task.name.toLowerCase().indexOf(keyword) !== -1;
            // })
        }
        if(sort.by === 'name'){
            tasks.sort((a , b) =>{
                if(a.Name > b.Name){console.log(sort.value); return sort.value; }
                else if(a.Name < b.Name) return -sort.value;
                else return 0;
            });
        }else{
            tasks.sort((a , b) =>{
                if(a.Status > b.Status) return -sort.value;
                else if(a.Status < b.Status) return sort.value;
                else return 0;
            });
        }
        var elmTaskForm = isDisplayForm ? 
                <TaskForm 
                    onSubmit={this.onSubmit} 
                    onCloseForm={this.onCLoseForm}
                    task={taskEditing}
                     /> : '';
        return (

            
            <div className="container">
        <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>
        <div className="row">
            <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4':''}>
                {/* <TaskForm /> */}
                {elmTaskForm}
            </div>
            <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8':'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                <button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
                    <i className="fa fa-plus mr-5"></i>Thêm Công Việc
                </button>
                <button type="button" className="btn btn-danger ml-5" onClick={this.onGenerateData}>
                    <i className="fa fa-plus mr-5"></i>Generate Data
                </button>
                
                    <Control onSearch={this.onSearch} onSort = {this.onSort} />
                
                <div className="row mt-15">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <TaskList tasks={tasks} 
                                    onUpdateStatus={this.onUpdateStatus} 
                                    onDelete={this.onDelete}
                                    onUpdate={this.onUpdate}
                                    onShow={this.onShow}
                                    onFilter={this.onFilter} />
                    </div>
                </div>
            </div>
        </div>
    </div>
            
          );
    }
  
}

export default Project2;
