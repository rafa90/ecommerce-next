import *as Yup from "yup";

export function initialValus(firstname, lastname){
    return {
        firstname,
        lastname,
    };
}

export function validationSchema(){
    return Yup.object ({
      firstname: Yup.string().required(true),
      lastname: Yup.string().required(true),
    });
}