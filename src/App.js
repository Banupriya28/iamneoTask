import React from 'react';
import HeaderComponent from './HeaderComponent';
import JobDetailsComponent from './JobDetailsComponent';
import './App.css';
import data from './ApplicationJson.json';
import 'semantic-ui-css/semantic.min.css';
import { Grid } from 'semantic-ui-react';

class App extends React.Component {
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
    this.setState({ reloading: true, activeTab: name, selectedPosition: '' });

    setTimeout(function () {
      this.setState({ reloading: false });
    }.bind(this), 3000);
  }

  handlePosition = (e, obj) => {
    const { applicationDatas } = this.state;
    const appliedCandidates = data.appliedCandidates.filter((data) => data.role === obj.value);
    const asessmentTakenCandidates = data.asessmentTakenCandidates.filter((data) => data.role === obj.value);
    const interviewClearedCandidates = data.interviewClearedCandidates.filter((data) => data.role === obj.value);
    const selectedCandidates = data.selectedCandidates.filter((data) => data.role === obj.value);
    this.setState({
      selectedPosition: obj.value, activeTab: 'position', applicationDatas: {
        appliedCandidates,
        asessmentTakenCandidates,
        interviewClearedCandidates,
        selectedCandidates,
      }
    });
  }

  handleReload = (name) => {
    this.setState({ reloading: true, activeTab: name });

    setTimeout(function () {
      this.setState({ reloading: false });
    }.bind(this), 3000);
  }
  render = () => {
    const { reloading, applicationDatas, positionList, selectedPosition, activeTab } = this.state;
    const { appliedCandidates, asessmentTakenCandidates, interviewClearedCandidates, selectedCandidates } = applicationDatas;
    return (
      <div className="parentContainer">
        {window.innerWidth > 1000 ?
          <>
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
                <Grid.Column width={4}>
                  <JobDetailsComponent data={appliedCandidates} header="applied candidates" reloading={reloading} />
                </Grid.Column>
                <Grid.Column width={4}>
                  <JobDetailsComponent data={asessmentTakenCandidates} header="assessment cleared candidates" reloading={reloading} />
                </Grid.Column>
                <Grid.Column width={4}>
                  <JobDetailsComponent data={interviewClearedCandidates} header="interview attended candidates" reloading={reloading} />
                </Grid.Column>
                <Grid.Column width={4}>
                  <JobDetailsComponent data={selectedCandidates} header="selected candidates" reloading={reloading} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </> :
          <>
            <Grid>
              <Grid.Row><JobDetailsComponent data={appliedCandidates} header="applied candidates" reloading={reloading} /></Grid.Row>
              <Grid.Row><JobDetailsComponent data={asessmentTakenCandidates} header="assessment cleared candidates" reloading={reloading} /></Grid.Row>
              <Grid.Row><JobDetailsComponent data={interviewClearedCandidates} header="interview attended candidates" reloading={reloading} /></Grid.Row>
              <Grid.Row><JobDetailsComponent data={selectedCandidates} header="selected candidates" reloading={reloading} /></Grid.Row>
            </Grid>
          </>}
      </div>

    );
  }
}

export default App;
