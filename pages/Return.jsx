import { View, Text, Pressable } from 'react-native'
import { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigate } from 'react-router-native'
import styles from '../styles/return.scss'
import Icon from 'react-native-vector-icons/Ionicons'

export default function Return({ setSelectedSpot, setError, scanReload, setScanReload }) {

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

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        let spotName = JSON.parse(data).spotName
        setScanReload(!scanReload)
        if (!spotName) {
            setError('Invalid QR code')
        }
        else {
            setSelectedSpot(spotName)
            navigate('/return-2')
        }
    };

    if (hasPermission === null) {
        return (
            <View style={styles.error_box}>
                <Text style={styles.error}>Requesting for camera permission</Text>
            </View>
        );
    }
    if (hasPermission === false) {
        return (
            <View style={styles.error_box}>
                <Text style={styles.error}>No access to camera</Text>
            </View>
        );
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

            {scanReload ?
                <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={styles.scanQR} />
                :
                <Text>Sa charge fdp</Text>
            }

            {scanned &&
                <Pressable style={styles.scan_pressable} onPress={() => setScanned(false)}>
                    <Text style={styles.scan_btn}>Tap to scan again</Text>
                </Pressable>}
        </View>
    )
}