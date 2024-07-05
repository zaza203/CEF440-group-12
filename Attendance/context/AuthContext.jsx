
// import React, { createContext, useReducer, useEffect } from 'react';
// import { initializeApp } from '@firebase/app';
// import { getAuth, onAuthStateChanged } from '@firebase/auth';
// import { getFirestore, doc, setDoc } from '@firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const firebaseConfig = {
//   apiKey: "AIzaSyA5rtrk9feIEO5JTlMSeQo1dE9EJT-7ty4",
//   authDomain: "attendanc-app-26ce4.firebaseapp.com",
//   projectId: "attendanc-app-26ce4",
//   storageBucket: "attendanc-app-26ce4.appspot.com",
//   messagingSenderId: "231896227641",
//   appId: "1:231896227641:web:7dccfd932fadd8387b52e8"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app); // Initialize Firestore

// const AuthContext = createContext();

// const initialState = {
//   user: null,
//   role: null,
//   isLoading: true,
// };

// const authReducer = (state, action) => {
//   switch (action.type) {
//     case 'LOGIN':
//       return { ...state, user: action.payload.user, role: action.payload.role, isLoading: false };
//     case 'LOGOUT':
//       return { ...state, user: null, role: null, isLoading: false };
//     case 'SET_LOADING':
//       return { ...state, isLoading: action.payload };
//     default:
//       return state;
//   }
// };

// const AuthProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(authReducer, initialState);

//   useEffect(() => {
//     const auth = getAuth(app);

//     const checkUser = async () => {
//       const storedUser = await AsyncStorage.getItem('user');
//       const storedRole = await AsyncStorage.getItem('role');
//       if (storedUser && storedRole) {
//         dispatch({ type: 'LOGIN', payload: { user: JSON.parse(storedUser), role: storedRole } });
//       } else {
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//           if (user) {
//             const role = AsyncStorage.getItem('role'); // Fetch role from storage
//             dispatch({ type: 'LOGIN', payload: { user, role } });
//             AsyncStorage.setItem('user', JSON.stringify(user));
//             AsyncStorage.setItem('role', role);
//           } else { 
//             dispatch({ type: 'LOGOUT' });
//             AsyncStorage.removeItem('user');
//             AsyncStorage.removeItem('role');
//           }
//         });
//         return () => unsubscribe();
//       }
//     };

//     checkUser();
//   }, []);

//   const addUserToCollection = async (user, role, createdBy) => {
//     try {
//       const userRef = doc(db, role, user.uid);
//       await setDoc(userRef, {
//         uid: user.uid,
//         email: user.email,
//         role: role,
//         createdBy: createdBy
//       });
//     } catch (error) {
//       console.error('Error adding user to collection:', error.message);
//       throw new Error('Error adding user to collection');
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ state, dispatch, addUserToCollection }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };



import React, { createContext, useReducer, useEffect } from 'react';
import { initializeApp } from '@firebase/app';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { getFirestore, doc, setDoc } from '@firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyA5rtrk9feIEO5JTlMSeQo1dE9EJT-7ty4",
  authDomain: "attendanc-app-26ce4.firebaseapp.com",
  projectId: "attendanc-app-26ce4",
  storageBucket: "attendanc-app-26ce4.appspot.com",
  messagingSenderId: "231896227641",
  appId: "1:231896227641:web:7dccfd932fadd8387b52e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

const AuthContext = createContext();

const initialState = {
  user: null,
  role: null,
  isLoading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload.user, role: action.payload.role, isLoading: false };
    case 'LOGOUT':
      return { ...state, user: null, role: null, isLoading: false };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const auth = getAuth(app);

    const checkUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      const storedRole = await AsyncStorage.getItem('role');
      if (storedUser && storedRole) {
        dispatch({ type: 'LOGIN', payload: { user: JSON.parse(storedUser), role: storedRole } });
      } else {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            const role = AsyncStorage.getItem('role'); // Fetch role from storage
            dispatch({ type: 'LOGIN', payload: { user, role } });
            AsyncStorage.setItem('user', JSON.stringify(user));
            AsyncStorage.setItem('role', role);
          } else {
            dispatch({ type: 'LOGOUT' });
            AsyncStorage.removeItem('user');
            AsyncStorage.removeItem('role');
          }
        });
        return () => unsubscribe();
      }
    };

    checkUser();
  }, []);

  const addUserToCollection = async (user, role, createdBy) => {
    try {
      const userRef = doc(db, role, user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        role: role,
        createdBy: createdBy
      });
    } catch (error) {
      console.error('Error adding user to collection:', error.message);
      throw new Error('Error adding user to collection');
    }
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, addUserToCollection }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
