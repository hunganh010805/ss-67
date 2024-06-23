import React from 'react';
// import { Provider } from 'react-redux';
// import store from './store/store';
import BookList from './components/BookList';

export default function App() {
  return (
    // <Provider store={store}>
      <div className="app-container">
        {/* <h1>Quản Lý Sách</h1> */}
        <BookList/>
      </div>
    // </Provider>
  );
}
