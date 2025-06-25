import { useState, useEffect } from "react";
import { Button, Step } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { forEach } from "lodash";
import { fn } from "@/utils";
import styles from "./Resume.module.scss";

export function Resume(props) {
    const {games} = props;
    const router= useRouter();

    const [totals, setTotals]= useState(null);
    console.log(totals);
    

    useEffect(()=>{
        let totals= {
            original:0,
            discount:0,
            price:0,
        };

        forEach(games,(game)=>{
            const price= fn.calcDiscountedPrice(
                game.price,
                game.discount,
            );

            totals= {
                original: totals.original + game.price * game.quantity,
                discount: 
                  totals.discount + (game.price-price)*game.quantity,
                  price: totals.price + price * game.quantity,
                };
        });

        setTotals(totals);
    }, [games]);

    const goTostepTwo = () =>{
       router.replace({query: { ...router.query, step: 2}});
    }

    if(!totals) return null;

  return (
    <div className={styles.resume}>
      <h2>Resume</h2>

      <div className={styles.block}>
        <div className={styles.price}>
           <div>
             <span>Precio oficial</span>
             <span>{totals.original.toFixed(2)}$</span>
            </div>
            <div>
             <span>Descuento</span>
             <span>{totals.discount.toFixed(2)}$</span>
            </div>
            
            <div>
             <span>Subtotal</span>
             <span>{totals.price.toFixed(2)}$</span>
           </div>
        </div>

        <Button primary fluid onClick={goTostepTwo}>
            Proceder con el pedido
        </Button>

        <Link href="/">Continuar comprando</Link>
      </div>
    </div>
  );
}
