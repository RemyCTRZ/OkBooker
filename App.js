import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text, Image } from 'react-native';
import styles from './App.scss'
import logo from './assets/logo.png'
import Borrow from './pages/Borrow';
import Home from './pages/Home';
import Success from './components/Success';
import Error from './components/Error';
import Borrowings from './pages/Borrowings';
import { NativeRouter as Router, Route, Routes } from "react-router-native";
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import Return from './pages/Return';
import ReturnScan from './pages/ReturnScan';
import BorrowScan from './pages/BorrowScan';

export default function App() {

  const [loading, setLoading] = useState(false)

  const [selectedId, setSelectedId] = useState()

  const [selectedSpot, setSelectedSpot] = useState()

  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('No book found')

  const [success, setSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('Successfully borrowed !')

  if (loading) return (
    <>
      <Image style={styles.logo} source={logo} />
      <Text style={styles.loading_txt} >Ok Booker !</Text>
    </>
  )

  return (
    <Router>
      <LinearGradient colors={['#E0425B', '#661173', '#6E0E61', '#95000B']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
        <Routes>
          <Route path='/' element={<Home />} loader={<Loader />} />
          <Route path='/borrow' element={<Borrow setSelectedId={setSelectedId} setError={setError} setErrorMessage={setErrorMessage} />} loader={<Loader />} />
          <Route path='/borrow-2' element={<BorrowScan selectedId={selectedId} setError={setError} setErrorMessage={setErrorMessage} />} loader={<Loader />} />
          <Route path='/return' element={<Return setSelectedSpot={setSelectedSpot} setError={setError} setErrorMessage={setErrorMessage} />} loader={<Loader />} />
          <Route path='/return-2' element={<ReturnScan selectedSpot={selectedSpot} setError={setError} setErrorMessage={setErrorMessage} />} loader={<Loader />} />
          <Route path='/borrowings' element={<Borrowings />} loader={<Loader />} />
        </Routes>
        {success && <Success successMessage={successMessage} />}
        {error && <Error errorMessage={errorMessage} />}
        <Navbar />
        <StatusBar style="inverted" />
      </LinearGradient>
    </Router>
  )

}