import React, {useCallback, useContext, useState, useEffect} from 'react';
import app from '../Config/firebase';
import 'firebase/firestore';
import {AuthContext} from '../Context/auth';
import '../App.css';

const FireContent = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  useEffect(() => {
    // const FetchData = async () => {
    //   const db = app.firestore();
    //   const data = await db.collection("users").get();
    //   setUsers(data.docs.map(doc => ({ ...doc.data(), index: doc.id })));
    // };
    // FetchData();
    const db = app.firestore();
    const unsubscribe = db.collection('users').onSnapshot(snapshot => {
      const userData = [];
      snapshot.forEach(doc => userData.push({...doc.data(), index: doc.id}));
      setUsers(userData);
    });
    return unsubscribe;
  }, []);
  //   console.log(users);
  const onAdd = () => {
    const db = app.firestore();
    db.collection('users')
      .doc()
      .set({
        name: newUser,
        id: users.length + 2,
      });
    setNewUser('');
  };
  return (
    <>
      <input value={newUser} onChange={e => setNewUser(e.target.value)} />
      <button onClick={onAdd}>Add</button>
      <ul>
        {users.map(user => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    </>
  );
};

const Live = ({history}) => {
  const auth = useContext(AuthContext);
  console.log(auth);
  const handleSignUp = useCallback(async e => {
    e.preventDefault();
    const {email, password} = e.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleLogin = useCallback(
    async e => {
      e.preventDefault();
      const {email, password} = e.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push('/');
      } catch (error) {
        console.log(error);
      }
    },
    [history],
  );
  return (
    <div className="live-form">
      <h1>Live</h1>
      <form onSubmit={handleSignUp}>
        <label>
          Email <input name="email" type="email" placeholder="Email" />
        </label>
        <br />
        <label>
          Password{' '}
          <input name="password" type="password" placeholder="Password" />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
      <form onSubmit={handleLogin}>
        <label>
          Email <input name="email" type="email" placeholder="Email" />
        </label>
        <br />
        <label>
          Password{' '}
          <input name="password" type="password" placeholder="Password" />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => app.auth().signOut()}>Sign Out</button>
      <br />
      <FireContent />
    </div>
  );
};

export default Live;
