import {useState, useEffect} from "react";
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import { forEach, map } from "lodash";
import {useAuth, useCart} from "@/hooks";
import {Cart} from "@/api";
import {fn, ENV, authFetch} from "@/utils";
import styles from "./Resume.module.scss";
import { Order } from "@/api";

const orderCtrl = new Order();

const cartCtrl = new Cart();


export function Resume(props) { 
    const {games, addressSelected} = props;
    const [total, setTotal]= useState(null);
    const [loading, setLoading] = useState(false);
    
    const {deleteAllItems} = useCart();
    const {user} = useAuth();
    const router = useRouter();

    useEffect(() => {
        
        let totalTemp= 0;

        forEach(games, (game) =>{
            const price= fn.calcDiscountedPrice(
                game.price,
                game.discount
            );
            totalTemp += price * game.quantity;
        });

        setTotal(totalTemp.toFixed(2));
    }, [games]);

    /*
    const onPay = async () => {
      setLoading(true);

 await orderCtrl.create({
  user: user.id,
  totalPayment: parseFloat(total),
  addressShipping: JSON.stringify(addressSelected),
  products: JSON.stringify(
    games.map((game) => ({
      id: game.id,
      title: game.title,
      quantity: game.quantity,
      cover: game.cover,
      platform:game.platform,
      price:game.price,
    }))
  )
});

      deleteAllItems();
      goToStepEnd();
     
      //aca va lo de stripe

      setTimeout(() => {
        setLoading (false);
      }, 1000);
    };

    */

    const onPay = async () => {
  setLoading(true);

  // Guardar la orden en Strapi
  await orderCtrl.create({
    user: user.id,
    totalPayment: parseFloat(total),
    addressShipping: JSON.stringify(addressSelected),
    products: JSON.stringify(
      games.map((game) => ({
        id: game.id,
        title: game.title,
        quantity: game.quantity,
        cover: game.cover,
        platform: game.platform,
        price: game.price,
      }))
    )
  });

  // 📝 Armar mensaje de resumen para WhatsApp
  const productsMsg = games.map(
    (game) =>
      `📦 *${game.title}* (${game.platform.title})\nCantidad: ${game.quantity}\nPrecio unitario: ${game.price}$`
  ).join("\n\n");

  const totalMsg = `💰 *Total:* ${total}$`;

  //const addressMsg = `📍 *Dirección de envío:*\n${addressSelected.title}\n${addressSelected.address}, ${addressSelected.city}`;

  const userMsg = `👤 *Cliente:* ${user.username}`;

  const fullMessage = encodeURIComponent(
    `${userMsg}\n\n${productsMsg}\n\n${totalMsg}\n\n`
  );

  // Cambiá este número por el del proveedor (ej: "595981234567")
  const providerPhone = "+595982713994";

  // Abrir WhatsApp con el mensaje
  window.open(`https://wa.me/${providerPhone}?text=${fullMessage}`, "_blank");

  // Vaciar carrito y avanzar al paso 3
  deleteAllItems();
  goToStepEnd();

  setTimeout(() => {
    setLoading(false);
  }, 1000);
};

    const goToStepEnd = () => {
      router.replace({query: {...router.query, step:3}});
    };
    

    if(!total) return null;

  return (
    <div className={styles.resume}>
      <h2>Resumen</h2>

      <div className={styles.block}>
        <div className={styles.products}>
           {map(games, (game) => (
            <div key={game.id} className={styles.product}>
                <div>
                    <p>{game.title}</p>
                    <span>{game.platform.title}</span>
                </div>

                    <span>
                        {game.quantity > 0 && `${game.quantity}x`}
                        {fn.calcDiscountedPrice(
                            game.price,
                            game.discount
                            )}
                            $
                    </span>
                </div>
           ))} 
        </div>
      </div>

     <div className={styles.blockTotal}>
       <div>
         <span>Total</span>
         <span>{total}$</span>
       </div>
       
         <Button 
            color="green"
            fluid 
            onClick={onPay} 
            loading={loading}>
            Comprar por WhatsApp
         </Button>
     </div> 
    </div>
  );
}

