import { Pressable, Text, View } from 'react-native'
import { Link, useNavigate } from 'react-router-native'
import { useEffect, useState } from 'react'
import styles from '../styles/borrowings.scss'
import IconFA from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Ionicons'
import axios from 'axios'

export default function Borrowings({ URL }) {

    const [borrowings, setBorrowings] = useState()

    const userId = 'Ff3AF432'

    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`${URL}/books`)
            .then((response) => {
                let booksList = response.data.result
                let borrowingsList = []
                for (let i = 0; i < booksList.length; i++) {
                    let lastBorrow = booksList[i].history.length - 1
                    if (booksList[i].history[lastBorrow].user == userId && !booksList[i].history[lastBorrow].rendu) borrowingsList.push(booksList[i])
                }
                if (borrowingsList.length > 0) setBorrowings(borrowingsList)
            })
    }, [])

    return (
        <View style={styles.section}>
            <Pressable style={styles.top} onPress={() => navigate(-1)}>
                <Icon style={styles.back} name="caret-back" />
                <Text style={styles.header}>My borrowings</Text>
            </Pressable>
            <View style={borrowings ? styles.book_list : styles.book_list_empty}>
                {borrowings != undefined ?
                    borrowings.map((book, index) => {
                        return (
                            <View style={styles.book} key={index}>
                                <View style={styles.book_infos}>
                                    <Text style={styles.book_name}>{book.title}</Text>
                                    <Text style={styles.book_author}>{book.author}</Text>
                                </View>
                                <IconFA style={styles.lost} name='map-marker-question-outline' />
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