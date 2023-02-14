import { Text } from 'react-native'
import styles from '../styles/success.scss'
import Icon from 'react-native-vector-icons/Entypo'
import Animated, { Keyframe } from 'react-native-reanimated'
import { useEffect } from 'react'

export default function Success({ successMessage, success, setSuccess }) {

    useEffect(() => {
        setTimeout(() => {
            setSuccess(false)
        }, 1000)
    }, [success])

    const keyframe = new Keyframe({
        from: {
            opacity: 1,
        },
        to: {
            opacity: 0,
        }
    })

    return (
        <Animated.View exiting={keyframe.duration(1000)} style={styles.section}>
            <Icon style={styles.icon} name='check' />
            <Text style={styles.title}>{successMessage}</Text>
        </Animated.View>
    )
}