import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthStore from './store/store'
import PostStore from './store/postStore';
import UserStore from './store/userStore';
import CategoryStore from './store/categoryStore';
import CommentStore from './store/commentStore';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.css';

export const Context = createContext(
  null 
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    authStore: new AuthStore(),
    postStore: new PostStore(),
    userStore: new UserStore(),
    categoryStore: new CategoryStore(),
    commentStore: new CommentStore()
  }}>
    <App />
  </Context.Provider>
);












// ReactDOM.render(
//   <Context.Provider value={{
//     store
//   }}>
//       <App />
//   </Context.Provider>,
//   document.getElementById('root')
// );