import React, { Component } from 'react';

export class Rightpane extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.groups !== this.props.groups) {
      console.log("Groups updated:", this.props.groups);
    }
  }

  render() {
    return (
      <div>
        <p> {this.props.doneEdits} edits assigned out of {this.props.totalEdits}</p>
        {this.props.groups.map((x, i) => (
          <div key={i}>
            <div className="groupname">
              <input
                className="inputbox"
                name={i}
                type="text"
                value={x.name}
                onChange={this.props.name_edit_handler}
              />
            </div>
            {x.edits.map((z, j) => (
              <div className="editdiv" key={j}>
                <p className="editdisplay">
                  <div dangerouslySetInnerHTML={{ __html: z }}></div>
                </p>
              </div>
            ))}
            <p className="summary-ask">Please provide a summary of the above group</p>
            <textarea
              id={i}
              rows={4}
              onChange={this.props.update_summary_handler}
              className="summary"
            />
            <div>
              <br />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Rightpane;
