import {toast } from 'react-toastify';

export function toastUtility(toastType,message){
    toast[toastType](message, {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
    });
}