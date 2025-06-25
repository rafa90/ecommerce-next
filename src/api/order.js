import { ENV, authFetch } from "@/utils";
import qs from "qs";



export class Order {

  //cree ahora para guardar producto en order strapi
  async create(data) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ORDER}`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),  // ✅ Enviamos dentro de "data"
    };

    const response = await authFetch(url, params);
    return await response.json();
   } catch (error) {
    throw error;
  }
 }



    async getAll(userId){
        try {

            const filters = `filters[user][id][$eq]=${userId}`;
            const sort = "sort[0]=createdAt:desc";
            const urlParams = `${filters}&${sort}`;
            
           const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ORDER}?${filters}`;

 
            const response = await authFetch(url);
            const result = await response.json();

            if(response.status !== 200) throw result;

            return result;
        } catch(error) {
            throw error;
        }
    
    }
 


}