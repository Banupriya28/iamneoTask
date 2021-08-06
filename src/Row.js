/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Scrollbars } from 'react-custom-scrollbars';
import { Placeholder } from 'semantic-ui-react';

class JobDetailsComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      holderLength: [1, 2, 3, 4, 5, 6],
    };
  }

    render = () => {
      const { holderLength } = this.state;
      const {
        reloading, data, reference, rowProvided,
      } = this.props;
      return (
        <div ref={reference}>
          <Scrollbars style={{ height: 575 }}>
            {!reloading
              ? data && data.map((item, index) => (
                <Draggable key={item.applicantId} draggableId={item.applicantId} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="cardContainer"
                      key={index + 1}
                    >
                      <div className="idStyles">
                        {item.applicantId}
                        {' '}
                        <span className="applicationBtn">View Application</span>
                      </div>
                      <div className="orderStyles">
                        Applicant Name :
                        {item.applicantName}
                      </div>
                      <div className="divStyles">
                        Position :
                        {item.position}
                      </div>
                      <div className="divStyles">
                        {item.experience !== 0 && (
                        <>
                          {' '}
                          Experience :
                          {item.experience}
                        </>
                        )}
                      </div>
                      <div className="dateStyles">
                        Applied Date :
                        {item.appliedDate}
                      </div>
                      <div className="dateStyles">
                        Assessment Date :
                        {item.appliedDate}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))
              : holderLength.map((a) => (
                <div className="cardContainer borderStyles" key={a}>
                  <Placeholder>
                    <Placeholder.Header image>
                      <Placeholder.Line />
                      <Placeholder.Line />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                      <Placeholder.Line length="medium" />
                      <Placeholder.Line length="short" />
                    </Placeholder.Paragraph>
                  </Placeholder>
                </div>
              ))}
          </Scrollbars>
          {rowProvided.placeholder}
        </div>
      );
    }
}

export default JobDetailsComponent;
