import * as documentAction from './actions';
import { v4 as uuidv4 } from 'uuid';

export const setDocument = (skinCd) => {
    return {
        type: documentAction.SET_SKIN,
        payload: {
            id: uuidv4(),
            skinCd: skinCd
        }
    }
}

export const updateDocument = (skinCd) => {
    return {
        type: documentAction.UPDATE_SKIN,
        payload: {
            skinCd: skinCd
        }
    }
}