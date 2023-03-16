import React,  { useEffect, useState  } from "react";
import { 
    Container, Title, Footer, Header, TitleCard, ListCard
} from './style';
import { Button } from "../../components/Button/index";
import api from "../../services/api";
import { CardMovies } from "../../components/Card/CardMovies";


export default function Home({ navigation }) {

  const [moviesPopular, setMoviesPopular] = useState([]);
  const [moviesRecommended, setMoviesRecommended] = useState([]);

  var API_KEY = "api_key=73fcf6cb4365f9236bf55b5bfae082e2";
  var LANGUAGE = "pt-BR";


  useEffect(() => {
    api.get(`/movie/popular?${API_KEY}&language=${LANGUAGE}&page=3`)
        .then(response => response.data)
        .then(data => setMoviesPopular(data.results))
   api
        .get(`/movie/top_rated?${API_KEY}&language=${LANGUAGE}&page=5`)
        .then((response) => response.data)
        .then((data) => setMoviesRecommended(data.results));    
        
}, [])
  return (
    <Container>
      <Header>
     <Title>Bem-vindos ao LuarFlix</Title>
      </Header>
     <Footer>
       <Button
       title="Buscar filmes"
       onPress={() => navigation.navigate('Home')}
       />
    </Footer>
    <TitleCard>Brevemente lançados</TitleCard>
      <ListCard
        data={moviesPopular}
        keyExtractor={(item,) => item.id  }
        renderItem={ ({ item,}) =>(
          <CardMovies data={item} />
        )}/>
        <ListCard
        data={moviesRecommended}
        keyExtractor={(item,) => item.id  }
        renderItem={ ({ item,}) =>(
          <CardMovies data={item} />
        )}/>
    </Container>
  );
}
