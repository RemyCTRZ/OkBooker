import { Pressable, Text, View } from 'react-native'
import { Link, useNavigate } from 'react-router-native'
import { useState } from 'react'
import styles from '../styles/borrowings.scss'
import IconFA from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Ionicons'

export default function Borrowings() {

    const [lost, setLost] = useState(false)

    const borrowings = [
        {
            name: 'Harry Potter',
            author: 'J. K. Rowling',
        },
        {
            name: 'One Piece',
            author: 'Eichiro Oda',
        },
        {
            name: 'Naruto',
            author: 'Masashi Kishimoto',
        },
        {
            name: 'Naruto',
            author: 'Masashi Kishimoto',
        },
        {
            name: 'Naruto',
            author: 'Masashi Kishimoto',
        },
    ]

    let navigate = useNavigate();

    return (
        <View style={styles.section}>
            <Pressable style={styles.top} onPress={() => navigate(-1)}>
                <Icon style={styles.back} name="caret-back" />
                <Text style={styles.header}>My borrowings</Text>
            </Pressable>
            <View style={borrowings ? styles.book_list : styles.book_list_empty}>
                {lost &&
                    <View style={styles.lost_box} onPress={() => setLost(false)}>
                        <Text style={styles.lost_txt}>CHEH</Text>
                    </View>}
                {borrowings ?
                    borrowings.map((book, index) => {
                        return (
                            <View style={styles.book} key={index}>
                                <View style={styles.book_infos}>
                                    <Text style={styles.book_name}>{book.name}</Text>
                                    <Text style={styles.book_author}>{book.author}</Text>
                                </View>
                                <IconFA style={styles.lost} onPress={() => setLost(true)} name='map-marker-question-outline' />
                            </View>
                        )
                    })
                    :
                    <Text style={styles.not_found}>No books found</Text>
                }
            </View>
            <View style={styles.bottom}>
                <Link style={styles.button} to={'/borrow'} >
                    <Text style={styles.button_txt}>Borrow</Text>
                </Link>
                <Link style={styles.button} to={'/return'} >
                    <Text style={styles.button_txt}>Return</Text>
                </Link>
            </View>
        </View>
    )
}