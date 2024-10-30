import { MainPalette } from '@/constants/Colors';
import { Dimensions, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    screen:{
        flex: 1,
        backgroundColor: MainPalette.background,
    },
    container: {
        flex: 1,
        backgroundColor: MainPalette.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: Dimensions.get('window').width,
        //   width: '90%',
        height: Dimensions.get('window').height - 200,
        borderRadius: 10,
        // elevation: 10,
        backgroundColor: MainPalette.cardBg,
        borderColor: MainPalette.cardBorder,
        borderWidth: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardTextContainer: {
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        color: '#888',
        marginTop: 5,
    },
    specifications: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
});
