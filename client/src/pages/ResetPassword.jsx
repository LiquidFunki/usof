import React from 'react';
import ResetPasswordForm from '../components/ResetPasswordForm'
import { observer } from "mobx-react-lite";


const Login = () => {
    return (
        <div style={{display: "flex", justifyContent: "center", height:"100%", backgroundColor:"rgb(234, 231, 231)", alignItems:"center"  }}>

          <ResetPasswordForm/>
            
        </div>
    );
};

export default observer(Login);