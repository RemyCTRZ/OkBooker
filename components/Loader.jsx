import { Text, Image } from 'react-native'
import logo from '../assets/logo.png'
import styles from '../styles/loader.scss'

export default function Loader() {
    return (
        <>
            <Image style={styles.logo} source={logo} />
            <Text style={styles.loading_txt} >Ok Booker !</Text>
        </>
    )
}