import { Text } from 'react-native'
import styles from '../styles/loader.scss'

export default function Loader() {
    return (
        <>
            <Image style={styles.logo} source={logo} />
            <Text style={styles.loading_txt} >Ok Booker !</Text>
        </>
    )
}