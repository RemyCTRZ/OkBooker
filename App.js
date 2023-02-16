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
import Dialog from "./components/Dialog";


export default function App() {

    const URL = 'http://vigneronluc.com:5000/api'

    const [member, setMember] = useState()

    const [book, setBook] = useState()

    const [selectedSpot, setSelectedSpot] = useState()

    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const [confirmDialog, setConfirmDialog] = useState()

    return (
        <Router>
            <LinearGradient colors={['#E0425B', '#661173', '#6E0E61', '#95000B']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.container}>
                <Routes>
                    <Route path='/' element={<Home />} loader={<Loader />} />
                    <Route path='/borrow' element={<Borrow member={member} setMember={setMember} setError={setError} URL={URL} />} loader={<Loader />} />
                    <Route path='/borrow-2' element={<BorrowScan setBook={setBook} member={member} setError={setError} setSuccess={setSuccess} confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} URL={URL} />} loader={<Loader />} />
                    <Route path='/return' element={<Return setSelectedSpot={setSelectedSpot} setError={setError} />} loader={<Loader />} />
                    <Route path='/return-2' element={<ReturnScan setBook={setBook} selectedSpot={selectedSpot} setError={setError} setSuccess={setSuccess} confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} URL={URL} />} loader={<Loader />} />
                    <Route path='/borrowings' element={<Borrowings URL={URL} />} loader={<Loader />} />
                    <Route path='*' element={<h1>Page does not exist</h1>} loader={<Loader />} />
                </Routes>
                <StatusBar style="inverted" />
                {confirmDialog && <Dialog setSuccess={setSuccess} setError={setError} confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} selectedSpot={selectedSpot} member={member} URL={URL} book={book} />}
                {success && <Success success={success} setSuccess={setSuccess} />}
                {error && <Error error={error} setError={setError} />}
            </LinearGradient>
            <Navbar />
        </Router>
    )

}