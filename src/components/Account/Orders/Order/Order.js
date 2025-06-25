import { useState } from "react";
import { Image } from "semantic-ui-react";
import { DateTime } from "luxon"; 
import { forEach, map } from "lodash";
import { BasicModal } from "@/components/Shared";
import { fn, ENV } from "@/utils";
import styles from "./Order.module.scss";

export function Order(props) {
    const {order} = props;
    const [showModal, setShowModal]=useState(false);
    const createdAt = new Date(order.createdAt).toISOString();
    const products = order.products;
    const address = order.addressShipping;

    const openCloseModal = () => setShowModal((prevState)=> !prevState);

    const getTotalProduts = () => {
        let total = 0;

        forEach(products, (products) => {
            total += products.quantity;
        });
  console.log(products);
        return total;
    };

  return (
   <>
     <div className={styles.order} onClick={openCloseModal}>
        <div>
           <span>
             {DateTime.fromISO(createdAt, {locale:"es"}).toFormat(
             "dd/MM/yyyy")}
            </span>
          <p>{getTotalProduts()} productos</p>
        </div>

       <p>{order.totalPayment.toFixed(2)}$</p>

      </div> 
      <BasicModal 
         show={showModal}
         onClose={openCloseModal}
         title="Información del pedido">
          {map (products, (product) => (
            <div className={styles.product}>
                <Image
                   src={
                    product.cover?.url
                    ? `${ENV.SERVER_HOST}${product.cover.url}`
                    : "/default.jpg"
                }/>

                <div>
                  <div className={styles.info}>
                    <div>
                      <p>{product.title}</p>
                      <p>{product.platform.title}</p>
                    </div>
                  </div>

                  <div>
                    <div className={styles.quantity}>
                      <span>x{product.quantity}</span>
                      <span>{fn.calcDiscountedPrice(product.price, product.discount)}$</span>
                    </div>

                  </div>
                </div>
                 
            </div>
          ))}

          <div className={styles.address}>
             <div>
               <p className={styles.title}>{address.title}</p>
               <p className={styles.addressInfo}>
                {address.name},{address.address},{""}
                {address.state},{address.city},{""}
                {address.postal_code}
              </p>
             </div>
          </div>

          <div className={styles.total}>
            <p>TOTAL: {order.totalPayment.toFixed(2)}$</p>
          </div>
      </BasicModal>
  </>  
    
  );
}
