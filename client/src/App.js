import React, { useContext, useEffect, useState } from 'react';
import LoginForm  from './components/LoginForm';
import NavbarComponent from './components/Navbar';
import {BrowserRouter as Router} from 'react-router-dom'
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import UserService from './services/UserService';
import PostService from './services/PostService';
import LeftSideBar from './components/LeftSideBar';
import {useRoutes} from './routes';
import "./styles/App.css";
import {CirclesWithBar} from 'react-loader-spinner';

function App() {
  const {authStore} = useContext(Context);
  const routes = useRoutes();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if(localStorage.getItem('token')){
      // console.log("bebra")
      authStore.checkAuth();
    }
  }, [])

  async function getUsers() {
    try{
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch(e){
      console.log(e);
    }
  }

  async function getPosts(){
    try{
      const response = await PostService.fetchPosts();
      setUsers(response.data);
    } catch(e){
      console.log(e);
    }
  }

  if(authStore.isLoading) {
    // return <div>Loading...</div>
    return <div style={{height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center"}}><CirclesWithBar/></div>
  }

  // if (!authStore.isAuth) {
  //   return (
  //     <div>
  //       <NavbarComponent/>
  //         <LoginForm/>
  //         <button onClick={getUsers}>Get users</button>
  //     </div>
      
  //   )
  // }

  return ( //TODO: ХЗ ЧЕ ДЕЛАТЬ С ЭТОЙ КАЛЕКОЙ И ПИЗДЕЦОМ))) НО КАК БУДЕТ ФУТЕР ДОБАВЬ ЕГО В СТАЙЛ (НУ ТАМ ОТНЯТИЕ ХУЁ МОЁ В СКОБОЧКАХ ХЕДЕР + ФУТЕР)
    <div style={{height: "100vh"}}>
      <Router>
      <NavbarComponent/>
        <div style={{height: "calc(100% - 59px)"}} >{routes}</div>
      </Router>
      {/* <NavbarComponent/>
      <h1>{authStore.isAuth ? `User is authenticated ${authStore.user.login}` : 'AUTHORIZE'}</h1>
      <h1>{authStore.user.isActivated ? 'Account is not activated by email' : 'Account is activated'}</h1>
      <LoginForm/>
      <button onClick={() => authStore.logout()}>Log out</button>
      <div>
        <button onClick={getUsers}>Get users</button>
      </div>
      {users.map(user =>
        <div key={user.email}>{user.login}</div>
        // <div key={user.id}>{user.title}</div>
      )}  */}
     
      {/* <hr style={{border: "none", borderLeft: "1px solid hsla(200, 10%, 50%, 100", height: "100%", width: "1px"}}></hr> */}
      {/* <hr class="divider-flexItem divider-root  divider-vertical"></hr> */}
        {/* <div class="vr"></div> */}
      {/* </div> */}
    </div>
  );
}

export default observer(App);
