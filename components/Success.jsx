import { View, Text } from 'react-native'
import styles from '../styles/success.scss'
import Icon from 'react-native-vector-icons/Entypo'

export default function Success({ successMessage }) {
    return (
        <View style={styles.section}>
            <Icon style={styles.icon} name='check' />
            <Text style={styles.title}>{successMessage}</Text>
        </View>
    )
}