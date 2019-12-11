const styles = {
    container: {
        width: '100%',
    },
    content: {
        width: '100%',
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    hMenuWrapper: {
        backgroundColor: '#eae7dc',
        borderRadius: 10.5,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        // boxShadow: '0 3px 7px 1px rgba(0, 0, 0, 0.35)'
    },
    hMenuIcon: {
        width: 24,
        height: 24,
        filter: 'invert(38%) sepia(81%) saturate(902%) hue-rotate(326deg) brightness(99%) contrast(84%)', // Đỏ
        // filter: 'invert(62%) sepia(5%) saturate(169%) hue-rotate(8deg) brightness(89%) contrast(87%)', // Xám
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
        fontSize: '0.9rem',
        fontFamily: 'Open Sans, sans-serif'
    },
    cartTitleText: {
        color: '#000',
        fontSize: '0.7rem',
        fontWeight: 'bold',
        fontFamily: 'Open Sans, sans-serif'
    },
    cartAmountText: {
        color: '#000',
        fontSize: '0.7rem',
        fontFamily: 'Open Sans, sans-serif',
        marginLeft: 5,
        marginRight: 5
    },
    eachCartItemWrapper: {
        width: '100%',
        borderBottom: 'solid 1px #d9d9d9',
        paddingTop: 5,
        paddingBottom: 5,
        display: 'flex'
    },
    contentHeaderMenuWrapper: {
        backgroundColor: '#d8c3a5',
        border: 'solid 2px #e85a4f',
        borderTopLeftRadius: 10.5,
        borderBottomLeftRadius: 10.5,
        width: 200,
        height: '100%',
    },
    contentHeaderMenuWrapperSkew: {
        backgroundColor: '#d8c3a5',
        border: 'solid 2px #e85a4f',
        borderLeft: 'none',
        width: 200,
        height: '100%',
        transform: `skewX(30deg)`,
        position: 'absolute',
        left: 20,
        top: 0
    },
    contentHeaderMenuIcon: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentHeaderTextWrapper: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    cartIcon: {
        width: 30,
        height: 30,
        filter: 'invert(0%) sepia(83%) saturate(7431%) hue-rotate(353deg) brightness(83%) contrast(117%)',
        cursor: 'pointer'
    },
    cartWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    badgeWrapper: {
        width: 16,
        height: 16,
        backgroundColor: 'red',
        borderRadius: 50,
        position: 'absolute',
        right: -5,
        top: -5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    categoryTitleWrapper: {
        width: '100%',
        height: 30,
        backgroundColor: '#f9f9f9',
        display: 'flex',
        alignItems: 'center',
        borderLeft: 'solid 2px #e85a4f',
        paddingLeft: 20,
        marginBottom: 20
    },
    categoryOptionsWrapper: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 20,
        position: 'relative'
    },
    addCakeWrapper: {
        position: 'absolute',
        right: 0
    },
    categoryTitleText: {
        color: '#e85a4f',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontFamily: 'Open Sans, sans-serif'
    },
    eachCategory: {
        marginTop: 20,
        width: '100%'
    },
    bakeryShadowWrapper: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    newBakeryWrapper: {
        position: 'absolute',
        top: 10,
        left: 0,
        width: 100,
        paddingTop: 5,
        paddingBottom: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(234, 231, 220, 0.9)',
        borderRight: 'solid 3px #e85a4f'
    },
    deleteWrapper: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 20,
        height: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
    },
    outOfBakeryWrapper: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 5,
        paddingBottom: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 45,
        border: 'solid 2px #e85a4f'
    },
    outOfBakeryText: {
        color: '#e85a4f',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        fontFamily: 'Open Sans, sans-serif'
    },
    bakeryName: {
        fontWeight: 'bold',
        fontSize: '1rem',
        color: 'black',
        fontFamily: 'Montserrat, sans-serif'
    },
    showMoreWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    showMoreText: {
        fontSize: '1rem',
        color: 'black',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 100,
        textAlign: 'right',
        cursor: 'pointer',
        marginTop: 20
    },
    bakeryCode: {
        fontSize: '0.8rem',
        color: '#5c5c5c',
        fontStyle: 'italic'
    },
    bakeryPrice: {
        fontWeight: 'bold',
        fontSize: '1rem',
        color: 'black',
        fontFamily: 'Open Sans, sans-serif'
    },
    bakeryImageWrapper: {
        width: '100%',
        position: 'relative'
    },
    bakeryImage: {
        width: '100%'
    },
    eachBakery: {
        cursor: 'pointer',
        border: 'solid 1px transparent'
    },
    editIcon: {
        width: 20,
        height: 20,
        position: 'absolute',
        right: 5,
        bottom: 5,
        cursor: 'pointer',
        filter: 'invert(38%) sepia(81%) saturate(902%) hue-rotate(326deg) brightness(99%) contrast(84%)', // Đỏ
    },
    facebookLoginBtn: {
        width: '100%',
        height: 30,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        border: 'none',
        outline: 'none',
        backgroundColor: 'transparent'
    },
    facebookLoginIcon: {
        width: 24,
        height: 24,
        marginRight: 10
    },
    facebookLoginText: {
        color: 'black',
        fontSize: '0.9rem'
    },
    userPopoverIcon: {
        width: 12,
        height: 12,
        marginRight: 5
    },
    paymentBtnWrapper: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        marginTop: 10
    },
    paymentBtn: {
        border: 'none',
        outline: 'none',
        backgroundColor: 'rgb(232, 90, 79)',
        height: 30,
        paddingLeft: 30,
        paddingRight: 30,
        cursor: 'pointer'
    },
    paymentBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: '0.8rem'
    }
};

export default styles;
