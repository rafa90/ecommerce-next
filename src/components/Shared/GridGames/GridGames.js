import Link from "next/link";
import {map} from "lodash";
import {fn} from "@/utils";
import {Label} from "@/components/Shared";
import styles from "./GridGames.module.scss";
import { ENV } from "@/utils";

export function GridGames(props) {
    const {games} = props;
    //console.log(games);
    console.log("📦 Juego individual:", games);

  return (
    <div className={styles.gridGames}>
            {map( games, (game) => (


        <Link key={game.id} href={`/${game.slug}`} className={styles.game}>
           <div>
              <img src={`${ENV.SERVER_HOST}${game.cover.url}`} />
              {game.discount>0 &&(
                <Label.Discount className={styles.discount}>
                    {`-${game.discount}%`}
                </Label.Discount>
              )} 
            </div> 

            <div>
               <span> {game.title}</span> 
               <span className={styles.price}>
                  {fn.calcDiscountedPrice(
                    game.price, 
                    game.discount
                )}
                $
               </span>
            </div>
        </Link>
      ))}
    </div>
  );
}
