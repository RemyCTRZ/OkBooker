import { View, Text, Pressable } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigate } from 'react-router-native'
import { useState } from 'react';
import styles from '../styles/borrow.scss'
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons'

export default function BorrowScan({ setError, setErrorMessage, member, setSuccess, setSuccessMessage, bookTitle, setBookTitle, confirmDialog, setConfirmDialog, URL }) {

    const [scanned, setScanned] = useState(false);

    let navigate = useNavigate();

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        let bookId = JSON.parse(data).bookId
        if (!bookId) {
            setErrorMessage('No book found')
            setError(true)
        }
        else {
            axios.get(`${URL}/books/${bookId}`)
                .then((response) => {
                    console.log(response)
                    setBookTitle(response.result.title)
                    setConfirmDialog(true)
                })
                .catch((error) => {
                    console.log(error)
                })

            setSuccessMessage('Successfully borrowed !')
            setSuccess(true)
        }
    };

    const confirm = (() => {
        axios.post(`${URL}/borrow/${bookId}`, {
            user: member.code
        })
            .then(() => {
                setSuccessMessage(`${bookTitle} successfully borrowed !`)
                setSuccess(true)
            })
            .catch((error) => {
                console.log(error)
            })
    })

    return (
        <View style={styles.section}>
            <View style={styles.top}>
                <Pressable style={styles.top_container} onPress={() => navigate(-1)}>
                    <Icon style={styles.back} name="caret-back" />
                    <Text style={styles.header}>Hey, <Text style={styles.member}>{member.name}</Text></Text>
                </Pressable>
                <Text style={styles.title}>To borrow a book, follow these steps :</Text>
                <Text style={styles.list_item_done}><Text style={styles.li_number}>1.</Text> Scan the QR code on your card</Text>
                <Text style={styles.list_item}><Text style={styles.li_number}>2.</Text> Scan the QR code on the book with the app</Text>
                <Text style={styles.list_item}><Text style={styles.li_number}>3.</Text> Confirm your borrowing on the app</Text>
                <Text style={styles.list_item}><Text style={styles.li_number}>4.</Text> Enjoy your book anywhere on the go !</Text>
            </View>
            <Text style={styles.guideline}>Scan the book</Text>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={styles.scanQR} />
            {scanned &&
                <Pressable style={styles.scan_pressable} onPress={() => setScanned(false)}>
                    <Text style={styles.scan_btn}>Tap to scan again</Text>
                </Pressable>}
            {confirmDialog && bookTitle &&
                <View style={styles.dialog}>
                    <Text style={styles.dialog_txt}>Borrow {bookTitle} ?</Text>
                    <View style={styles.dialog_btns}>
                        <Pressable style={styles.dialog_btn_yes} onPress={confirm}>
                            <Text style={styles.dialog_btn_txt_yes}>Yes</Text>
                        </Pressable>
                        <Pressable style={styles.dialog_btn_no} onPress={() => navigate('/borrowings')}>
                            <Text style={styles.dialog_btn_txt_no}>No</Text>
                        </Pressable>
                    </View>
                </View>}
        </View >
    )
}