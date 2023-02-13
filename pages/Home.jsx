import { View, Text } from 'react-native'
import { Link } from 'react-router-native'
import styles from '../styles/home.scss'

export default function Home() {
    return (
        <View style={styles.section}>
            <View style={styles.top}>
                <Text style={styles.greetings}>Welcome to <Text style={styles.span}>Ok Booker</Text> !</Text>
                <Text style={styles.title}>A bit of context...</Text>
                <Text style={styles.paragraph}>This app was created in order to let you borrow books freely on different spots around you.</Text>
                <Text style={styles.title}>How do I borrow a book ?</Text>
                <Text style={styles.paragraph}>To borrow a book, you only need to scan the QR code on a book in one of our spots.</Text>
                <Text style={styles.title}>How do I give a book back ?</Text>
                <Text style={styles.paragraph}>To return a book, you just go to any spot you want, scan both the QR code on the spot and on the book before putting the book back on the shelf.</Text>
            </View>
            <Link to='/borrow' style={styles.button_borrow}>
                <Text style={styles.button_txt_borrow}>Ok booker !</Text>
            </Link>
        </View>
    )
}