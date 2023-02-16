import { View, Text } from 'react-native'
import styles from '../styles/navbar.scss'
import Icon from 'react-native-vector-icons/Entypo'
import { Link } from 'react-router-native'

export default function Navbar() {
    return (
        <View style={styles.navbar}>
            <Link to='/return' style={styles.button}>
                <>
                    <Icon style={styles.icon} name='download' />
                    <Text style={styles.txt}>Return</Text>
                </>
            </Link>
            <Link to='/borrowings' style={styles.button}>
                <>
                    <Icon style={styles.icon} name='book' />
                    <Text style={styles.txt}>My books</Text>
                </>
            </Link>
            <Link to='/borrow' style={styles.button}>
                <>
                    <Icon style={styles.icon} name='plus' />
                    <Text style={styles.txt}>Borrow</Text>
                </>
            </Link>
        </View>
    )
}