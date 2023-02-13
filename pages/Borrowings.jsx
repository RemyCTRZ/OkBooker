import { useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import styles from '../styles/borrowings.scss'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigate } from 'react-router-native'

export default function Borrowings() {

    const [borrowings, setBorrowings] = useState(false)
    let navigate = useNavigate();

    return (
        <View style={styles.section}>
            <Pressable style={styles.top} onPress={() => navigate(-1)}>
                <Icon style={styles.back} name="caret-back" />
                <Text style={styles.header}>My borrowings</Text>
            </Pressable>
            <View style={styles.book_list}>
                {borrowings ?
                    <Text style={styles.book_name}>Harry Potter</Text>
                    :
                    <Text style={styles.not_found}>No books found</Text>
                }
            </View>
            <View style={styles.bottom}>
                <Pressable style={styles.button}>
                    <Text style={styles.button_txt}>Borrow</Text>
                </Pressable>
                <Pressable style={styles.button}>
                    <Text style={styles.button_txt}>Return</Text>
                </Pressable>
            </View>
        </View>
    )
}