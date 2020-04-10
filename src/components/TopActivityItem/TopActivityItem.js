import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './TopActivityItem.css';

export default class TopActivityItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false
        }
    }

    handleOpen = () => {
        this.setState({
            expanded: true
        })
    }

    handleClose = () => {
        this.setState({
            expanded: false
        })
    }
    
    render() {
        const {expanded} = this.state
        const {activity, index} = this.props
        return (
            <>
                {expanded 
                    ? <li key={index} id="expandedListItem" className="liItem"><h3 id="liHeading"><span id="nameSpan">{activity.name}</span> <button id="topTenButton" onClick={e => this.handleClose()}><FontAwesomeIcon role='button' icon={faChevronUp}/></button></h3>
                            <p id="expanded-info">{activity.description} </p>
                            <p id="expanded-info">This activity was accepted {activity.accepted_count || activity.global_accepted_count} times!</p>
                            <p id="expanded-info">Suggested by {activity.username}</p>
                        </li>
                    : <li id="liHeading" className="liItem" key={index}><span id="nameSpan">{activity.name}</span>  <button id="topTenButton" onClick={e => this.handleOpen()}><FontAwesomeIcon role='button' icon={faChevronDown}/></button></li>}
            </>
        )
    }
}