import { useState, useEffect } from "react";
import { Container, Image } from "semantic-ui-react";
import {DateTime} from "luxon";
import Link from "next/link";
import {Game} from "@/api";
import {fn} from "@/utils";
import {Label} from "@/components/Shared";
import { ENV } from "@/utils";
import styles from "./BannerLastGamePublished.module.scss";


const gameCtrl = new Game();

export function BannerLastGamePublished() {
    const [game, setGame] = useState(null);

    useEffect(() => {
      (async() =>{
        try{
          const response= await gameCtrl.getLastPublished();
          setGame(response.data[0]);
        }catch(error){
          console.error(error);
        }
      })();
    }, []);

    if(!game) return null;

    const wallpaper = game.wallpaper;
    const releaseDate = new Date(game.releaseDate).toISOString();
    const price = fn.calcDiscountedPrice(
      game.price, 
      game.discount
    );
    
    //console.log(wallpaper);
  return (
    <div className={styles.container}>
     <img src={`${ENV.SERVER_HOST}${wallpaper.url}`} alt="Wallpaper" />

     <Link className={styles.infoContainer} href={game.slug}>
     
       <Container>
        <span className={styles.date}>
          {DateTime.fromISO(releaseDate).minus({days:1}).toRelative()}
        </span>

        <h2>{game.title}</h2>
        <p className={styles.price}>
          <Label.Discount>-{game.discount}%</Label.Discount>
          <span className={styles.finalPrice}>{price}$</span>
        </p>
       </Container>
     
     </Link>

    </div>
  );
}
