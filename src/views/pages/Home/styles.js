const styles = {
    container: {
        width: '100%',
    },
    content: {
        width: '100%',
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    hMenuWrapper: {
        backgroundColor: '#eae7dc',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    hMenuIcon: {
        width: 36,
        height: 36,
        // filter: 'invert(38%) sepia(81%) saturate(902%) hue-rotate(326deg) brightness(99%) contrast(84%)',
        // filter: 'invert(62%) sepia(5%) saturate(169%) hue-rotate(8deg) brightness(89%) contrast(87%)',
    },
    hMenuBtn: {
        cursor: 'pointer',
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'center',
        height: 40,
        display: 'flex',
        alignItems: 'center',
        borderStyle: 'solid',
        borderColor: '#eae7dc',
        borderWidth: 1,
        minWidth: 100,
        justifyContent: 'center'
    },
    hMenuBigText: {
        color: '#000',
        fontSize: '0.8rem',
        fontWeight: 100,
    },
    hMenuSmallText: {
        color: '#000',
        fontSize: '0.7rem'
    }
};

export default styles;
