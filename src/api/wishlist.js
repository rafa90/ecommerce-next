import { ENV, authFetch } from "@/utils";
import { connect } from "formik";
import { use } from "react";


//original

export class Wishlist{

    
    async check(userId, gameId){
        try{
            const filterUser= `filters[user][id][$eq][0]=${userId}`;
            const filterGame=  `filters[game][id][$eq][1]=${gameId}`;
            const urlParams= `${filterUser}&${filterGame}`;
        
            const url= `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}?${urlParams}`;
        
            const response = await authFetch(url);
            const result= await response.json();

            if(response.status !==200) throw result;

            if(result.data.length ===0){
                return false;
            }

            return result.data[0];
        }catch(error){
            throw error;
        }
    }

    async add(userId, gameDocumentId) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}`;
    
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          user: userId,
          game: gameDocumentId,

        },
      }),
    };

    const response = await authFetch(url, params);
    const result = await response.json();

    if (response.status !== 200 && response.status !== 201) throw result;

    return result;
  } catch (error) {
    throw error;
  }
}

  async delete(documentId) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}/${documentId}`;
    const params = {
      method: "DELETE",
    };

    const response = await authFetch(url, params);

    if (response.status !== 200 && response.status !== 204) {
      const result = await response.json();
      throw result;
    }

    return true; // o lo que necesites devolver
  } catch (error) {
    throw error;
  }
}

 async getAll(userId){
  try{
    const filters= `filters[user][id][$eq]=${userId}`;
    const populate= "populate[0]=game&populate[1]=game.cover";
    const urlParams= `${filters}&${populate}`;

    const url= `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLIST}?${urlParams}`;
    const response= await authFetch(url);
    const result = await response.json();

    if(response.status !==200) throw result;

    return result.data;

  }catch(error){
    throw error;
  }
 }

}
  
