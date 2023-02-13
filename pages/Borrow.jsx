import { View, Text, Button, Pressable } from 'react-native'
import styles from '../styles/borrow.scss'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigate } from 'react-router-native'

export default function Borrow({ setError, setErrorMessage, setSelectedId }) {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
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
        if (!memberId) {
            setErrorMessage('No member found')
            setError(true)
        }
        setSelectedId(memberId)
        navigate('/borrow-2')
        setScanned(false);
    };

    if (hasPermission === null) {
        return <Text style={styles.error}>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text style={styles.error}>No access to camera</Text>;
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
            <View style={styles.bottom}>
                <Text style={styles.guideline}>Scan your card</Text>
                <View style={styles.scan}>
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={styles.scanQR}
                        height={250} width={250}
                    />
                    {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
                </View>
            </View>
        </View>
    )
}