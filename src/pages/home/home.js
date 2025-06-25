import { Container } from "semantic-ui-react";
import {BasicLayout} from "@/layouts";
import {Home} from "@/components/Home";
import {Separator, BarTrust, BannerAd, Seo} from "@/components/Shared";

const platformsSlug = {
  playstation: "playstation",
  xbox: "xbox",
  nintendo: "nintendo",
  pc: "pc",
};

export default function HomePage() {

  return (
   <> 
    <Seo />
    
    <BasicLayout>
      <Home.BannerLastGamePublished/>

      <Separator height={100} />

       <Container>
        <Home.LatestGames title="Ultimos lanzamientos"/>
       </Container>

       <Separator heigth={100}/>
       <BarTrust/>
       <Separator heigth={100}/>

       <Container>
        <Home.LatestGames 
          title="PlayStation" 
          limit={3} 
         platformSlug={platformsSlug.playstation} 
        />
       </Container>

        <Separator heigth={100}/>

        <BannerAd 
          title="Registrarse y obtener los mejores precios"
          subtitle="¡Compara con otros juegos y elige el tuyo!"
          btnTitle="Entra ahora"
          btnLink="/account"
          image="/images/img01.png"
        />
      
        <Separator heigth={100} />

    </BasicLayout>
   </>
  );
}
