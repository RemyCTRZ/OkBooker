import { View, Text, Pressable } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigate } from 'react-router-native'
import { useEffect, useState } from 'react';
import styles from '../styles/return.scss'
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons'

export default function ReturnScan({ selectedSpot, setError, setBook, setConfirmDialog, URL }) {

    const [scannerShow, setScannerShow] = useState(false)
    const [scanned, setScanned] = useState(false);
    let navigate = useNavigate();

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        let bookId = JSON.parse(data).bookId
        if (!bookId) {
            setError('Invalid QR code')
        }
        else {
            axios.get(`${URL}/books/${bookId}`)
                .then((response) => {
                    setScannerShow(false)
                    setBook({
                        id: response.data.result._id,
                        title: response.data.result.title
                    })
                    setConfirmDialog({
                        borrow: false,
                        return: true,
                    })
                })
                .catch(() => {
                    setError('No book found')
                })
        }
    }

    return (
        <View style={styles.section}>
            <View style={styles.top}>
                <Pressable style={styles.top_container} onPress={() => navigate(-1)}>
                    <Icon style={styles.back} name="caret-back" />
                    {selectedSpot &&
                        <Text style={styles.header}>
                            Return at <Text style={styles.spot}>{selectedSpot}</Text>
                        </Text>}
                </Pressable>
                <Text style={styles.title}>To return a book :</Text>
                <Text style={styles.list_item_done}><Text style={styles.li_number}>1.</Text> Scan the QR code on the spot</Text>
                <Text style={styles.list_item}><Text style={styles.li_number}>2.</Text> Scan the QR code on the book</Text>
                <Text style={styles.list_item}><Text style={styles.li_number}>3.</Text> Confirm your return on the app</Text>
                <Text style={styles.list_item}><Text style={styles.li_number}>4.</Text> Place back the book in the shelf at the spot</Text>
            </View>
            <Text style={styles.guideline}>Scan the book</Text>
            {scannerShow && <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={styles.scanQR} />}
            {scanned && <Pressable style={styles.scan_pressable} onPress={() => setScanned(false)}>
                <Text style={styles.scan_btn}>Tap to scan again</Text>
            </Pressable>}
        </View>
    )
};