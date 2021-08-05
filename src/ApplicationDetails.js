import React from 'react';
import HeaderComponent from './HeaderComponent';
import JobDetailsComponent from './JobDetailsComponent';
import './App.css';
import data from './ApplicationJson.json';
import { Grid } from 'semantic-ui-react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

class ApplicationDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            applicationDatas: data,
            reloading: false,
            filteredRole: [],
            activeTab: 'all',
            positionList: [
                { key: 'frontEndDeveloper', text: 'FrontEnd Developer', value: 'frontEndDeveloper' },
                { key: 'javaDeveloper', text: 'Java Developer', value: 'javaDeveloper' },
                { key: 'reactDeveloper', text: 'React Developer', value: 'reactDeveloper' },
                { key: 'backendDeveloper', text: 'Backend Developer', value: 'backendDeveloper' },
            ],
            selectedPosition: '',
        }
    }

    searchHandler = (e, { value }) => {
        const { applicationDatas } = this.state;
        const appliedCandidates = applicationDatas.appliedCandidates.filter((data) => data.applicantName.toLowerCase().includes(value.toLowerCase()));
        const asessmentTakenCandidates = applicationDatas.asessmentTakenCandidates.filter((data) => data.applicantName.toLowerCase().includes(value.toLowerCase()));
        const interviewClearedCandidates = applicationDatas.interviewClearedCandidates.filter((data) => data.applicantName.toLowerCase().includes(value.toLowerCase()));
        const selectedCandidates = applicationDatas.selectedCandidates.filter((data) => data.applicantName.toLowerCase().includes(value.toLowerCase()));

        if (value !== '') {
            this.setState({
                applicationDatas: {
                    appliedCandidates,
                    asessmentTakenCandidates,
                    interviewClearedCandidates,
                    selectedCandidates,
                },
            })
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
            const appliedCandidates = applicationDatas.appliedCandidates.filter((data) => data.role === selectedPosition);
            const asessmentTakenCandidates = applicationDatas.asessmentTakenCandidates.filter((data) => data.role === selectedPosition);
            const interviewClearedCandidates = applicationDatas.interviewClearedCandidates.filter((data) => data.role === selectedPosition);
            const selectedCandidates = applicationDatas.selectedCandidates.filter((data) => data.role === selectedPosition);
            return {
                appliedCandidates,
                asessmentTakenCandidates,
                interviewClearedCandidates,
                selectedCandidates,
            }
        } return { ...applicationDatas }
    }

    handlePosition = (e, obj) => {
        this.setState({ selectedPosition: obj.value, activeTab: 'position' });
    }

    handleReload = (name) => {
        this.setState({ reloading: true, activeTab: name });

        setTimeout(function () {
            this.setState({ reloading: false });
        }.bind(this), 400);
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

    handleDragEnd = (result) => {
        console.log('result', result);
        const { source, destination } = result;
        let { applicationDatas } = this.state;
        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            const items = this.reorder(
                applicationDatas[source.droppableId],
                source.index,
                destination.index
            );
            // applicationDatas[source.droppableId] = items;
            applicationDatas = { ...applicationDatas, [source.droppableId]: items }
            this.setState({ applicationDatas });
        } else {
            const result = this.move(
                applicationDatas[source.droppableId],
                applicationDatas[destination.droppableId],
                source,
                destination
            );
            applicationDatas = { ...applicationDatas, [source.droppableId]: result[source.droppableId], [destination.droppableId]: result[destination.droppableId] }
            this.setState({ applicationDatas });
        }
    }

    render = () => {
        const { reloading, positionList, selectedPosition, activeTab } = this.state;
        const { appliedCandidates, asessmentTakenCandidates, interviewClearedCandidates, selectedCandidates } = this.filteredCandidates();

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
                <Grid divided='vertically'>
                    <Grid.Row>
                        <DragDropContext onDragEnd={this.handleDragEnd}>
                            <Grid.Column width={4}>
                                <Droppable droppableId="appliedCandidates">
                                    {(provided) => (
                                        <div ref={provided.innerRef}>
                                            <JobDetailsComponent data={appliedCandidates} header="applied candidates" reloading={reloading} />
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Droppable droppableId="asessmentTakenCandidates">
                                    {(provided) => (
                                        <div ref={provided.innerRef}>
                                            <JobDetailsComponent data={asessmentTakenCandidates} header="assessment cleared candidates" reloading={reloading} />
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Droppable droppableId="interviewClearedCandidates">
                                    {(provided) => (
                                        <div ref={provided.innerRef}>
                                            <JobDetailsComponent data={interviewClearedCandidates} header="interview attended candidates" reloading={reloading} />
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Droppable droppableId="selectedCandidates">
                                    {(provided) => (
                                        <div ref={provided.innerRef}>
                                            <JobDetailsComponent data={selectedCandidates} header="selected candidates" reloading={reloading} />
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </Grid.Column>
                        </DragDropContext>
                    </Grid.Row>
                </Grid>
            </div>

        );
    }
}

export default ApplicationDetails;