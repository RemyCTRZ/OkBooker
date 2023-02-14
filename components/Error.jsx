import { Text } from 'react-native'
import Animated, { Keyframe } from 'react-native-reanimated'
import styles from '../styles/error.scss'
import { useEffect } from 'react'
import Icon from 'react-native-vector-icons/Entypo'

export default function Error({ errorMessage, setError, error }) {

    useEffect(() => {
        setTimeout(() => {
            setError(false)
        }, 1000)
    }, [error])

    const keyframe = new Keyframe({
        from: {
            opacity: 1,
        },
        to: {
            opacity: 0,
        }
    })

    return (
        <Animated.View style={styles.section} exiting={keyframe.duration(1000)}>
            <Icon style={styles.icon} name='cross' />
            <Text style={styles.title}>{errorMessage}</Text>
        </Animated.View>
    )
}