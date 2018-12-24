import { UID, IS_AUTH, ERROR_STATE} from './mutations_type';


let setIsAuth = ({commit}, data) => {//상태-로그인 상태 지정
    cimmit(IS_AUTH, data);
}

export default{
    async login(store, {user, password}){
        
    }
}