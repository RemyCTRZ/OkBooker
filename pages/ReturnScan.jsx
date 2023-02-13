import { View, Text, Button, Pressable } from 'react-native'
import styles from '../styles/returnscan.scss'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigate } from 'react-router-native'

export default function ReturnScan({ selectedSpot, setError }) {

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

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        let bookId = JSON.parse(data).bookId
        if (!bookId) {
            setError(true)
            setErrorMessage('No book found on this QR code')
        }
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
            <View style={styles.bottom}>
                <Text style={styles.guideline}>Scan the book</Text>
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