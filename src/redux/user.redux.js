import axios from "axios";
import { getRedirectPath } from "./../util";


const ERROR_MSG='ERROR_MSG';
const LOAD_DATA='LOAD_DATA';
const AUTH_SUCCESS='AUTH_SUCCESS';
const LOGOUT='LOGOUT';


const initState={
    redirectTo:'',
    msg:'',   
    type:'',
    user:'',
    
}

//reducer
export function user(state=initState,action) {
    switch (action.type) {
     case AUTH_SUCCESS:
     return  {...state,msg:'',redirectTo:getRedirectPath(action.payload),...action.payload}
    case LOAD_DATA:
    return {...state,...action.payload}
    case LOGOUT:
    return {...initState,redirectTo:'/login'}
     case ERROR_MSG:   
     return  {...state,isAuth:false,msg:action.msg} 
    
        default:
        return state;
    }

}


function errorMsg(msg) {
    return {msg,type:ERROR_MSG}
    
}

function authSuccess(obj) {
    const {pwd,...data}=obj
    return {type:AUTH_SUCCESS,payload:data}
}
export function logoutSubmit() {
    return {type:LOGOUT}
}
export function updata(data) {
    if(!data.avatar||!data.title||!data.desc)
    {
        return errorMsg('信息必须填写完全！')
    }
    return dispatch=>{
     axios.post('/user/updata',data)
     .then(res=>{
        if(res.status==200&&res.data.code===0)
        {
         dispatch(authSuccess(res.data.data))
        }else
        {
         dispatch(errorMsg(res.data.msg))
        }

     })

    }

    
}


export function loadData(data) {  
    return {type:LOAD_DATA,payload:data}
  }
export function login({user,pwd}) {
    if(!user||!pwd)
    {
        return errorMsg('用户名密码必须输入')
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd})
        .then(res=>{
           if(res.status==200&&res.data.code===0)
           {
           
           console.log(res.data.data)
            dispatch(authSuccess(res.data.data))
           }else
           {
            dispatch(errorMsg(res.data.msg))
           }
    
        })
    }
    
}
export function register({user,pwd,type,repeatpwd}) {
    if(!user||!pwd||!type)
    {
        return errorMsg('用户名密码必须输入')
    }
    if(pwd!==repeatpwd)
    {
        return errorMsg('密码与确认密码不同')
    }
    return dispatch=>{
    axios.post('/user/register',{user,pwd,type})
    .then(res=>{
       if(res.status==200&&res.data.code===0)
       {
        dispatch(authSuccess(res.data.data))
       }else
       {
        dispatch(errorMsg(res.data.msg))
       }

    })
}
}