import {ENV, authFetch} from "@/utils";
import { method } from "lodash";

export class Address {
    async create (data, userId){
        try{
            const url= `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}`;
            const params= {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    data:{
                        ...data,
                        user: userId,
                    },
                }),
            };

            const response = await authFetch(url, params);
            const result = await response.json();

            if(response.status !==200) throw result;
            return result;
        } catch(error){
          throw error;
        }
    }

    async getAll(userId){
        try{
          const filters = `filters[user][id][$eq]=${userId}`;
          const url= `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}?${filters}`;

          const response = await authFetch(url);
          const result = await response.json();

          if(response.status !==200) throw result;

          return result;
        } catch (error) {
            throw error;
        }
    }

    async update (data, documentId) {
      try{
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}/${documentId}`;
         const params = {
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({data}),
         };

         const response = await authFetch(url,params);
         const result = await response.json();

         if (response.status !== 200) throw result;

         return result;
      } catch(error){
        throw error;
      }
    }
    /*
    async delete(documentId){
       try{
        const url= `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}/${documentId}`;
        const params= {
            method: "DELETE",
        };

        const response = await authFetch(url,params);
        const result= await response.json();

        if(response.status !==200) throw result;

         return result;
       } catch (error){
        throw error;
       }
    }
    */
    async delete(documentId) {
        try {
          const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESS}/${documentId}`;
          const params = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          };
      
          const response = await authFetch(url, params);
      
          // Si la respuesta es 204, no intentes hacer .json()
          if (response.status === 200 || response.status === 204) {
            return true;
          } else {
            const result = await response.json();
            throw result;
          }
        } catch (error) {
          throw error;
        }
      }
         

}