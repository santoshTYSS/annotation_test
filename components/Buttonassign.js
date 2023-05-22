import React, { Component } from 'react'
import Collapsible from 'react-collapsible';
import CircularJSON from 'circular-json';
import { BsChevronDown } from "react-icons/bs";

export class Buttonassign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked : Array(props.groups.length).fill(false)
    } 
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }


  componentDidMount() {
    const { defaultChecked } = this.props;
    if (defaultChecked && defaultChecked.length > 0) {
      this.setState({ isChecked: defaultChecked });
      
      defaultChecked.forEach((isChecked, index) => {
        if (isChecked) {
          const {groups} = this.props;
          console.log("call to edit handler")
          console.log(this.props.text, index, groups)
          this.props.add_edit_handler(this.props.text, index, 1);
        }
      });
    }
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.button !== this.props.button) {
  //     this.setState({ isChecked : Array(this.props.groups.length).fill(false) });
  //   }
  // }

  handleCheckboxChange(event) {
    const { value, dataset } = event.target;
    const { id } = dataset;
  
    this.setState((prevState) => {
      const newChecked = [...prevState.isChecked];
      newChecked[parseInt(value)] = !prevState.isChecked[parseInt(value)];
      return { isChecked: newChecked };
    }, () => {
      const { isChecked } = this.state;
      const checkedValue = isChecked[parseInt(value)] ? 1 : 0;
      console.log(id, value)
      this.props.add_edit_handler(id, value, checkedValue);
    });
  }
  


  render() {
    const { isChecked } = this.state;
    const isAnyChecked = isChecked.some((value) => value);
    const collapseClassName = isAnyChecked ? 'oneSelect' : 'collapse';

    return (
      <div className={collapseClassName}>
            <Collapsible trigger={["Assign to Group", <BsChevronDown />]}>
            {  this.props.groups.map((x, i) => 
                    <label className="indented-checkbox-text" key={i} >
                    <input type="checkbox" value={i} data-id={this.props.text} checked={this.state.isChecked[i]} onChange={this.handleCheckboxChange}/> {x.name}
                    </label>)
            }
                   <button className='addbutton'
                   onClick={this.props.add_group_handler}> Add New Group</button>
            
            </Collapsible>

        </div>
      
    )
  }
}

export default Buttonassign