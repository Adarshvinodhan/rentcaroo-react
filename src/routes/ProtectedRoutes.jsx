import {Navigate} from 'react-router-dom'

const ProtectedRoutes = ({children})=>{
    const token = localStorage.getItem('token');
    if(token){
        return children;
    }else{
        return <Navigate to ='/login'/>
    }
}

export default ProtectedRoutes
