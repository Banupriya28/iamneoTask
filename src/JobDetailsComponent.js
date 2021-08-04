import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Placeholder } from 'semantic-ui-react';

class JobDetailsComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            holderLength: [1, 2, 3, 4, 5, 6],
        }
    }
    render = () => {
        const { holderLength } = this.state;
        const { header, reloading, data } = this.props;
        return (
            <div className="orderDetails">
                <div className="headerContent">{header} ( {data.length} )</div>
                <Scrollbars style={{ height: 575 }} >
                    {!reloading ? data && data.map((item) => {
                        return (
                            <div className="cardContainer">
                                <div className="idStyles">{item.applicantId} <span className="applicationBtn">View Application</span></div>
                                <div className="orderStyles">Applicant Name : {item.applicantName}</div>
                                <div className="itemDetails">{item.experience !== 0 && <>Experience : {item.experience}</>}</div>
                                <div className="dateStyles">Applied Date : {item.appliedDate}</div>
                                <div className="dateStyles">Assessment Date : {item.appliedDate}</div>
                            </div>
                        )
                    }) :
                        holderLength.map(() => (
                            <div className="cardContainer borderStyles">
                                <Placeholder>
                                    <Placeholder.Header image>
                                        <Placeholder.Line />
                                        <Placeholder.Line />
                                    </Placeholder.Header>
                                    <Placeholder.Paragraph>
                                        <Placeholder.Line length='medium' />
                                        <Placeholder.Line length='short' />
                                    </Placeholder.Paragraph>
                                </Placeholder>
                            </div>
                        ))
                    }
                </Scrollbars>
            </div>
        );
    }
}

export default JobDetailsComponent;
