import { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import classNames from "classnames";
import { Wishlist } from "@/api";
import { useAuth } from "@/hooks";
import styles from "./WishlistIcon.module.scss";

const wishlistCtrl = new Wishlist();

export function WishlistIcon(props) {
  const { gameId, className, removeCallback } = props;
  const [hasWishlist, setHasWishlist] = useState(null);
  const { user } = useAuth();

 useEffect(() => {
  (async () => {
    try{
     const response = await wishlistCtrl.check(user.id, gameId);
     setHasWishlist(response);
    }catch (error){
      setHasWishlist(false);
      console.error(error);
    }
  })();
}, [gameId]);

  const addWishlist = async () => {
    try {
      // Asumimos que gameId ahora es el documentId del juego (UUID)
      const response = await wishlistCtrl.add(user.id, gameId);
      setHasWishlist(response.data);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const deleteWishlist = async () => {
    try {
      if (!hasWishlist?.id && !hasWishlist?.documentId) return;

      const docId = hasWishlist.documentId || hasWishlist.id;
      await wishlistCtrl.delete(docId);
      setHasWishlist(false);

      if(removeCallback){
        removeCallback();
      }

    } catch (error) {
      console.error("Error deleting from wishlist:", error);
    }
  };

  if (hasWishlist === null) return null;

  return (
    <Icon
      name={hasWishlist ? "heart" : "heart outline"}
      onClick={hasWishlist ? deleteWishlist : addWishlist}
      className={classNames(styles.wishlistIcon, {
        [className]: className,
      })}
    />
  );
}