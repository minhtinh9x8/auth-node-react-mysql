import React, { Component } from 'react';

class Sort extends Component {

    constructor(props){
        super(props);
        this.state = {
            sort :{
                by : 'name',
                value : 1
            }
        }
    }

    onClick = (sortBy, sortValue) =>{
        this.setState({
            sort : {
                by : sortBy,
                value : sortValue
            }
        },() => {this.props.onSort(this.state.sort);});
        
    }
    
    render(){
        
        var {sort} = this.state;
        return (
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle"
                            type="button"
                            id="dropdownMenu1"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="true">
                        Sắp Xếp <i className="fa fa-caret-square-o-down ml-5"></i>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={()=>this.onClick('name',1)}>
                            <a role="button" className={(sort.by === 'name' && sort.value === 1 ? "sort_selected" : '')}>
                                        <i className="fa fa-sort-alpha-asc pr-5">
                                            
                                        </i>Tên A-Z
                                    </a>
                        </li>
                        <li onClick={()=>this.onClick('name',-1)}>
                            <a role="button" className={(sort.by === 'name' && sort.value === -1 ? "sort_selected" : '')}>
                                        <i className="fa fa-sort-alpha-desc pr-5">
                                            
                                        </i>Tên Z-A
                                    </a>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li onClick={()=>this.onClick('status',1)}><a role="button" className={(sort.by === 'status' && sort.value === 1 ? "sort_selected" : '')}>Trạng Thái Kích Hoạt</a></li>
                        <li onClick={()=>this.onClick('status',-1)}><a role="button" className={(sort.by === 'status' && sort.value === -1 ? "sort_selected" : '')}>Trạng Thái Ẩn</a></li>
                    </ul>
                </div>
          );
    }
  
}

export default Sort;
