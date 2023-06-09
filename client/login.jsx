const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

const handleLogin = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;

    if (!username || !pass) {
        helper.handleError('Username or password is empty!');
        return false;
    }

    helper.sendPost(e.target.action, { username, pass });

    return false;
}

const handleSignup = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;

    if (!username || !pass || !pass2) {
        helper.handleError('All Fields Required!');
        return false;
    }

    if (pass !== pass2) {
        helper.handleError('Passwords do not match!');
        return false
    }

    helper.sendPost(e.target.action, { username, pass, pass2 });

    return false;
}

const LoginWindow = (props) => {
    return (
        <form id='loginform'
            name='loginForm'
            onSubmit={handleLogin}
            action='/login'
            method='POST'
            className='mainForm'
        >

            <div class="columns is-mobile is-1">
                <div class="column is-half is-offset-one-quarter">
                    <div id="Login Box" class="box has-background-dark has-text-light">
                        <label htmlFor='username'>Username: </label>
                        <input id='user' type='text' name='username' class="input" placeholder='username' />
                        <label htmlFor='pass'>Password: </label>
                        <input id='pass' type='password' name='pass' class="input" placeholder='password' />
                        <br />
                        <br />
                        <input className='formSubmit' class = "button is-primary has-text-black" type='submit' value='Sign in' />

                    </div>
                </div>
            </div>
        </form>
    );
};

const SignupWindow = (props) => {
    return (
        <form id='signupform'
            name='signupForm'
            onSubmit={handleSignup}
            action='/signup'
            method='POST'
            className='mainForm'
        >
            <div class="columns is-mobile is-1">
                <div class="column is-half is-offset-one-quarter">
                    <div id="Login Box" class="box has-background-dark has-text-light">
                        <label htmlFor='username'>Username: </label>
                        <input id='user' type='text' name='username' class="input" placeholder='username' />
                        <label htmlFor='pass'>Password: </label>
                        <input id='pass' type='password' name='pass' class="input" placeholder='password' />
                        <label htmlFor='pass'>Retype Password: </label>
                        <input id='pass2' type='password' name='pass2' class="input" placeholder='retype password' />
                        <br />
                        <br />
                        <input className='formSubmit' class="button is-primary has-text-black" type='submit' value='Sign Up' />
                    </div>
                </div>
            </div>



        </form>
    );
};

const init = () => {
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<LoginWindow />, document.getElementById('content'));
        return false;
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        ReactDOM.render(<SignupWindow />, document.getElementById('content'));
        return false;
    });

    ReactDOM.render(<LoginWindow />, document.getElementById('content'));
};

window.onload = init;