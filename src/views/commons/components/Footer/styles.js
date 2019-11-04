const styles = {
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
        padding: 20,
        width: '100%',
        backgroundColor: '#353535',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    noCopyrightText: {
        textTransform: 'uppercase',
        color: '#979797',
        fontSize: '0.8rem',
        fontFamily: 'Montserrat, sans-serif'
    },
    developer: {
        color: 'white',
        fontSize: '0.8rem',
        marginLeft: 3,
        textTransform: 'uppercase',
        fontFamily: 'Montserrat, sans-serif',
        cursor: 'pointer'
    },
    footerText: {
        color: 'white',
        fontSize: '0.8rem',
        fontFamily: 'Montserrat, sans-serif'
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
