import { View, Text, Button, Pressable } from 'react-native'
import styles from '../styles/return.scss'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigate } from 'react-router-native'

export default function Return({ setSelectedSpot, setError, setErrorMessage }) {

    const [scanned, setScanned] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);

    let navigate = useNavigate();

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        let spotName = JSON.parse(data).spotName
        if (!spotName) {
            setError(true)
            setErrorMessage('No spot found')
        }
        setSelectedSpot(spotName)
        navigate('/return-2')
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
                    <Text style={styles.header}>Return</Text>
                </Pressable>
                <Text style={styles.title}>To return a book :</Text>
                <Text style={styles.list_item}><Text style={styles.li_number}>1.</Text> Scan the QR code on the spot</Text>
                <Text style={styles.list_item}><Text style={styles.li_number}>2.</Text> Scan the QR code on the book</Text>
                <Text style={styles.list_item}><Text style={styles.li_number}>3.</Text> Confirm your return on the app</Text>
                <Text style={styles.list_item}><Text style={styles.li_number}>4.</Text> Place back the book in the shelf at the spot</Text>
            </View>
            <Text style={styles.guideline}>Scan the spot</Text>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={styles.scanQR} />
            {scanned && <Pressable style={styles.scan_pressable} onPress={() => setScanned(false)}>
                <Text style={styles.scan_btn}>Tap to scan again</Text>
            </Pressable>}
        </View>
    )
}