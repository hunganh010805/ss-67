export interface UserProfile {
    id: number;
    userBook: string;
    userName: string;
    borrowedDay: string;
    payDay: string;
    status:boolean;
}
const initialProfile: UserProfile[] = [
    {
      "id": 1,
      "userBook": "Harry Potter và Hòn đá phù thủy",
      "userName": "Nguyễn Văn A",
      "borrowedDay": "10/4/2024",
      "payDay": "17/4/2024",
      "status": false
    },
    {
      "id": 2,
      "userBook": "Harry Potter và Phòng chứa bí mật",
      "userName": "Lê Thị B",
      "borrowedDay": "12/4/2024",
      "payDay": "19/4/2024",
      "status": true    
    },
    {
      "id": 3,
      "userBook": "Harry Potter và Tên tù nhân ngục Azkaban",
      "userName": "Trần Văn C",
      "borrowedDay": "13/4/2024",
      "payDay": "20/4/2024",
      "status": false
    },
    {
      "id": 4,
      "userBook": "Harry Potter và Chiếc cốc lửa",
      "userName": "Phạm Thị D",
      "borrowedDay": "14/4/2024",
      "payDay": "21/4/2024",
      "status": true
    },
    {
      "id": 5,
      "userBook": "Harry Potter và Hội Phượng Hoàng",
      "userName": "Ngô Văn E",
      "borrowedDay": "15/4/2024",
      "payDay": "22/4/2024",
      "status": true
    },
    {
      "id": 6,
      "userBook": "Harry Potter và Hoàng tử lai",
      "userName": "Vũ Thị F",
      "borrowedDay": "16/4/2024",
      "payDay": "23/4/2024",
      "status": false
    },
    {
      "id": 7,
      "userBook": "Harry Potter và Bảo bối tử thần",
      "userName": "Đặng Văn G",
      "borrowedDay": "17/4/2024",
      "payDay": "24/4/2024",
      "status": true
    },
    {
      "id": 8,
      "userBook": "Harry Potter và Đứa trẻ bị nguyền rủa",
      "userName": "Hoàng Thị H",
      "borrowedDay": "18/4/2024",
      "payDay": "25/4/2024",
      "status": false
    },
    {
      "id": 9,
      "userBook": "Harry Potter và Hòn đá phù thủy",
      "userName": "Nguyễn Văn I",
      "borrowedDay": "19/4/2024",
      "payDay": "26/4/2024",
      "status": false
    },
    {
      "id": 10,
      "userBook": "Harry Potter và Phòng chứa bí mật",
      "userName": "Lê Thị J",
      "borrowedDay": "20/4/2024",
      "payDay": "27/4/2024",
      "status": false
    },
    {
      "id": 11,
      "userBook": "Harry Potter và Tên tù nhân ngục Azkaban",
      "userName": "Trần Văn K",
      "borrowedDay": "21/4/2024",
      "payDay": "28/4/2024",
      "status": true
    }
  ]
  ;
  
  const loadFromLocalStorage = (): UserProfile[] => {
    try {
        const serializedState = localStorage.getItem('UserProfile');
        if (serializedState === null) {
            return initialProfile;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.error("Could not load state from localStorage", e);
        return initialProfile;
    }
};

const saveToLocalStorage = (state: UserProfile[]) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('UserProfile', serializedState);
    } catch (e) {
        console.error("Could not save state to localStorage", e);
    }
};

const initialState: UserProfile[] = loadFromLocalStorage();

interface AddBookAction {
    type: 'ADD_BOOK';
    payload: UserProfile;
}

interface DeleteBookAction {
    type: 'DELETE_BOOK';
    payload: number;
}

interface EditBookAction {
    type: 'EDIT_BOOK';
    payload: UserProfile;
}

type UserProfileAction = AddBookAction | DeleteBookAction | EditBookAction;

const reducerProfile = (state = initialState, action: UserProfileAction): UserProfile[] => {
    let newState: UserProfile[];
    switch (action.type) {
        case 'ADD_BOOK':
            newState = [...state, action.payload];
            saveToLocalStorage(newState);
            return newState;
        case 'DELETE_BOOK':
            newState = state.filter(book => book.id !== action.payload);
            saveToLocalStorage(newState);
            return newState;
        case 'EDIT_BOOK':
            newState = state.map(book => 
                book.id === action.payload.id ? action.payload : book
            );
            saveToLocalStorage(newState);
            return newState;
        default:
            return state;
    }
};

export default reducerProfile;