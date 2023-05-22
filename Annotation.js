
// import './App.css';
// import Leftpane from './components/Leftpane';
// import Rightpane from './components/Rightpane';
// import React, { Component } from 'react'
// import Sidebar from './components/Sidebar';
// import { v4 as uuidv4 } from 'uuid';
// import { saveAs } from 'file-saver';
// import CircularJSON from 'circular-json';


// class Annotation extends Component {
//   constructor() {
//     super();
//     //console.log(this.props)
//     //const { match } = this.props;
//     const { dataset, buttonPressed } = this.props.match.params;

//     this.diffs = {}
//     this.diffs['Argwrite'] = require('./arg_2.json')
//     //this.diffs['Arxiv'] = require('./arxiv_2.json')
//     //this.diffs['NLPeer']= require('./nlpeer_2.json')
//     //this.diffs['Flores'] = require('./flores_2.json')
//     this.datasets = ['Argwrite', 'Arxiv', 'NLPeer','Flores']
//     this.state = {
//       dataset : dataset,
//       jsonfile : this.diffs[dataset],
//       num_docs : Object.keys(this.diffs[dataset]).length,
//       buttonPressed: buttonPressed,
//       groups : [
//                     {name:'Spelling Errors', edits:[], summary: ""},
//                     {name:'Grammar correction', edits:[], summary: ""}
//               ],
//       sessionId : uuidv4()
//     }
//     this.group_name_edit_handler = this.group_name_edit_handler.bind(this)
//     this.group_name_add_handler = this.group_name_add_handler.bind(this)
//     this.add_edit_to_group_handler = this.add_edit_to_group_handler.bind(this)
//     this.save_data_handler = this.save_data_handler.bind(this)
//     this.update_summary_handler = this.update_summary_handler.bind(this)
//   }

//   group_name_edit_handler(event) {
//      let groups = [...this.state.groups];
//      let item = {...groups[parseInt(event.target.name)]};
//      item.name = event.target.value;
//      groups[parseInt(event.target.name)] = item
//      this.setState({groups: groups});  
//   }

//   update_summary_handler(event) {
//      let groups = [...this.state.groups];
//      let item = {...groups[parseInt(event.target.id)]};
//      item.summary = event.target.value;
//      groups[parseInt(event.target.id)] = item
//      this.setState({groups: groups}); 
//  }

//   group_name_add_handler(event) {
//     let newelement = {name:"", edits:[],summary:""};
//     this.setState({ 
//       groups: this.state.groups.concat([newelement])
//     })
//   }

//   save_data_handler(event){
//     const data = JSON.stringify(this.state, null, 2);
//     const blob = new Blob([data], { type: 'application/json' });
//     saveAs(blob, this.state.sessionId+'_'+parseInt(this.state.buttonPressed)+'.json');
//   }

//   add_edit_to_group_handler(edit, group_id, operation) {
//     if(operation === 0){
//       let groups = [...this.state.groups];
//       let item = {...groups[parseInt(group_id)]};
//       item.edits.push(edit) 
//       groups[parseInt(group_id)] = item
//       this.setState({groups: groups});  
//     }
//     else if(operation ===1){
//       let groups = [...this.state.groups];
//       let item = {...groups[parseInt(group_id)]};
//       let index = item.edits.indexOf(edit);
//       if (index > -1) { 
//         item.edits.splice(index, 1); 
//       }
//       groups[parseInt(group_id)] = item
//       this.setState({groups: groups});  
//     }
//   }

 
//  render() {
//   return (
//     <div className="App">
//       <div className='top'>
//       <div className="split left">
//           <Leftpane input_diff={this.state.jsonfile[this.state.buttonPressed-1]} groups={this.state.groups}
//                                                               button ={this.state.buttonPressed}
//                                                               add_edit_to_group_handler = {this.add_edit_to_group_handler}  
//                                                               add_group_handler={this.group_name_add_handler}     
//           ></Leftpane> 
//       </div>
//       <div className="split right">
//          <Rightpane groups={this.state.groups} name_edit_handler={this.group_name_edit_handler} 
//                                                update_summary_handler={this.update_summary_handler}></Rightpane>
//      </div>
//      </div>
//      <div className ='footer'>
//      <button className='submitbutton' onClick={this.save_data_handler}
//               >Submit</button>
//      </div>
//     </div>
//   );
//   }
// }

// export default Annotation




import React, { useState, useEffect } from 'react';
import Leftpane from './components/Leftpane';
import Rightpane from './components/Rightpane';
import { v4 as uuidv4 } from 'uuid';
import { saveAs } from 'file-saver';
import { useParams,useNavigate } from 'react-router-dom';
import { BsChevronDoubleLeft } from 'react-icons/bs';

function Annotation() {
    const { param1, param2 } = useParams();
    const dataset = param1;
    const buttonPressed = param2;
    const navigate = useNavigate();
  const diffs = {
      'Test': require('./test.json'),
  };

  const [sessionId] = useState(uuidv4());
  const [numDocs, setNumDocs] = useState(0);
  const [totalEdits, setTotalEdits] = useState(0);
  const [groups, setGroups] = useState([]);
  const [doneEdits, setDoneEdits] = useState(0);
  const [useEffectCompleted, setUseEffectCompleted] = useState(false);
  
  useEffect(() => {
    const jsonfile = diffs[dataset];
    const numDocs = Object.keys(jsonfile).length;
  
    // Update the state with the initial values
    setNumDocs(numDocs);
  }, [dataset, buttonPressed]);
  
  useEffect(() => {
    const initialGroups = [
      { name: 'Surface Edits', edits: [], summary: '' }
    ];

    //setGroups(initialGroups);
    console.log(initialGroups)
    //Update the state with the initial groups or the current state value
    setGroups(prevGroups => {
      if (prevGroups.length === 0) {
        setUseEffectCompleted(true);
        return initialGroups;
      } else {
        return prevGroups;
      }
    });
  }, [buttonPressed]);

  const updateTotalEdits = (value) => {
    setTotalEdits(value);
  };
  
  const group_name_edit_handler = (event) => {
    const { name, value } = event.target;
    const updatedGroups = groups.map((group, index) =>
      parseInt(name) === index ? { ...group, name: value } : group
    );
    setGroups(updatedGroups);
  };

  const update_summary_handler = (event) => {
    const { id, value } = event.target;
    const updatedGroups = groups.map((group, index) =>
      parseInt(id) === index ? { ...group, summary: value } : group
    );
    setGroups(updatedGroups);
  };

  const group_name_add_handler = () => {
    const newElement = { name: '', edits: [], summary: '' };
    setGroups([...groups, newElement]);
  };

  
  const save_data_handler = () => {
    const data = JSON.stringify({ dataset, buttonPressed, groups, sessionId }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const filename = `${parseInt(buttonPressed)}_${sessionId}_.json`;
  
    saveAs(blob, filename);
  
    setTimeout(() => {
      alert("Please submit the downloaded file via Upwork.");
      navigate('/');
    }, 100);
  };

  const add_edit_to_group_handler = (edit, groupId, operation) => {
    setGroups((prevGroups) => {
      const updatedGroups = prevGroups.map((group, index) => {
        if (index === parseInt(groupId)) {
          if (operation === 1 && group.edits.indexOf(edit) === -1) {
            return { ...group, edits: [...group.edits, edit] };
          } else if (operation === 0) {
            const updatedEdits = group.edits.filter((item) => item !== edit);
            return { ...group, edits: updatedEdits };
          }
        }
        return group;
      });
      console.log(updatedGroups);
      return updatedGroups;
    });
  };

  useEffect(() => {
      const uniqueItems = new Set();
      groups.forEach((group) => {
      group.edits.forEach((edit) => {
        uniqueItems.add(edit);
      });
    });
    setDoneEdits(uniqueItems.size);
    
  }, [groups]);
 
  if (useEffectCompleted) {
  return (
    
    <div className="App">
      <div className="top">
        <div className="split left">
          <Leftpane
            input_diff={diffs[dataset][buttonPressed-1]}
            groups={groups}
            button={buttonPressed}
            add_edit_to_group_handler={add_edit_to_group_handler}
            add_group_handler={group_name_add_handler}
            updateTotalEdits={updateTotalEdits} 
          />
        </div>
        <div className="split right">
          <Rightpane 
            groups={groups}
            doneEdits = {doneEdits}
            totalEdits = {totalEdits}
            name_edit_handler={group_name_edit_handler}
            update_summary_handler={update_summary_handler}
          />
        </div>
      </div>
      <div className="footer">
        <button className="submitbutton" onClick={save_data_handler}>
          Submit
        </button>
     </div>
    </div>
  );}
  }

export default Annotation

