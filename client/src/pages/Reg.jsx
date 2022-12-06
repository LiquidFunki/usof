import React from 'react';
import RegForm from '../components/RegForm'
import { observer } from "mobx-react-lite";


const Reg = () => {
    return (
        <div style={{display: "flex", justifyContent: "center", height:"100%", backgroundColor:"rgb(234, 231, 231)", alignItems:"center"  }}>

          <RegForm/>
            
        </div>
    );
};

export default observer(Reg);