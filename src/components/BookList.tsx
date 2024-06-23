import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { addBook, editBook, deleteBook } from "../actions";
import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import swal from 'sweetalert';

interface UserProfile {
  id: number;
  userBook: string;
  userName: string;
  borrowedDay: string;
  payDay: string;
  status: boolean;
}

const BookList = () => {
  const books = useSelector((state: any) => state);
  const dispatch = useDispatch();

  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [currentBook, setCurrentBook] = useState<UserProfile | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const handleStatus = (id: number) => {
    const book = books.find((book: UserProfile) => book.id === id);
    if (book) {
      const updatedBook = { ...book, status: !book.status };
      dispatch(editBook(updatedBook));
    }
  };

  const handleAdd = () => {
    setModalAdd(true);
  };

  const closeModalAdd = () => {
    setModalAdd(false);
  };

  const handleEdit = (book: UserProfile) => {
    setCurrentBook(book);
    setModalEdit(true);
  };

  const closeModalEdit = () => {
    setModalEdit(false);
    setCurrentBook(null);
  };

  const updateBook = (updatedBook: UserProfile) => {
    dispatch(editBook(updatedBook));
  };

  const handleDelete = (id: number) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteBook(id));
        swal("Deleted successfully", {
          icon: "success",
        });
      }
    });
  };

  const addBook = (newBook: UserProfile) => {
    dispatch(addBook(newBook));
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(event.target.value);
  };

  const filteredBooks = books.filter((book: UserProfile) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "Đã trả") return book.status;
    if (filterStatus === "Chưa trả") return !book.status;
    return true;
  });

  return (
    <TableContainer component={Paper}>
      <div>
        <select value={filterStatus} onChange={handleFilterChange}>
          <option value="all">All statuses</option>
          <option value="Đã trả">Đã trả</option>
          <option value="Chưa trả">Chưa trả</option>
        </select>
      </div>
      <Button onClick={handleAdd}>Thêm thông tin</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Tên Sách</TableCell>
            <TableCell>Người Mượn</TableCell>
            <TableCell>Ngày Mượn</TableCell>
            <TableCell>Ngày Trả</TableCell>
            <TableCell>Trạng Thái</TableCell>
            <TableCell>Hành Động</TableCell>
            <TableCell>Chức Năng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredBooks.map((book: UserProfile) => (
            <TableRow key={book.id}>
              <TableCell>{book.id}</TableCell>
              <TableCell>{book.userBook}</TableCell>
              <TableCell>{book.userName}</TableCell>
              <TableCell>{book.borrowedDay}</TableCell>
              <TableCell>{book.payDay}</TableCell>
              <TableCell>{book.status ? "Đã trả" : "Chưa trả"}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleStatus(book.id)}
                  disabled={book.status}
                >
                  Đánh Dấu Đã Trả
                </Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(book)}>Sửa</Button>
                <Button onClick={() => handleDelete(book.id)}>Xóa</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {modalAdd && <ModalAdd closeModalAdd={closeModalAdd} addBook={addBook} />}
      {modalEdit && currentBook && (
        <ModalEdit
          book={currentBook}
          closeModalEdit={closeModalEdit}
          updateBook={updateBook}
        />
      )}
    </TableContainer>
  );
};

export default BookList;
