
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {Game} from "@/api";
import { useCart } from "@/hooks";
import { CartLayout } from "@/layouts";
import {Cart} from "@/components/Cart";
import { Seo } from "@/components/Shared"; 

const gameCtrl= new Game();

export default function CartPage() {
  const { 
     query: {step=1},
     } = useRouter();
     const currentStep = Number (step);
     const[games, setGames]= useState(null);
     const {cart} = useCart();

     useEffect(() => {
      (async () => {
        try {
          const data = [];
          for await (const item of cart){
           const response= await gameCtrl.getGameById(item.documentId);
           data.push({ ...response, quantity: item.quantity});
          }
          setGames(data);
        }catch (error){
          console.error(error);
        }
      })();
     }, [cart]);

  return (
    <>
    <Seo title = "Carrito" />
     <CartLayout> 
       {currentStep === 1 && <Cart.StepOne games={games}/>}
       {currentStep === 2 && <Cart.StepTwo games={games} />}
       {currentStep === 3 && <Cart.StepThree />}
     </CartLayout>
    </>
  );
}


/*
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Game } from "@/api";
import { useCart } from "@/hooks";
import { CartLayout } from "@/layouts";
import { Cart } from "@/components/Cart";

const gameCtrl = new Game();

export default function CartPage() {
  const {
    query: { step = 1 },
  } = useRouter();
  const currentStep = Number(step);

  const [games, setGames] = useState([]);
  const { cart } = useCart();

  useEffect(() => {
    if (!cart || !Array.isArray(cart)) return;

    (async () => {
      try {
        const data = [];

        for (const item of cart) {
          const response = await gameCtrl.getGameById(item.documentId);
          if (response) {
            data.push({ ...response, quantity: item.quantity });
          }
        }

        setGames(data);
      } catch (error) {
        console.error("Error al cargar juegos:", error);
      }
    })();
  }, [cart]);

  return (
    <CartLayout>
      {currentStep === 1 && <Cart.StepOne games={games} />}
      {currentStep === 2 && <p>Step TWO</p>}
      {currentStep === 3 && <p>Step THREE</p>}
    </CartLayout>
  );
}

*/