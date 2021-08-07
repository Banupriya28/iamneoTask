/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo, useState, useCallback } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import HeaderComponent from './HeaderComponent';
import data from './ApplicationJson.json';
import './App.css';
import ColumnContainer from './ColumnContainer';

function ApplicationDetails() {
  const [applicationDatas, setApplicationDatas] = useState(data);
  const [reloading, setReloading] = useState(false);
  const [activeTab, setActivetab] = useState('all');
  const positionList = useMemo(() => [
    { key: 'frontEndDeveloper', text: 'FrontEnd Developer', value: 'frontEndDeveloper' },
    { key: 'javaDeveloper', text: 'Java Developer', value: 'javaDeveloper' },
    { key: 'reactDeveloper', text: 'React Developer', value: 'reactDeveloper' },
    { key: 'backendDeveloper', text: 'Backend Developer', value: 'backendDeveloper' },
  ], []);
  const [selectedPosition, setSelectedPosition] = useState('');
  const [headerList, setHeaderList] = useState([
    { id: 'appliedCandidates', text: 'applied candidates', columnId: 'appliedCandidatesColumn' },
    { id: 'asessmentTakenCandidates', text: 'assessment cleared candidates', columnId: 'asessmentTakenCandidatesColumn' },
    { id: 'interviewClearedCandidates', text: 'interview attended candidates', columnId: 'interviewClearedCandidatesColumn' },
    { id: 'selectedCandidates', text: 'selected candidates', columnId: 'selectedCandidatesColumn' },
  ]);
  const [searchText, setSearchText] = useState('');

  const searchHandler = useCallback((value) => {
    setSearchText(value);
  }, []);

  const searchFilter = (searchList) => {
    if (searchText) {
      const appliedCandidates = searchList.appliedCandidates.filter(
        (datas) => datas.applicantName.toLowerCase().includes(searchText.toLowerCase()),
      );
      const asessmentTakenCandidates = searchList.asessmentTakenCandidates.filter(
        (datas) => datas.applicantName.toLowerCase().includes(searchText.toLowerCase()),
      );
      const interviewClearedCandidates = searchList.interviewClearedCandidates.filter(
        (datas) => datas.applicantName.toLowerCase().includes(searchText.toLowerCase()),
      );
      const selectedCandidates = searchList.selectedCandidates.filter(
        (datas) => datas.applicantName.toLowerCase().includes(searchText.toLowerCase()),
      );
      return {
        appliedCandidates,
        asessmentTakenCandidates,
        interviewClearedCandidates,
        selectedCandidates,
      };
    }
    return { ...searchList };
  };

  const handleJob = useCallback((name) => {
    setActivetab(name);
    setSelectedPosition('');
  }, []);

  const filteredCandidates = () => {
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
    }
    return { ...applicationDatas };
  };

  const handlePosition = useCallback((e, obj) => {
    setSelectedPosition(obj.value);
    setActivetab('position');
  }, []);

  const handleReload = useCallback((name) => {
    setReloading(true);
    setActivetab(name);
    setTimeout(() => {
      setReloading(false);
    }, 400);
  }, []);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
  };

  const handleHorizontalDragging = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    const draggingList = reorder(
      headerList,
      source.index,
      destination.index,
    );
    setHeaderList(draggingList);
  };

  const handleVerticalDragging = (result) => {
    const { source, destination } = result;
    let draggingdata = {};
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        applicationDatas[source.droppableId],
        source.index,
        destination.index,
      );
      draggingdata = { ...applicationDatas, [source.droppableId]: items };
    } else {
      const results = move(
        applicationDatas[source.droppableId],
        applicationDatas[destination.droppableId],
        source,
        destination,
      );
      draggingdata = {
        ...applicationDatas,
        [source.droppableId]: results[source.droppableId],
        [destination.droppableId]: results[destination.droppableId],
      };
    }
    setApplicationDatas(draggingdata);
  };

  const handleDragEnd = (result) => {
    const { type } = result;
    if (type === 'COLUMN') {
      handleHorizontalDragging(result);
    } else if (type === 'ROW') {
      handleVerticalDragging(result);
    }
  };

  let filteredList = useMemo(filteredCandidates, [selectedPosition, applicationDatas]);
  filteredList = useMemo(() => searchFilter(filteredList), [searchText, filteredList]);
  return (
    <div className="parentContainer">
      <HeaderComponent
        handleReload={handleReload}
        positionList={positionList}
        selectedPosition={selectedPosition}
        handlePosition={handlePosition}
        handleJob={handleJob}
        searchHandler={searchHandler}
        activeTab={activeTab}
      />
      <DragDropContext onDragEnd={handleDragEnd}>
        <ColumnContainer
          headerList={headerList}
          filteredList={filteredList}
          reloading={reloading}
        />
      </DragDropContext>
    </div>
  );
}

export default ApplicationDetails;
