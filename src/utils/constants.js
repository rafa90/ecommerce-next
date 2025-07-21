export const ENV = {
    //SERVER_HOST: "http://localhost:1337",
    //SERVER_HOST:"https://ecommerce-strapi-production-c44e.up.railway.app",
    SERVER_HOST:"https://ecommerce-strapiv2.up.railway.app",
    //API_URL: "http://localhost:1337/api",
   // API_URL:"https://ecommerce-strapi-production-c44e.up.railway.app/api",
     API_URL:"https://ecommerce-strapiv2.up.railway.app/api",
    ENDPOINTS: {
        AUTH:{
           REGISTER: "auth/local/register",
           LOGIN: "auth/local",
        },
        USERS_ME: "users/me",
        USERS: "users",
        PLATFORM: "platforms",
        ADDRESS: "addresses",
        GAME: "games",
        WISHLIST:"wishlists",
        ORDER:"orders",
    },
    TOKEN: "token",
    CART: "cart",
};