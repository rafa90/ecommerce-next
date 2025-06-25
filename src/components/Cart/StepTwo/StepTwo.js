import { useState } from "react";
import { Separator } from "@/components/Shared";
import { Addresses } from "./Addresses";
import styles from "./StepTwo.module.scss";
import {Resume} from "./Resume";

export function StepTwo(props) {
    const {games} = props;
    const [addressSelected, setAddressSelected]=useState(null);


  return (
    <div className={StyleSheet.StepTwo}>
       <div className={StyleSheet.center}>
         <Addresses 
           addressSelected={addressSelected}
           setAddressSelected={setAddressSelected}
           />
         <Separator height= {50} />
       </div>

       <div className={styles.right}>
         <Resume games={games} addressSelected= {addressSelected} />
       </div>
     
    </div>
  );
}
