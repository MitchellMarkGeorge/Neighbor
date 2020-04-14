import { useMediaQuery } from 'react-responsive'


export const Desktop = ({ children }) => { // reconsider this
    const isDesktop = useMediaQuery({ minWidth: 701 })
    return isDesktop ? children : null
}

export const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 700 })
    return isMobile ? children : null
}