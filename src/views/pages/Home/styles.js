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
        fontSize: '0.7rem'
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
    categoryTitleText: {
        color: '#e85a4f',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        textTransform: 'uppercase'
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
        fontWeight: 'bold'
    },
    bakeryName: {
        fontWeight: 'bold',
        fontSize: '1rem',
        color: 'black'
    },
    bakeryCode: {
        fontSize: '0.8rem',
        color: '#5c5c5c',
        fontStyle: 'italic'
    },
    bakeryPrice: {
        fontWeight: 'bold',
        fontSize: '1rem',
        color: 'black'
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
    footerWrapper: {
        position: 'relative'
    },
    footerCover: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 20
    },
    developerWrapper: {
        width: '100%',
        height: 50,
        backgroundColor: '#444',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    noCopyrightText: {
        color: '#aaa',
        fontSize: '0.8rem'
    },
    developer: {
        color: 'white',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        marginLeft: 3
    },
    developerIcon: {
        width: 24,
        height: 24,
        cursor: 'pointer',
        filter: 'invert(50%) sepia(0%) saturate(28%) hue-rotate(152deg) brightness(92%) contrast(81%)'
    },
    developerIconWrapper: {
        marginLeft: 20
    },
    footerText: {
        color: 'white',
        fontSize: '0.8rem'
    },
    logoImg: {
        filter: 'invert(38%) sepia(81%) saturate(902%) hue-rotate(326deg) brightness(99%) contrast(84%)', // Đỏ
        height: '90%',
        maxHeight: 100
    },
    footerContentWrapper: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerIcon: {
        width: 24
    },
    daisyInfo: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
    },
    iconWrapper: {
        width: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
};

export default styles;
