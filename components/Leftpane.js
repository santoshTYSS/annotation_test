

// function Add (input, tag, attribute=null, groups=null, id=null, add_edit_to_group_handler=null,button=null){
//     if(tag === 'div' & attribute == null){
//        return <div> {input} </div>
//     }
//     else if(tag==='p' & attribute==null){
//         return <p> {input} </p>
//     }
//     else if(tag==='div' & attribute != null){
//         return <div className ={attribute}>{input} <Buttonassign groups={groups} text={id} add_edit_handler={add_edit_to_group_handler} button={button} defaultChecked={defaultChecked}></Buttonassign> </div> 
//     }
//     else if(tag==='p' & attribute != null){
//         return <p className ={attribute}>{input}</p>
//     }

// }





        // if(diff[i].length === 1){
        //     if(diff[i][0][0] === ' '){
        //         display.push(Add(Add(diff[i][0].trim(), "p"),"div"))
        //     }
        //     else if (diff[i][0][0]==='-'){
        //         display.push(Add(Add(diff[i][0].replace(/^\-/, '').trimStart(), "p","delete"),"div","changed",groups, [diff[i][0]],add_edit_to_group_handler, button))
        //     }
        //     else if(diff[i][0][0]==='+'){
        //         display.push(Add(Add(diff[i][0].replace(/^\+/, '').trimStart(), "p","add"),"div","changed",groups, [diff[i][0]],add_edit_to_group_handler, button))
        //     }
        // }
        // else if(diff[i].length >1){
        //     var curr_buffer = []
        //     if(diff[i][0][0] === '+'){      
        //         curr_buffer.push(Add(String(diff[i][0]).replace(/^\+/, '').trimStart(), "p","add"))
        //         curr_buffer.push(Add(String(diff[i][1]).replace(/^\-/, '').trimStart(), "p","delete"))
        //         display.push(Add(curr_buffer,"div","changed",groups, [diff[i][0], diff[i][1]],add_edit_to_group_handler, button))
        //     }
        //     else{
        //         curr_buffer.push(Add(String(diff[i][0]).replace(/^\-/, '').trimStart(), "p","delete"))
        //         curr_buffer.push(Add(String(diff[i][1]).replace(/^\+/, '').trimStart(), "p","add"))
        //         display.push(Add(curr_buffer,"div","changed",groups, [diff[i][0], diff[i][1]],add_edit_to_group_handler,button))
        //     }
        //     }
        // }

import React, { Component } from 'react'
import Buttonassign from './Buttonassign'


function prepare_tag(input, mode){
    if(mode=== 0)
        return  <div className='unchanged'>{input} </div>
    else if(mode === 1)
        return <add>{input}</add>
    else if(mode === -1)
        return <del>{input}</del>
    else if(mode === -2)
        return <punc>{input}</punc>
}

function process_jsx(input) {
    var errorType = input[1]
    var i = 2;
    var cur_input = []
    var input_string = []
    var mode = 0;
    while(i < input.length-1){
        if(input[i]=='<add>')
            mode = 1;
        else if (input[i]=='<del>')
            mode = -1;
        else  if(input[i] =='</add>')
            mode =0;
        else if(input[i]=='</del>')
            mode = 0;
        else if(input[i]=='<punc>')
            mode= -2;
        else if(input[i]=='</punc>')
            mode = 0;
        else
            cur_input.push(prepare_tag(input[i],mode));
            input_string.push(input[i])

        i+=1

    }
    return [cur_input, input_string.join(' '), errorType]
        
}

function proces_normal(input){
    return <div>{input}</div>
}

function DisplayDiff(diff, groups, add_edit_to_group_handler, button, add_group_handler) {
    var display = [];
    var totalEdits = 0;
    for (let i = 0; i < diff.length; i++) {
        var cur_input = []
        for(let j=0; j<diff[i].length;j++){
            if(diff[i][j].length==1){
                cur_input.push(proces_normal(diff[i][j]))
            }
            else{
                var [out, output_string, errorType] = process_jsx(diff[i][j])

                const defaultChecked = [];

                if (errorType === 0) {
                    defaultChecked.push(true);
                } else{
                    defaultChecked.push(false);
                }
                totalEdits += 1
                cur_input.push( <edit>{out} <Buttonassign groups={groups} text={output_string} add_edit_handler={add_edit_to_group_handler} add_group_handler={add_group_handler} button={button} defaultChecked={defaultChecked}></Buttonassign></edit>)
            }

        }
        //display.push(<p className="description"><div dangerouslySetInnerHTML={{ __html: cur_input.join(' ') }} /> </p>)
        
        display.push(  
            <p className="description">
            {cur_input.map((jsxElement, index) => (
              <React.Fragment key={index}>
                {jsxElement}
              </React.Fragment>
            ))}
          </p>)
        
    }
    return [display, totalEdits]
  }


export class Leftpane extends Component {
    componentDidMount() {
        const { input_diff, groups, add_edit_to_group_handler, button, add_group_handler, updateTotalEdits } = this.props;
        const [input, totalEdits] = DisplayDiff(input_diff, groups, add_edit_to_group_handler, button, add_group_handler);
        updateTotalEdits(totalEdits);
      }

  render() {
    const { input_diff, groups, add_edit_to_group_handler, button, add_group_handler, updateTotalEdits } = this.props;
    const [input, totalEdits] = DisplayDiff(input_diff, groups, add_edit_to_group_handler, button, add_group_handler);
        
    return (
        <div align="left">
         {input} 
        </div>
    )
  }
}

export default Leftpane