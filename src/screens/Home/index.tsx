import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CardMovies } from "../../components/Card/CardMovies";
import { ListImages } from "../../components/ListImages";
import { Tabs } from "../../components/Tabs";
import { SearchIcon } from "../../screens/Search/style";
import api from "../../services/api";
import { Image } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import {
  ButtonSearch,
  Container,
  Header,
  Menu,
  MoviesInTheaters,
  Title,
  TitleMoviesInTheaters,
} from "./style";
import { HomeScreenNavigationProp } from "../../types";

// const { API_KEY } = process.env;
const LANGUAGE = "pt-BR";

const API_KEY = "api_key=73fcf6cb4365f9236bf55b5bfae082e2";

export function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const window = useWindowDimensions();

  const [moviesPopular, setMoviesPopular] = useState([]);
  const [moviesPopularPageTwo, setMoviesPopularPageTwo] = useState([]);
  const [moviesRecommended, setMoviesRecommended] = useState([]);
  const [selectedColorFavorite, setSelectedColorFavorite] = useState(true);

  function handleColorSelectionHome() {
    setSelectedColorFavorite(!selectedColorFavorite);
    navigation.navigate("Home")
  };

  function handleColorSelectionFavorite() {
    setSelectedColorFavorite(true);
    navigation.navigate("Favorites")
  };

  useEffect(() => {
    api
      .get(`/movie/top_rated?${API_KEY}&language=${LANGUAGE}&page=2`)
      .then((response) => response.data)
      .then((data) => setMoviesPopularPageTwo(data.results));

    api
      .get(`/movie/now_playing?${API_KEY}&language=${LANGUAGE}&page=5`)
      .then((response) => response.data)
      .then((data) => setMoviesPopular(data.results));

    api
      .get(`/movie/top_rated?${API_KEY}&language=${LANGUAGE}&page=3`)
      .then((response) => response.data)
      .then((data) => setMoviesRecommended(data.results));

      setSelectedColorFavorite(true)
  }, []);
  return (
    <>
      <Container>
        <Header>
        <ButtonSearch onPress={() => navigation.navigate("homeinicio")}>
            <AntDesign name="left" size={18} color="#fff" />
          </ButtonSearch>
        <Image
          source={require('./../../../assets/logohome.png')}
          style={{ width: 180, height: 60, marginLeft: 55 }}
        />
          <Menu>
          </Menu>
          <ButtonSearch
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Search")}
          >
            <SearchIcon name="moon" />
          </ButtonSearch>
        </Header>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
            data={moviesPopularPageTwo}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ListImages data={item} />}
          />
          <MoviesInTheaters
            style={{ marginBottom: window.height <= 780 ? -20 : 0 }}
          >
            <TitleMoviesInTheaters>Novos lançamentos</TitleMoviesInTheaters>
            <FlatList
              data={moviesPopular}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <CardMovies data={item} />}
            />
          </MoviesInTheaters>
          <MoviesInTheaters>
            <TitleMoviesInTheaters>Mais assitidos</TitleMoviesInTheaters>
            <FlatList
              data={moviesRecommended}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <CardMovies data={item} />}
            />
          </MoviesInTheaters>
          <MoviesInTheaters
            style={{ marginTop: -40 }}
          >
            <TitleMoviesInTheaters>Vistos Recentemente</TitleMoviesInTheaters>
            <FlatList
              data={moviesPopularPageTwo}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <CardMovies data={item} />}
            />
          </MoviesInTheaters>
        </ScrollView>
      </Container>
      <Tabs
        onPress1={handleColorSelectionHome}
        onPress2={handleColorSelectionFavorite}
        isSelected={selectedColorFavorite}
      />
    </>
  );
}
