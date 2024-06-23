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
}

const ModalEdit: React.FC<ModalEditProps> = ({ book, closeModalEdit }) => {
  const [userBook, setUserBook] = useState(book.userBook);
  const [userName, setUserName] = useState(book.userName);
  const [borrowedDay, setBorrowedDay] = useState(book.borrowedDay);
  const [payDay, setPayDay] = useState(book.payDay);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const updatedBook = {
      ...book,
      userBook,
      userName,
      borrowedDay,
      payDay,
    };
    dispatch(editBook(updatedBook));
    closeModalEdit();
  };

  return (
    <>
      <div className="modalEdit">
        <div className="headerModalEdit">
          <h4>Sửa thông tin mượn sách</h4>
          <button onClick={closeModalEdit}>X</button>
        </div>
        <div className="mainModalEdit">
          <label htmlFor="userBook">Tên sách:</label>
          <input
            type="text"
            id="userBook"
            value={userBook}
            onChange={(e) => setUserBook(e.target.value)}
          />
          <label htmlFor="userName">Tên người mượn:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
};

export default ModalEdit;
