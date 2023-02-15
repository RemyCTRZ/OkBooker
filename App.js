import { NativeRouter as Router, Route, Routes } from "react-router-native";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Borrow from './pages/Borrow';
import BorrowScan from './pages/BorrowScan';
import Borrowings from './pages/Borrowings';
import Return from './pages/Return';
import ReturnScan from './pages/ReturnScan';
import Success from './components/Success';
import Error from './components/Error';
import styles from './App.scss'


export default function App() {

    const URL = 'http://vigneronluc.com:5000/api'

    const [member, setMember] = useState()
    const [bookTitle, setBookTitle] = useState()

    const [selectedSpot, setSelectedSpot] = useState()

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('No book found')

    const [success, setSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState('Successfully borrowed !')

    const [confirmDialog, setConfirmDialog] = useState(true)

    return (
        <Router>
            <LinearGradient colors={['#E0425B', '#661173', '#6E0E61', '#95000B']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
                <Routes>
                    <Route path='/' element={<Home />} loader={<Loader />} />
                    <Route path='/borrow' element={<Borrow setMember={setMember} setError={setError} setErrorMessage={setErrorMessage} URL={URL} />} loader={<Loader />} />
                    <Route path='/borrow-2' element={<BorrowScan member={member} setError={setError} setErrorMessage={setErrorMessage} setSuccess={setSuccess} setSuccessMessage={setSuccessMessage} bookTitle={bookTitle} setBookTitle={setBookTitle} confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} URL={URL} />} loader={<Loader />} />
                    <Route path='/return' element={<Return setSelectedSpot={setSelectedSpot} setError={setError} setErrorMessage={setErrorMessage} />} loader={<Loader />} />
                    <Route path='/return-2' element={<ReturnScan selectedSpot={selectedSpot} setError={setError} setErrorMessage={setErrorMessage} setSuccess={setSuccess} setSuccessMessage={setSuccessMessage} bookTitle={bookTitle} setBookTitle={setBookTitle} confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} URL={URL} />} loader={<Loader />} />
                    <Route path='/borrowings' element={<Borrowings />} loader={<Loader />} />
                    <Route path='*' element={<h1>Page does not exist</h1>} loader={<Loader />} />
                </Routes>
                {success && <Success successMessage={successMessage} success={success} setSuccess={setSuccess} />}
                {error && <Error errorMessage={errorMessage} error={error} setError={setError} />}
                <Navbar />
                <StatusBar style="inverted" />
            </LinearGradient>
        </Router>
    )

}