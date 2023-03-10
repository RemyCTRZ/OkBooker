import { View, Text, Pressable } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigate } from 'react-router-native'
import { useState, useEffect } from 'react';
import styles from '../styles/borrow.scss'
import Icon from 'react-native-vector-icons/Ionicons'
import axios from 'axios'

export default function Borrow({ setError, setMember, URL, setScanReload, scanReload }) {

    const [scanned, setScanned] = useState(false);
    const [hasPermission, setHasPermission] = useState(false)
    let navigate = useNavigate();

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        let memberId = JSON.parse(data).memberId
        setScanReload(!scanReload)
        if (!memberId) {
            setError('Invalid QR code')
        }
        else {
            axios.post(`${URL}/login/QR`, {
                code: memberId
            })
                .then((response) => {
                    setMember(response.data.data[0])
                    navigate('/borrow-2')
                })
                .catch(() => {
                    setError('Wrong credentials')
                })
        }
    };

    if (hasPermission === null) {
        return (
            <View style={styles.error_box}>
                <Text style={styles.error}>Requesting for camera permission</Text>
            </View>
        )
    }
    if (hasPermission === false) {
        return (
            <View style={styles.error_box}>
                <Text style={styles.error}>No access to camera</Text>
            </View>
        )
    }

    return (
        <View style={styles.section}>
            <View style={styles.top}>
                <Pressable style={styles.top_container} onPress={() => navigate(-1)}>
                    <Icon style={styles.back} name="caret-back" />
                    <Text style={styles.header}>Borrow</Text>
                </Pressable>
                <Text style={styles.title}>To borrow a book, follow these steps :</Text>
                <Text style={styles.list_item}><Text style={styles.li_number}>1.</Text> Scan the QR code on your card</Text>
                <Text style={styles.list_item}><Text style={styles.li_number}>2.</Text> Scan the QR code on the book with the app</Text>
                <Text style={styles.list_item}><Text style={styles.li_number}>3.</Text> Confirm your borrowing on the app</Text>
                <Text style={styles.list_item}><Text style={styles.li_number}>4.</Text> Enjoy your book anywhere on the go !</Text>
            </View>
            <Text style={styles.guideline}>Scan your card</Text>
            {scanReload ?
                <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={styles.scanQR} />
                :
                <Text>Sa charge fdp</Text>
            }
            {scanned && <Pressable style={styles.scan_pressable} onPress={() => setScanned(false)}>
                <Text style={styles.scan_btn}>Tap to scan again</Text>
            </Pressable>}
        </View>
    )
}