import Link from "next/link";
import {map} from "lodash";
import { Label, WishlistIcon } from "@/components/Shared";
import { fn } from "@/utils";
import styles from "./GridGames.module.scss";
import { ENV} from "@/utils";

export function GridGames(props) {
    const { wishlist, onReload} = props;

return (
  
    <div className={styles.gridGames}>
      {map(wishlist, (item) => {
        const game = item.game;
        if (!game) return null;

        const cover = game.cover;
        const imageUrl = cover?.url
          ? `${ENV.SERVER_HOST}${cover.url}`
          : "/default-cover.jpg";

        return (
          <div key={item.id} className={styles.game}>
            <Link href={`/${game.slug}`}>
              <div>
                <img src={imageUrl} alt={game.title || "Game"} />

                {game.discount > 0 && (
                  <Label.Discount className={styles.discount}>
                    {`-${game.discount}%`}
                  </Label.Discount>
                )}
              </div>

                <div>
                  <span>{game.title}</span>
                  <span className={styles.price}>
                    {fn.calcDiscountedPrice(
                    game.price,
                    game.discount
                    )}
                    $
                  </span>

                </div>
            </Link>

             <WishlistIcon 
              gameId={game.id} 
              className={styles.whislistIcon} 
              removeCallback={onReload}
            />

          </div>
        );
      })}
    </div>
  );

}
