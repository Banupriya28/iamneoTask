import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Row from './Row';

function RowContainer(props) {
  const { header, filteredList, reloading } = props;
  return (
    <Droppable droppableId={header.id} type="ROW">
      {(rowProvided) => (
        <Row
          data={filteredList[header.id]}
          reloading={reloading}
          reference={rowProvided.innerRef}
          rowProvided={rowProvided}
        />
      )}
    </Droppable>
  );
}

export default RowContainer;
