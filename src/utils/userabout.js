import {v4 as uuidv4} from 'uuid';

export function getUserTempId(){
    //生成临时标识
    let userTempId = localStorage.getItem('userTempId_key')
    if(!userTempId){
        //没有
        uuidv4();
        localStorage.setItem('userTempId_key',userTempId)
    }
    return userTempId;
}
