import React, { Component } from 'react';
import './HeaderComponent.css';
import { Button, Icon, Search, Dropdown } from 'semantic-ui-react'

class HeaderComponent extends Component {
    render = () => {
        const { handleReload, positionList, selectedPosition, handlePosition, handleJob, searchHandler, activeTab } = this.props;
        return (
            <>
                <div className="headerContainer">
                    <div className="leftPanel">
                        <span className="tickets_span"><b>Tickets</b></span>
                        <Button className={`iconBtn ${activeTab === 'all'}`} onClick={() => handleJob('all')}>ALL</Button>
                        <Dropdown
                            button
                            className={`iconBtn icon ${activeTab === 'position'}`}
                            floating
                            labeled
                            icon='filter'
                            options={positionList}
                            onChange={(e, obj) => handlePosition(e, obj)}
                            search
                            value={selectedPosition}
                            placeholder='SELECT POSITION'
                        />
                        <Button className={`iconBtn ${activeTab === 'recent'}`} onClick={() => handleReload('recent')}>RECENTLY UPDATED</Button>
                        <Button className={`iconBtn ${activeTab === 'refresh'}`} onClick={() => handleReload('refresh')}><Icon className="sync" /></Button>
                    </div>
                    <div className="rightPanel">
                        <Search className="searchStyles" placeholder="Search by name" fluid onSearchChange={(e, obj) => searchHandler(e, obj)} />
                        <Button><Icon className='setting' />Configurations</Button>
                        <div className="pageNoStyles">( 0 - 30 )</div>
                        <Button className="iconBtn"><Icon className='angle left' /></Button>
                        <Button className="iconBtn"><Icon className='angle right' /></Button>
                    </div>
                </div>
            </>
        )
    }
}

export default HeaderComponent;