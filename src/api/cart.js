/*
import { forEach } from "lodash";
import {ENV , authFetch} from "@/utils";

export class Cart {
    add(gameId){
        const games = this.getAll();
        const objIndex= games.findIndex((game) => game.id ===gameId );

        if(objIndex < 0){
            games.push({id:gameId, quantity:1});
        } else{
           const game= games[objIndex];
           games[objIndex].quantity = game.quantity + 1;
        }

        localStorage.setItem(ENV.CART, JSON.stringify(games));
    }

    getAll() {
      const response = localStorage.getItem(ENV.CART);
      
      if (!response){
        return [];
      }else{
        return JSON.parse(response)
      }

    }

    count(){
        const response= this.getAll();
        let count= 0;

        forEach(response, (item) => {
            count +=item.quantity;
        });

        return count;
    }

}
    */
   import { forEach } from "lodash";
import { ENV } from "@/utils";

export class Cart {
add(game) {
  const games = this.getAll();
  const index = games.findIndex((item) => item.documentId === game.documentId);

  if (index < 0) {
    games.push({ documentId: game.documentId, quantity: 1 });
  } else {
    games[index].quantity += 1;
  }

  localStorage.setItem(ENV.CART, JSON.stringify(games));
}

  getAll() {
    const response = localStorage.getItem(ENV.CART);
    if (!response) return [];
    return JSON.parse(response);
  }

  count() {
    const response = this.getAll();
    let count = 0;
    forEach(response, (item) => {
      count += item.quantity;
    });
    return count;
  }

 changeQuantity(gameId, quantity){
  const games = this.getAll();
  const objIndex = games.findIndex((game)=> game.documentId === gameId);

  games[objIndex].quantity = quantity;

  localStorage.setItem(ENV.CART, JSON.stringify(games));
 }

 delete(gameId){
  const games = this.getAll();

  const updateGames = games.filter((game) => game.documentId !== gameId);

  localStorage.setItem(ENV.CART, JSON.stringify(updateGames));

 }

 deleteAll(){
  localStorage.removeItem(ENV.CART);
 }

}