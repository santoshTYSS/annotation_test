import React, { Component } from 'react'

export class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          buttonCount: Array.from({length: this.props.input_docs}, (_, i) => i + 1)
        }     
      }
  
    componentDidUpdate(prevProps) {
        if (prevProps.input_docs !== this.props.input_docs) {
          this.setState({ buttonCount: Array.from({length: this.props.input_docs}, (_, i) => i + 1) });
        }
      }
      
  render() {
    return (
        <div>
         {this.state.buttonCount.map((item,index) => (
        <button id={item} key = {index} onClick={this.props.handler} className=
        "pagebutton">
         {item}
        </button>
      ))
      }
       
        </div>
    )
  }
}

export default Sidebar