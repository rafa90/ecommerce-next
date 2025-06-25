import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import{size} from "lodash";
import {BasicLayout} from "@/layouts";
import { GridGames,NoResult,Pagination,Separator } from "@/components/Shared";

export default function SearchPage(props) {
   const {games, Pagination, searchText} =props;
   const hasResult =  size (games) > 0;


    useEffect (() => {
      document.getElementById("search-games").focus();
    }, []);


  return (
    <>
     <BasicLayout relative isOpenSearch> 
      <Container>
          <Separator height={50} />

          <h2>Buscando:{searchText}</h2>
          {hasResult ? (
            <>
             <GridGames games={games} />
            </>
          ):(
            <NoResult text= "No se han encontrado result"/>
          )}
      </Container>
     </BasicLayout>   

    </>
  );
}
