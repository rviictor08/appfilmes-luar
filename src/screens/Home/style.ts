import styled from "styled-components";
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
  flex: 1;
  background-color: #000000;
  padding: 0 20px;
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
  border-width: 1px;
  padding: 14px;
`;

export const Title = styled.Text`
  color: #00A8E1;
  font-size: 30px;
  font-weight: bold;
  margin-left: 90px;
`;

export const Header = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 40px 0 20px 0;
`;

export const Image = styled.View`

  
`;

export const Menu = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const ButtonMenu = styled.TouchableOpacity`

`;

export const MenuIcon = styled(Feather)`
  color: #FFFFFF;
  font-size: 30px;
`;

export const ButtonSearch = styled.TouchableOpacity`
   margin-left: 10px;

`;

export const MoviesInTheaters = styled.View`

`;

export const TitleMoviesInTheaters = styled.Text`
  color: #FFFFFF;
  font-size: 25px;
  font-weight: bold;
  margin: 20px 0;
`;
