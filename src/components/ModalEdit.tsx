import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editBook } from '../actions';
import "./ModalEdit.css";
interface UserProfile {
  id: number;
  userBook: string;
  userName: string;
  borrowedDay: string;
  payDay: string;
  status: boolean;
}
interface ModalEditProps {
  book: UserProfile;
  closeModalEdit: () => void;
  updateBook: (updatedBook: UserProfile) => void;
}

export default function ModalEdit({ book, closeModalEdit, updateBook }: ModalEditProps) {
  const [nameBook, setNameBook] = useState<string>(book.userBook);
  const [nameStudent, setNameStudent] = useState<string>(book.userName);
  const [borrowedDay, setBorrowedDay] = useState<string>(book.borrowedDay);
  const [payDay, setPayDay] = useState<string>(book.payDay);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const updatedBook = {
      ...book,
      nameBook,
      nameStudent,
      borrowedDay,
      payDay,
    };
    dispatch(editBook(updatedBook));
    closeModalEdit();
  };

  return (
    <>
      <div className='modalEdit'>
        <div className="headerModalEdit">
          <h4>Sửa thông tin mượn sách</h4>
          <button onClick={closeModalEdit}>X</button>
        </div>
        <div className="mainModalEdit">
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
        <div className="footerModalEdit">
          <button onClick={handleSubmit}>Lưu</button>
        </div>
      </div>
      <div className="overlay" onClick={closeModalEdit}></div>
    </>
  );
}