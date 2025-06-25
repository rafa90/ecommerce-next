import {useState} from "react";
import { Button, Container, Icon,Image } from "semantic-ui-react";
import { fn } from "@/utils";
import { useCart } from "@/hooks";
import {WishlistIcon} from "@/components/Shared";
import styles from "./Panel.module.scss";
import { ENV } from "@/utils";

export function Panel(props) {
  const { gameId, game } = props;
  const [loading, setLoading]= useState(false);
  const {addCart} = useCart();

  const platform = game.platform;
  const buyPrice = fn.calcDiscountedPrice(game.price, game.discount);

  const addCartWrapper = () => {
    setLoading(true)
    addCart(game);

    setTimeout(() => {
      setLoading(false);
    }, 500) ;
  };

  const sendWhatsapp = () => {
  const price = fn.calcDiscountedPrice(game.price, game.discount);
  const message = `Hola, quiero comprar los produtos *${game.title}* para *${game.platform.title}* por *${price}$*.`;
  const phone = "+595982713994"; // Número del proveedor sin + ni espacios
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
};



  return (
    <Container className={styles.panel}>
      <div className={styles.imgContainer}>
        <Image src={`${ENV.SERVER_HOST}${game.cover.url}`} />
      </div>

      <div className={styles.actionsContainer}>
        <div>
          <h2>{game.title}</h2>

          {/* Fila de plataforma + stock */}
          <div className={styles.moreInfo}>
            <span>
              <Image src={`${ENV.SERVER_HOST}${platform.icon.url}`} />
              {platform.title}
            </span>
            <span>
              <Icon name="check" />
              En stock
            </span>
          </div>

          {/* Ahora el precio debajo */}
          <div className={styles.price}>
            {game.discount > 0 && (
              <>
                <span className={styles.originalPrice}>
                  <Icon name="tag" />
                  {game.price}$
                </span>

                <span className={styles.discount}>-{game.discount}%</span>
              </>
            )}
            <span className={styles.discount}>{buyPrice}$</span>
          </div>

            <Button primary fluid onClick={addCartWrapper} loading={loading}>
               Añadir a carrito 
            </Button>

            <WishlistIcon gameId={gameId} className={styles.heart} />

            <Button 
               color="green" 
               fluid 
               onClick={sendWhatsapp}
               style={{ marginTop: 10 }}>
               Comprar por WhatsApp
            </Button>

        </div>
      </div>
    </Container>
  );





}