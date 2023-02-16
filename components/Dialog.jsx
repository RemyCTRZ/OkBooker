import axios from 'axios';
import { View, Text, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native';
import styles from '../styles/dialog.scss'

export default function Dialog({ setSuccess, setError, confirmDialog, setConfirmDialog, book, selectedSpot, member, URL }) {

    let navigate = useNavigate();

    const confirm = (() => {
        if (confirmDialog.borrow) {
            axios.post(`${URL}/borrow/${book.id}`, {
                user: member.code
            })
                .then(() => {
                    setConfirmDialog()
                    setSuccess(`${book.title} successfully borrowed !`)
                    navigate('/borrowings')
                })
                .catch(() => {
                    setConfirmDialog()
                    setError("Can't borrow this book")
                })
        }
        else {
            axios.put(`${URL}/borrow/${book.id}`, {
                location: selectedSpot
            })
                .then((response) => {
                    setConfirmDialog()
                    setSuccess(`${book.title} successfully returned !`)
                    navigate('/borrowings')
                })
                .catch((error) => {
                    setConfirmDialog()
                    setError("Can't return this book")
                })
        }
    })

    return (
        <View style={styles.allScreen}>
            <View style={styles.dialog}>
                <Text style={styles.dialog_txt}>{confirmDialog.borrow ? 'Borrow' : 'Return'} <Text style={styles.dialog_title}>{book.title}</Text> ?</Text>
                <View style={styles.dialog_btns}>
                    <Pressable style={styles.dialog_btn_yes} onPress={() => confirm()}>
                        <Text style={styles.dialog_btn_txt_yes}>Yes</Text>
                    </Pressable>
                    <Pressable style={styles.dialog_btn_no} onPress={() => {
                        setConfirmDialog()
                        navigate('/borrowings')
                    }}>
                        <Text style={styles.dialog_btn_txt_no}>No</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}