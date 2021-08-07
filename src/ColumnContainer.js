/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Column from './Column';

function ColumnContainer(props) {
  const { headerList, filteredList, reloading } = props;
  const getheaders = (columnProvided) => headerList.map((header, index) => (
    <Column
      header={header}
      filteredList={filteredList}
      columnProvided={columnProvided}
      key={header.id}
      reloading={reloading}
      index={index}
    />
  ));
  return (
    <Droppable droppableId="columns" type="COLUMN" direction="horizontal">
      {(columnProvided) => (
        <div
          ref={columnProvided.innerRef}
          {...columnProvided.droppableProps}
          className="droppableContainer"
        >
          {useMemo(() => getheaders(columnProvided), [headerList, columnProvided])}
        </div>
      )}
    </Droppable>
  );
}

export default React.memo(ColumnContainer);
