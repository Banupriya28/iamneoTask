/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import RowContainer from './RowContainer';

function Column(props) {
  const {
    header, filteredList, index, reloading, columnProvided,
  } = props;
  return (
    <Draggable
      draggableId={header.columnId}
      index={index}
      key={header.columnId}
    >
      {(provided) => (
        <div
          key={header.id}
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="draggableColumn"
        >
          <div className="headerContent" {...provided.dragHandleProps}>
            {`${header.text} (${filteredList[header.id] ? filteredList[header.id].length : ''}) `}
          </div>
          <RowContainer header={header} filteredList={filteredList} reloading={reloading} />
          {columnProvided.placeholder}
        </div>
      )}
    </Draggable>
  );
}

export default Column;
