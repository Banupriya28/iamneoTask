/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import { Container } from 'semantic-ui-react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import JobDetailsComponent from './JobDetailsComponent';
import HeaderComponent from './HeaderComponent';
import data from './ApplicationJson.json';
import './App.css';

class ApplicationDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      applicationDatas: data,
      reloading: false,
      activeTab: 'all',
      positionList: [
        { key: 'frontEndDeveloper', text: 'FrontEnd Developer', value: 'frontEndDeveloper' },
        { key: 'javaDeveloper', text: 'Java Developer', value: 'javaDeveloper' },
        { key: 'reactDeveloper', text: 'React Developer', value: 'reactDeveloper' },
        { key: 'backendDeveloper', text: 'Backend Developer', value: 'backendDeveloper' },
      ],
      selectedPosition: '',
      headerList: [
        { id: 'appliedCandidates', text: 'applied candidates', columnId: 'appliedCandidatesColumn' },
        { id: 'asessmentTakenCandidates', text: 'assessment cleared candidates', columnId: 'asessmentTakenCandidatesColumn' },
        { id: 'interviewClearedCandidates', text: 'interview attended candidates', columnId: 'interviewClearedCandidatesColumn' },
        { id: 'selectedCandidates', text: 'selected candidates', columnId: 'selectedCandidatesColumn' },
      ],
    };
  }

    searchHandler = (e, { value }) => {
      const { applicationDatas } = this.state;
      const appliedCandidates = applicationDatas.appliedCandidates.filter(
        (datas) => datas.applicantName.toLowerCase().includes(value.toLowerCase()),
      );
      const asessmentTakenCandidates = applicationDatas.asessmentTakenCandidates.filter(
        (datas) => datas.applicantName.toLowerCase().includes(value.toLowerCase()),
      );
      const interviewClearedCandidates = applicationDatas.interviewClearedCandidates.filter(
        (datas) => datas.applicantName.toLowerCase().includes(value.toLowerCase()),
      );
      const selectedCandidates = applicationDatas.selectedCandidates.filter(
        (datas) => datas.applicantName.toLowerCase().includes(value.toLowerCase()),
      );
      if (value !== '') {
        this.setState({
          applicationDatas: {
            appliedCandidates,
            asessmentTakenCandidates,
            interviewClearedCandidates,
            selectedCandidates,
          },
        });
      } else {
        this.setState({ applicationDatas: data });
      }
    }

    handleJob = (name) => {
      this.setState({ activeTab: name, selectedPosition: '' });
    }

    filteredCandidates = () => {
      const { applicationDatas, selectedPosition } = this.state;
      if (selectedPosition) {
        const appliedCandidates = applicationDatas.appliedCandidates.filter(
          (datas) => datas.role === selectedPosition,
        );
        const asessmentTakenCandidates = applicationDatas.asessmentTakenCandidates.filter(
          (datas) => datas.role === selectedPosition,
        );
        const interviewClearedCandidates = applicationDatas.interviewClearedCandidates.filter(
          (datas) => datas.role === selectedPosition,
        );
        const selectedCandidates = applicationDatas.selectedCandidates.filter(
          (datas) => datas.role === selectedPosition,
        );
        return {
          appliedCandidates,
          asessmentTakenCandidates,
          interviewClearedCandidates,
          selectedCandidates,
        };
      } return { ...applicationDatas };
    }

    handlePosition = (e, obj) => {
      this.setState({ selectedPosition: obj.value, activeTab: 'position' });
    }

    handleReload = (name) => {
      this.setState({ reloading: true, activeTab: name });
      setTimeout(() => {
        this.setState({ reloading: false });
      }, 400);
    }

    reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    };

    move = (source, destination, droppableSource, droppableDestination) => {
      const sourceClone = Array.from(source);
      const destClone = Array.from(destination);
      const [removed] = sourceClone.splice(droppableSource.index, 1);

      destClone.splice(droppableDestination.index, 0, removed);

      const result = {};
      result[droppableSource.droppableId] = sourceClone;
      result[droppableDestination.droppableId] = destClone;

      return result;
    };

    handleHorizontalDragging =(result) => {
      console.log('result horizontal', result);
      const { source, destination } = result;
      let { headerList } = this.state;
      if (!destination) {
        return;
      }
      headerList = this.reorder(
        headerList,
        source.index,
        destination.index,
      );

      this.setState({ headerList });
    }

    handleVerticalDragging =(result) => {
      const { source, destination } = result;
      let { applicationDatas } = this.state;
      console.log('result vertical', result);
      if (!destination) {
        return;
      }
      if (source.droppableId === destination.droppableId) {
        const items = this.reorder(
          applicationDatas[source.droppableId],
          source.index,
          destination.index,
        );
        applicationDatas = { ...applicationDatas, [source.droppableId]: items };
        this.setState({ applicationDatas });
      } else {
        const results = this.move(
          applicationDatas[source.droppableId],
          applicationDatas[destination.droppableId],
          source,
          destination,
        );
        applicationDatas = {
          ...applicationDatas,
          [source.droppableId]: results[source.droppableId],
          [destination.droppableId]: results[destination.droppableId],
        };
        this.setState({ applicationDatas });
      }
    }

    handleDragEnd = (result) => {
      const { type } = result;
      console.log('result', type);
      if (type === 'COLUMN') {
        this.handleHorizontalDragging(result);
      } else if (type === 'ROW') {
        this.handleVerticalDragging(result);
      }
    }

    render = () => {
      const {
        reloading, positionList, selectedPosition, activeTab, headerList,
      } = this.state;
      const filteredList = this.filteredCandidates();

      return (
        <div className="parentContainer">
          <HeaderComponent
            handleReload={this.handleReload}
            positionList={positionList}
            selectedPosition={selectedPosition}
            handlePosition={this.handlePosition}
            handleJob={this.handleJob}
            searchHandler={this.searchHandler}
            activeTab={activeTab}
          />
          <DragDropContext onDragEnd={this.handleDragEnd}>
            <Droppable droppableId="columns" type="COLUMN" direction="horizontal">
              {(columnProvided) => (
                <div
                  ref={columnProvided.innerRef}
                  {...columnProvided.droppableProps}
                  className="droppableContainer"
                >
                  {headerList.map((header, index) => (
                    <Draggable
                      draggableId={header.columnId}
                      index={index}
                      key={header.columnId}
                    >
                      {(rowProvided) => (
                        <div
                          key={header.id}
                          {...rowProvided.draggableProps}
                          ref={rowProvided.innerRef}
                          className="draggableColumn"
                        >
                          <div className="headerContent" {...rowProvided.dragHandleProps}>
                            {`${header.text} (${filteredList[header.id] ? filteredList[header.id].length : ''}) `}
                          </div>
                          <Droppable droppableId={header.id} type="ROW">
                            {(provided) => (
                              <div ref={provided.innerRef}>
                                <JobDetailsComponent
                                  data={filteredList[header.id]}
                                  reloading={reloading}
                                />
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                          {columnProvided.placeholder}
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      );
    }
}

export default ApplicationDetails;
