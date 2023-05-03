import { createPortal } from 'react-dom';
const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');
let data = require('../blasters.json');

const handleBuild = (e) => {
    e.preventDefault();
    helper.hideError();

    const buildName = e.target.querySelector('#buildName').value;
    const cost = e.target.querySelector('#cost').value;
    const fps = e.target.querySelector('#fps').value;
    const blaster = e.target.querySelector('#blaster').value;
    const spring = e.target.querySelector('#spring').value;
    const barrelid = e.target.querySelector('#barrelid').value;
    const barrellength = e.target.querySelector('#barrellength').value;

    if (!buildName || !cost || !fps || !blaster || !spring || !barrelid || !barrellength) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, { buildName, cost, fps, blaster, spring, barrelid, barrellength }, loadBuildsFromServer);

    return false;
}

const BuildForm = (props) => {

    return (
        <form id="buildForm"
            onSubmit={handleBuild}
            name="buildForm"
            action="/maker"
            method="POST"
            className="buildForm"
        >
            
            <label htmlFor="buildName">Build Name: </label>
            <input id="buildName" type="text" name="buildName" placeholder="Enter Name for Build" />
            <br />
            <label htmlFor="cost">Cost in USD: </label>
            <input id="cost" type="number" name="cost" min="0" />
            <br />
            <label htmlFor="fps">FPS: </label>
            <input id="fps" type="number" name="fps" min="0" />
            <br />
            <label htmlFor="blaster">Blaster: </label>
            <select name="blaster" id="blaster">
                <option value={data.blasters[0].blastername}>{data.blasters[0].blasterbrand + " " + data.blasters[0].blastername}</option>
                <option value={data.blasters[1].blastername}>{data.blasters[1].blasterbrand + " " + data.blasters[1].blastername}</option>
                <option value={data.blasters[2].blastername}>{data.blasters[2].blasterbrand + " " + data.blasters[2].blastername}</option>
            </select>
            <br />
            <label htmlFor="spring">Spring Weight in Kg: </label>
            <input id="spring" type="number" name="spring" min="0" />
            <br />
            <label htmlFor="barrelid">Barrel Inner-Diameter in mm: </label>
            <input id="barrelid" type="number" name="barrelid" min="0" />
            <br />
            <label htmlFor="barrellength">Barrel Length in cm: </label>
            <input id="barrellength" type="number" name="barrellength" min="0" />
            <br />
            <input className="makeBuildSubmit" type="submit" value="Create Build" />
        </form>
    );
};


const BuildList = (props) => {
    if (props.builds.length === 0) {
        return (
            <div className="buildList">
                <h3 className="emptyBuilds">No Builds Created yet</h3>
            </div>
        );
    }

    const buildNodes = props.builds.map(build => {
        return (
            <div key={build._id} className="build" class="column is-one-quarter">
                <div class="box has-background-dark has-text-white">
                    <img src="/assets/img/mav.png" alt="best blaster ever" className="maverick" width="48px" />
                    <h3 className="buildName">Build Name: {build.buildName}</h3>
                    <h3 className="cost">Cost: {build.cost} USD</h3>
                    <h3 className="fps">FPS: {build.fps}</h3>
                    <h3 className="blaster">Blaster: {build.blaster}</h3>
                    <h3 className="spring">Spring Weight: {build.spring} Kg</h3>
                    <h3 className="barrelid">Barrel Inner-Diameter: {build.barrelid} mm</h3>
                    <h3 className="barrellength">Barrel Length: {build.barrellength} cm</h3>
                </div>
            </div>
        );
    });

    return (
        <div className="buildList" class="columns is-multiline is-mobile is-1">
            {buildNodes}
        </div>
    );
};

const Switch = (props) => {
    return (
        <label class="switch">
          <input type="checkbox"></input>
          <span class="slider round"></span>
        </label>
    )
}

class ModalControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = { showModal: false, current: '', pass1: '', pass2: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleButtonClick() {
        this.setState({ showModal: true });
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('Changed: ' + this.state);
        event.preventDefault();
    }


    render() {
        const showModal = this.state.showModal;

        return (
            <div>
                <ModalButton onClick={this.handleButtonClick} message='Change Password' />
                {createPortal(<Modal
                    showModal={showModal}
                    onClose={this.closeModal}
                    onSubmit={this.handleSubmit}
                    current={this.state.current}
                    pass1={this.state.pass1}
                    pass2={this.state.pass2}
                    onChange={this.handleChange}
                />, document.getElementById('modal-root'))}
            </div>
        )

    }
}

const Modal = (props) => {
    const showModal = props.showModal;
    if (showModal) {
        return (
            <div className="pass-modal">
                <div className='pass-modal-content'>
                    <div className='pass-modal-header'>
                        <h4 className='pass-modal-title'>Change Password</h4>
                    </div>
                    <div className='pass-modal-body'>
                        <form onSubmit={props.onSubmit}>
                            <label>
                                Current Password:
                                <input type="password" value={props.current} onChange={props.onChange} name="current" />
                            </label>
                            <br></br>
                            <label>
                                New Password:
                                <input type="password" value={props.pass1} onChange={props.onChange} name="pass1" />
                            </label>
                            <br></br>
                            <label>
                                Confirm New Password:
                                <input type="password" value={props.pass2} onChange={props.onChange} name="pass2" />
                            </label>
                            <br></br>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                    <div className='pass-modal-footer'>
                        <button onClick={props.onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    return null
}

const ModalButton = (props) => {
    return (
        <a class="button is-danger" onClick={props.onClick}>
            <strong>{props.message}</strong>
        </a>
    )
}

const renderModal = async () => {
    ReactDOM.render(<ModalControl />, document.getElementById('changePassword'));
}

const loadBuildsFromServer = async () => {
    const response = await fetch('/getBuilds');
    const data = await response.json();
    ReactDOM.render(<BuildList builds={data.builds} />, document.getElementById('builds'));
};

const init = () => {
    ReactDOM.render(<BuildForm />, document.getElementById('makeBuild'));
    ReactDOM.render(<BuildList builds={[]} />, document.getElementById('builds'))
    loadBuildsFromServer();
    renderModal();

}

window.onload = init;