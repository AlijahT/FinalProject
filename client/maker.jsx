const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

const handleBuild = (e) => {
    e.preventDefault();
    helper.hideError();

    const buildName = e.target.querySelector('#buildName').value;
    const cost = e.target.querySelector('#cost').value;
    const barrel = e.target.querySelector('#barrel').value;
    const spring = e.target.querySelector('#spring').value;
    const additional = e.target.querySelector('#additional').value;

    if (!buildName || !cost || !barrel || !spring || !additional) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, { buildName, cost, barrel, spring, additional }, loadBuildsFromServer);

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

            <label htmlFor="cost">Cost: </label>
            <input id="cost" type="number" name="cost" min="0" />

            <label htmlFor="barrel">Barrel: </label>
            <select name="barrel" id="barrel">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>

            <label htmlFor="spring">Barrel: </label>
            <select name="spring" id="spring">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>

            <label htmlFor="additional">Barrel: </label>
            <select name="additional" id="additional">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>

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
            <div key={build._id} className="build">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 className="buildName">Build Name: {build.buildName}</h3>
                <h3 className="cost">Cost: {build.cost}</h3>
                <h3 className="barrel">Barrel: {build.barrel}</h3>
                <h3 className="spring">Spring: {build.spring}</h3>
                <h3 className="additional">Additional: {build.additional}</h3>
            </div>
        );
    });

    return (
        <div className="buildList">
            {buildNodes}
        </div>
    );
};

const loadBuildsFromServer = async () => {
    const response = await fetch('/getBuilds');
    const data = await response.json();
    ReactDOM.render(<BuildList builds = {data.builds} />, document.getElementById('builds'));
};

const init = () => {
    ReactDOM.render(<BuildForm />, document.getElementById('makeBuild'));
    ReactDOM.render(<BuildList builds = {[]} />, document.getElementById('builds'))
    loadBuildsFromServer();
}

window.onload = init;