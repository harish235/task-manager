import React from 'react';

const Login = (props) => {

    const { email, setEmail, password, setPassword,
        handleLogin, handleSignup, hasAccount,
        setHasAccount, emailError, passwordError, setName, name, age, setAge } = props;

    return (
        <section className="login">
            <div className="loginContainer">
                <label>Email</label>
                <input type="text" autoFocus required value={email} onChange={ev => {
                    setEmail(ev.target.value);
                }} />
                <p className="errorMessage">{emailError}</p>

                <label>Password</label>
                <input type="password" required value={password} onChange={ev => {
                    setPassword(ev.target.value);
                }} />
                <p className="errorMessage">{passwordError}</p>
                <div className="btnContainer">
                    {hasAccount ?
                        (
                            <>
                                <button onClick={handleLogin}>Sign in</button>
                                <p>Don't have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span></p>
                            </>
                        ) :
                        (
                            <>
                                <label>Name</label>
                                <input type="text" autoFocus required value={name} onChange={ev => {
                                    setName(ev.target.value);
                                }} />
                                <label>Age</label>
                                <input type="number" autoFocus required value={age} onChange={ev => {
                                    setAge(ev.target.value);
                                }} />
                                <button onClick={handleSignup}>Sign up</button>
                                <p>Have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>

                            </>
                        )}
                </div>
            </div>
        </section>
    );

}

export default Login;