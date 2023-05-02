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
    const barrel = e.target.querySelector('#barrel').value;
    const spring = e.target.querySelector('#spring').value;
    const additional = e.target.querySelector('#additional').value;

    if (!buildName || !cost || !fps || !blaster || !barrel || !spring || !additional) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, { buildName, cost, fps, blaster, barrel, spring, additional }, loadBuildsFromServer);

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

            <label htmlFor="fps">FPS: </label>
            <input id="fps" type="number" name="fps" min="0" />

            <label htmlFor="blaster">Blaster: </label>
            <select name="blaster" id="blaster" onChange={PopulateDropdowns}>
                <option value={data.blasters[0].blastername}>{data.blasters[0].blasterbrand + " " + data.blasters[0].blastername}</option>
                <option value={data.blasters[1].blastername}>{data.blasters[1].blasterbrand + " " + data.blasters[1].blastername}</option>
                <option value={data.blasters[2].blastername}>{data.blasters[2].blasterbrand + " " + data.blasters[2].blastername}</option>
            </select>

            <input className="makeBuildSubmit" type="submit" value="Create Build" />
        </form>
    );
};

const PopulateDropdowns = (e) => {
    const blaster = e.target.querySelector('#blaster').value;
    switch (blaster) {
        case "Talon Claw T4":
            return (
                <div class="T4">
                    <label htmlFor="barrel">Barrel: </label>
                    <select name="barrel" id="barrel">
                        <option value={data.blasters[0].barrels[0].barrelname}>
                            {data.blasters[0].barrels[0].barrelname}</option>
                        <option value={data.blasters[0].barrels[1].barrelname}>
                            {data.blasters[0].barrels[1].barrelname}</option>
                        <option value={data.blasters[0].barrels[2].barrelname}>
                            {data.blasters[0].barrels[2].barrelname}</option>
                        <option value={data.blasters[0].barrels[3].barrelname}>
                            {data.blasters[0].barrels[3].barrelname}</option>
                    </select>

                    <label htmlFor="spring">Spring: </label>
                    <select name="spring" id="spring">
                        <option value={data.blasters[0].springs[0].springname}>
                            {data.blasters[0].springs[0].springname}</option>
                        <option value={data.blasters[0].springs[1].springname}>
                            {data.blasters[0].springs[1].springname}</option>
                        <option value={data.blasters[0].springs[2].springname}>
                            {data.blasters[0].springs[2].springname}</option>
                    </select>

                    <label htmlFor="additional">Additional: </label>
                    <select name="additional" id="additional">
                        <option value={data.blasters[0].additional[0].additionalname}>
                            None</option>
                    </select>
                </div>
            )
            break;

        case "Nexus Pro":
            return (
                <div class="Nexus">
                    <label htmlFor="barrel">Barrel: </label>
                    <select name="barrel" id="barrel">
                        <option value={data.blasters[1].barrels[0].barrelname}>
                            {data.blasters[1].barrels[0].barrelname}</option>
                        <option value={data.blasters[1].barrels[1].barrelname}>
                            {data.blasters[1].barrels[1].barrelname}</option>
                        <option value={data.blasters[1].barrels[2].barrelname}>
                            {data.blasters[1].barrels[2].barrelname}</option>
                        <option value={data.blasters[1].barrels[3].barrelname}>
                            {data.blasters[1].barrels[3].barrelname}</option>
                        <option value={data.blasters[1].barrels[4].barrelname}>
                            {data.blasters[1].barrels[4].barrelname}</option>
                        <option value={data.blasters[1].barrels[5].barrelname}>
                            {data.blasters[1].barrels[5].barrelname}</option>
                    </select>

                    <label htmlFor="spring">Spring: </label>
                    <select name="spring" id="spring">
                        <option value={data.blasters[1].springs[0].springname}>
                            {data.blasters[1].springs[0].springname}</option>
                        <option value={data.blasters[1].springs[1].springname}>
                            {data.blasters[1].springs[1].springname}</option>
                        <option value={data.blasters[1].springs[2].springname}>
                            {data.blasters[1].springs[2].springname}</option>
                        <option value={data.blasters[1].springs[3].springname}>
                            {data.blasters[1].springs[3].springname}</option>
                        <option value={data.blasters[1].springs[4].springname}>
                            {data.blasters[1].springs[4].springname}</option>
                    </select>

                    <label htmlFor="additional">Additional: </label>
                    <select name="additional" id="additional">
                        <option value={data.blasters[1].additional[0].additionalname}>
                            {data.blasters[1].additional[0].additionalname}</option>
                        <option value={data.blasters[1].additional[1].additionalname}>
                            {data.blasters[1].additional[1].additionalname}</option>
                        <option value={data.blasters[1].additional[2].additionalname}>
                            {data.blasters[1].additional[2].additionalname}</option>
                        <option value={data.blasters[1].additional[3].additionalname}>
                            {data.blasters[1].additional[3].additionalname}</option>
                        <option value={data.blasters[1].additional[4].additionalname}>
                            {data.blasters[1].additional[4].additionalname}</option>
                        <option value={data.blasters[1].additional[5].additionalname}>
                            {data.blasters[1].additional[5].additionalname}</option>
                        <option value={data.blasters[1].additional[6].additionalname}>
                            {data.blasters[1].additional[6].additionalname}</option>
                        <option value={data.blasters[1].additional[7].additionalname}>
                            {data.blasters[1].additional[7].additionalname}</option>
                    </select>F
                </div>
            )
            break;

        case "Harrier":
            return (
                <div class="T4">
                    <label htmlFor="barrel">Barrel: </label>
                    <select name="barrel" id="barrel">
                        <option value={data.blasters[2].barrels[0].barrelname}>
                            {data.blasters[2].barrels[0].barrelname}</option>
                        <option value={data.blasters[2].barrels[1].barrelname}>
                            {data.blasters[2].barrels[1].barrelname}</option>
                        <option value={data.blasters[2].barrels[2].barrelname}>
                            {data.blasters[2].barrels[2].barrelname}</option>
                        <option value={data.blasters[2].barrels[3].barrelname}>
                            {data.blasters[2].barrels[3].barrelname}</option>
                    </select>

                    <label htmlFor="spring">Spring: </label>
                    <select name="spring" id="spring">
                        <option value={data.blasters[2].springs[0].springname}>
                            {data.blasters[2].springs[0].springname}</option>
                        <option value={data.blasters[2].springs[1].springname}>
                            {data.blasters[2].springs[1].springname}</option>
                        <option value={data.blasters[2].springs[2].springname}>
                            {data.blasters[2].springs[2].springname}</option>
                        <option value={data.blasters[2].springs[3].springname}>
                            {data.blasters[2].springs[3].springname}</option>
                    </select>

                    <label htmlFor="additional">Additional: </label>
                    <select name="additional" id="additional">
                        <option value={data.blasters[2].additional[0].additionalname}>
                            {data.blasters[2].additional[0].additionalname}</option>
                        <option value={data.blasters[2].additional[1].additionalname}>
                            {data.blasters[2].additional[1].additionalname}</option>
                    </select>
                </div>
            )
            break;
    };


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
                    <h3 className="fps">FPS: {build.fps}</h3>
                    <h3 className="blaster">Blaster: {build.blaster}</h3>
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
        ReactDOM.render(<BuildList builds={data.builds} />, document.getElementById('builds'));
    };

    const init = () => {
        ReactDOM.render(<BuildForm />, document.getElementById('makeBuild'));
        ReactDOM.render(<BuildList builds={[]} />, document.getElementById('builds'))
        loadBuildsFromServer();
    }

    window.onload = init;