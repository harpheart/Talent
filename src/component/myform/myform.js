import React from 'react';

export function myform(Comp) {
    return class WrapperComp extends React.Component
    {
        constructor(props) {
            super(props);
            this.state={

            }
            this.handleChange=this.handleChange.bind(this)
        }
        handleChange(key,value)
     {
     
       this.setState({
           [key]:value
       })  
     }
        render(){
            return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
        }
    }
    
}