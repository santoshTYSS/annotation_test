
import './App.css';
import React, { Component, useState } from 'react'
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router,  useNavigate,useLocation } from 'react-router-dom';



// class AppPage extends Component {
//   constructor() {
//     super();
//     this.diffs = {}
//     this.diffs['Argwrite'] = require('./arg_2.json')
//     //this.diffs['Arxiv'] = require('./arxiv_2.json')
//     //this.diffs['NLPeer']= require('./nlpeer_2.json')
//     //this.diffs['Flores'] = require('./flores_2.json')
//     this.datasets = ['Argwrite', 'Arxiv', 'NLPeer','Flores']
//     this.state = {
//       dataset : 'Argwrite',
//       num_docs : Object.keys(this.diffs['Argwrite']).length,
//       buttonPressed: 1,
//     }
//     this.change_dataset_handler = this.change_dataset_handler.bind(this)
//     this.change_page_handler = this.change_page_handler.bind(this)
//   }

//   change_dataset_handler(event) {
//     console.log(event.target)
//     this.setState({
//       dataset: event.target.id,
//       jsonfile: this.diffs[event.target.id],
//       num_docs : Object.keys(this.diffs[event.target.id]).length,
//       buttonPressed: 1,
//     })
//   }

//   change_page_handler(event) {
//     console.log(event.target)
//     this.setState({
//       buttonPressed: event.target.id,
//       groups : [
//         {name:'Spelling Errors', edits:[],summary: ""},
//         {name:'Grammar correction', edits:[], summary: ""}
//   ]
//     })
//     //this.props.history.push(`/annotation/${this.state.dataset}/${event.target.id}`);
//     this.props.history.push('/annotation')
//     console.log(this.props)
//   }


//  render() {
//   return (
//     <div className="App">
//       <div className="main">
//             {this.datasets.map((item,index) => (
//               <button id={item} key = {index} onClick={this.change_dataset_handler} className="datasetbutton">
//               {item}
//               </button>
//             ))
//             }
//            <p>Current : {this.state.dataset}  {parseInt(this.state.buttonPressed)}</p>
//           <Sidebar handler = {this.change_page_handler}  input_docs = {this.state.num_docs}></Sidebar>
//       </div>
//     </div>
//   );
//   }
// }

// export default AppPage



function AppPage() {
  const navigate = useNavigate();
  const diffs = {
     Test: require('./test.json'),
    //Arxiv: require('./arxiv_2.json'),
    //NLPeer: require('./nlpeer_3.json'),
    //Flores: require('./flores_2.json')
  };

 // const datasets = ['Argwrite', 'Arxiv', 'NLPeer', 'Flores'];
  const datasets = ['Test'];
  const location = useLocation();
  const extraParam = location.state?.extraParam;

  const [dataset, setDataset] = useState('Test');
  const [numDocs, setNumDocs] = useState(Object.keys(diffs['Test']).length);
  const [buttonPressed, setButtonPressed] = useState(0);

  const changeDatasetHandler = (event) => {
    const selectedDataset = event.target.id;
    setDataset(selectedDataset);
    setNumDocs(Object.keys(diffs[selectedDataset]).length);
    setButtonPressed(0);
  };

  const changePageHandler = (event) => {
    setButtonPressed(event.target.id);
    // Set your group state or other necessary state updates here
    //const encodedArray = encodeURIComponent(JSON.stringify(docsPressed));
    navigate(`/annotation/${dataset}/${event.target.id}`);
  };

  return (
    <div className="App">
      <div className="main">
        {datasets.map((item, index) => (
          <button id={item} key={index} onClick={changeDatasetHandler} className="datasetbutton">
            {item}
          </button>
        ))}
         <Sidebar handler={changePageHandler} input_docs={numDocs} />
      </div>
    </div>
  );
}

export default AppPage;

