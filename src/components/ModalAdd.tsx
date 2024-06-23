import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../actions';
import "./ModalAdd.css";

export default function ModalAdd({ closeModalAdd }: { closeModalAdd: () => void }) {
  const [nameBook, setNameBook] = useState<string>('');
  const [nameStudent, setNameStudent] = useState<string>('');
  const [borrowedDay, setBorrowedDay] = useState<string>('');
  const [payDay, setPayDay] = useState<string>('');

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const newBook = {
      id: Date.now(),
      nameBook,
      nameStudent,
      borrowedDay,
      payDay,
      status: false
    };
    dispatch(addBook(newBook));
    closeModalAdd();
  };

  return (
    <>
      <div className='modalAdd'>
        <div className="headerModalAdd">
          <h4>Thêm thông tin mượn sách</h4>
          <button onClick={closeModalAdd}>X</button>
        </div>
        <div className="mainModalAdd">
          <label htmlFor="nameBook">Tên sách:</label>
          <input 
            type="text" 
            id="nameBook" 
            value={nameBook} 
            onChange={(e) => setNameBook(e.target.value)} 
          />
          <label htmlFor="nameStudent">Tên người mượn:</label>
          <input 
            type="text" 
            id="nameStudent" 
            value={nameStudent} 
            onChange={(e) => setNameStudent(e.target.value)} 
          />
          <label htmlFor="borrowedDay">Ngày mượn:</label>
          <input 
            type="date" 
            id="borrowedDay" 
            value={borrowedDay} 
            onChange={(e) => setBorrowedDay(e.target.value)} 
          />
          <label htmlFor="payDay">Ngày trả:</label>
          <input 
            type="date" 
            id="payDay" 
            value={payDay} 
            onChange={(e) => setPayDay(e.target.value)} 
          />
        </div>
        <div className="footerModalAdd">
          <button onClick={handleSubmit}>Lưu</button>
        </div>
      </div>
      <div className="overlay" onClick={closeModalAdd}></div>
    </>
  );
}