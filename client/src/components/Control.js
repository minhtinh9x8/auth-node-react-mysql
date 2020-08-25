import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';

class Control extends Component {

    
    render(){
        
        
        return (
                <div className="row mt-15">
            
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <Search onSearch={this.props.onSearch} />
                    </div>
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 ml">
                        <Sort onSort={this.props.onSort} />
                        
                    </div>
                </div>
          );
    }
  
}

export default Control;
