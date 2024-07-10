import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import NavBar from './components/NavBar';
import theme from './theme';
import { auth } from './firebase';
import './styles.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar user={user} />
        <div className="app">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
