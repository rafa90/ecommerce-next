import { BasicLayout } from "@/layouts";
import { Game } from "@/components/Game";
import { ENV } from "@/utils";
import { Separator, Seo} from "@/components/Shared";

export default function GamePage(props) {
    const {game}=props;
    const wallpaper= game.wallpaper;

    //console.log(props);
  return (
  <>
    <Seo title={game.title} />
    <BasicLayout> 
       <Game.HeaderWallpaper image={`${ENV.SERVER_HOST}${wallpaper.url}`} />
       <Game.Panel gameId= {game.id} game={game} />

       <Separator height={50} />

       <Game.Info game={game}/>

       <Separator height={30} />

       <Game.Media 
         video={game.video} 
         screenshots={game.screenshots}
       />

        <Separator height={50} />
    </BasicLayout>
  </>
  );
}
