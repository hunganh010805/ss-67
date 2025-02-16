import React, { useState } from "react";
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
import swal from "sweetalert";

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

  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [currentBook, setCurrentBook] = useState<UserProfile | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const handleStatus = (id: number) => {
    const book = books.find((book: UserProfile) => book.id === id);
    if (book) {
      dispatch(editBook({ ...book, status: !book.status }));
    }
  };

  const handleAdd = () => setModalAdd(true);
  const closeModalAdd = () => setModalAdd(false);
  const handleEdit = (book: UserProfile) => {
    setCurrentBook(book);
    setModalEdit(true);
  };
  const closeModalEdit = () => {
    setModalEdit(false);
    setCurrentBook(null);
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
        swal("Deleted successfully", { icon: "success" });
      }
    });
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(event.target.value);
  };

  const filteredBooks = books.filter((book: UserProfile) => {
    if (filterStatus === "all") return true;
    return filterStatus === "Đã trả" ? book.status : !book.status;
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
      {modalAdd && <ModalAdd closeModalAdd={closeModalAdd} addBook={(newBook: UserProfile) => dispatch(addBook(newBook))} />}
      {modalEdit && currentBook && (
        <ModalEdit
          book={currentBook}
          closeModalEdit={closeModalEdit}
          updateBook={(updatedBook: UserProfile) => dispatch(editBook(updatedBook))}
        />
      )}
    </TableContainer>
  );
};

export default BookList;
