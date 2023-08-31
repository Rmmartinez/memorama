import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Card from './Card';

const cards = [
  "🥎",
  "🐈",
  "🐈‍⬛",
  "🧶",
  "🐟",
  "🐭",
]


export default function App() {
  const [board, setBoard] = React.useState(() => shuffle([...cards,...cards]));
  const [selectedCards, setSelectedCards] = React.useState([]);
  const [matchedCards, setMatchedCards] = React.useState([]);
  const [score, setScore] = React.useState(0);

  const handleTapCard = (index) => {
    if(selectedCards.length >= 2 || selectedCards.includes(index)) return;
    setSelectedCards([...selectedCards, index]);
    setScore(score +1);
  }

  const didPlayerWin = () => matchedCards.length === board.length
  
  React.useEffect(() => {
    if(selectedCards.length < 2) return; 
    if(board[selectedCards[0]] === board[selectedCards[1]]){
      setMatchedCards([...matchedCards, ...selectedCards]);
      setSelectedCards([]);
    }else{
      const timeoutId = setTimeout(() => setSelectedCards([]), 1000)
      return () => clearTimeout(timeoutId);
    }
  }, [selectedCards])

  const resetGame = () => {
    setMatchedCards([]);
    setScore(0);
    setSelectedCards([]);
  }

  return (

    <View style={styles.container}>
      <Text style={styles.title}>{didPlayerWin() ? "¡Felicitaciones!" : "Memorama"}</Text>
      <Text style={styles.score}>Puntaje: {score}</Text>

      <View style = {styles.boards}>
      {board.map((card, index) => {
        const isTurnedOver = selectedCards.includes(index) || matchedCards.includes(index)
        return(
          <Card 
            key={index}
            isTurnedOver={isTurnedOver}
            onPress={() => handleTapCard(index)}
            >
            {card}
          </Card>
          
        )
      })}

      </View>
      {didPlayerWin() && <Button color="#A80D68" onPress={resetGame} style={styles.button} title="Reset"/>}
      <Text style={styles.created}>Creado con ♥ por Magui</Text>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F06292',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize:32,
    color:"#fff",
    fontWeight:"900"
  },
  score: {
    fontSize:25,
    color:"#fff",
    fontWeight:"400"
  },
  boards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop:40
  },
  created: {
    marginTop: 40,
    fontSize:10,
    color:"#fff",
    fontWeight:"400"
  },
  button: {
    marginTop: 55,
  }
});


function shuffle(array){
  for(let i = array.length-1; i>0; i--){
    const randomIndex = Math.floor(Math.random()*(i+1));

    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];

  }
  return array;
}