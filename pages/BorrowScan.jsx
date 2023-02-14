import { View, Text, Pressable } from 'react-native'
import styles from '../styles/borrow.scss'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigate } from 'react-router-native'

export default function BorrowScan({ setError, setErrorMessage, selectedId, setSuccess, setSuccessMessage }) {

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
            setSuccessMessage('Successfully borrowed !')
            setSuccess(true)
        }
    };

    return (
        <View style={styles.section}>
            <View style={styles.top}>
                <Pressable style={styles.top_container} onPress={() => navigate(-1)}>
                    <Icon style={styles.back} name="caret-back" />
                    <Text style={styles.header}>Hey, <Text style={styles.member}>{selectedId}</Text></Text>
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
            {scanned && <Pressable style={styles.scan_pressable} onPress={() => setScanned(false)}>
                <Text style={styles.scan_btn}>Tap to scan again</Text>
            </Pressable>}
        </View >
    )
}