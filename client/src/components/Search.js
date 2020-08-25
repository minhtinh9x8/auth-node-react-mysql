import React, { Component } from 'react';

class Search extends Component {

    constructor(props){
        super(props);
        this.state = {
            keyword : ''
        }
    }

    onChange = (event)=>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name] : value
        });
    }
    
    onSearch = () =>{
        this.props.onSearch(this.state.keyword);
    }

    render(){
        
        
        return (
            <div className="input-group">
                <input type="text" className="form-control he" placeholder="Nhập từ khóa..." name="keyword" value={this.state.keyword} onChange={this.onChange} />
                <div className="input-group-btn">
                            <button className="btn btn-primary" type="button" onClick={this.onSearch}>
                                <i className="fa fa-search mr-5"></i>Tìm
                </button>
                </div>
            </div>
          );
    }
  
}

export default Search;
