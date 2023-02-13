import { View, Text } from 'react-native'
import styles from '../styles/error.scss'
import Icon from 'react-native-vector-icons/Entypo'

export default function Error({ errorMessage }) {
    return (
        <View style={styles.section}>
            <Icon style={styles.icon} name='cross' />
            <Text style={styles.title}>{errorMessage}</Text>
        </View>
    )
}