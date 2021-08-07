import React, { useCallback } from 'react';
import './HeaderComponent.css';
import {
  Button, Icon, Dropdown, Input,
} from 'semantic-ui-react';

function HeaderComponent(props) {
  const {
    handleReload,
    positionList, selectedPosition, handlePosition, handleJob, searchHandler, activeTab,
  } = props;
  const handlePositionCallback = useCallback((e, obj) => handlePosition(e, obj), []);
  return (
    <>
      <div className="headerContainer">
        <div className="leftPanel">
          <span className="ticketSpan"><b>Applications</b></span>
          <Button className={`iconBtn ${activeTab === 'all'}`} onClick={() => handleJob('all')}>ALL</Button>
          <Dropdown
            button
            className={`iconBtn icon ${activeTab === 'position'}`}
            labeled
            icon="filter"
            options={positionList}
            onChange={handlePositionCallback}
            value={selectedPosition}
            placeholder="SELECT POSITION"
          />
          <Button className={`iconBtn ${activeTab === 'recent'}`} onClick={() => handleReload('recent')}>RECENTLY UPDATED</Button>
          <Button className={`iconBtn ${activeTab === 'refresh'}`} onClick={() => handleReload('refresh')}><Icon className="sync" /></Button>
        </div>
        <div className="rightPanel">
          <Input type="text" className="searchStyles" placeholder="Search by name" onChange={(e) => searchHandler(e.target.value)} />
          <Button>
            <Icon className="setting" />
            Configurations
          </Button>
          <div className="pageNoStyles">( 0 - 30 )</div>
          <Button className="iconBtn"><Icon className="angle left" /></Button>
          <Button className="iconBtn"><Icon className="angle right" /></Button>
        </div>
      </div>
    </>
  );
}

export default React.memo(HeaderComponent);
