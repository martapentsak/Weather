import { UV_INDEX_STATUS } from "../constants/textValues"

export const indentifyUvIndex = (index: number) => {
    if (index >= 10) {
        return UV_INDEX_STATUS.extreme
    } else if ( index < 10 && index >= 8) {
        return UV_INDEX_STATUS.veryHight
    } else if ( index < 8 && index >= 6) {
        return UV_INDEX_STATUS.hight
    } 
    else if ( index < 6 && index >= 3) {
        return UV_INDEX_STATUS.moderate
    } 
    else if ( index < 3) {
        return UV_INDEX_STATUS.low
    } 
        
}