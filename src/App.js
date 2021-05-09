import './App.css';
import fbase from './firebase';
import React, { useState, useEffect } from 'react';
import Login from './Login';
import HomePage from './HomePage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Profile from './Profile';
import Groups from './Groups';

function App() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  const handleLogin = () => {
    clearErrors();
    fbase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(error.message);
            break;
          case "auth/wrong-password":
            setPasswordError(error.message);
            break;
        }
      });
  };

  const handleSignup = () => {
    clearErrors();
    fbase
      .auth()
      .createUserWithEmailAndPassword(email, password).then((userCredentials) => {
        let userUid = userCredentials.user.uid;
        fbase.firestore().collection('users').doc(userUid).set({
          id: userUid,
          name: name,
          email: email,
          age: age
        })
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(error.message);
            break;
          case "auth/weak-password":
            setPasswordError(error.message);
            break;
        }
      });
    setName('');
    setAge('');
  };

  const handleLogout = () => {
    fbase.auth().signOut();
    setUser('');
  };

  const authListener = () => {
    fbase.auth().onAuthStateChanged(user => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser('');
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <div className="App">
      {user ? (
        <>
          <Router>
            <Navbar handleLogout={handleLogout} />
            <Switch>
              <Route path='/' exact>
                <HomePage user={user} />
              </Route>
              <Route path='/profile' component={Profile} />
              <Route path='/groups' component={Groups} />
            </Switch>
          </Router>


        </>

      ) : (
        <div>

          <Login
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            handleLogout={handleLogout}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordError={passwordError}
            setName={setName}
            setAge={setAge}
            name={name}
            age={age}
          />
        </div>
      )}


    </div>
  );
}

export default App;
