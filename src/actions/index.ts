interface UserProfile {
    id: number;
    userBook: string;
    userName: string;
    borrowedDay: string;
    payDay: string;
    status:boolean;
}
  export const addBook = (book: UserProfile) => ({
      type: 'ADD_BOOK',
      payload: book
  });
  
  export const deleteBook = (id: number) => ({
      type: 'DELETE_BOOK',
      payload: id
  });
  
  export const editBook = (book: UserProfile) => ({
      type: 'EDIT_BOOK',
      payload: book
  });