import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Button,
  Dimensions,
} from 'react-native';

import { MonoText } from '../components/StyledText';

export default class quizGame extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  };

  constructor(props) {
    super(props);
    this.startTime = 0;
    this.endTime = 0;
    this.state = {
      gameStart: false,
      gameComplete: false,
      button:
        <TouchableHighlight underlayColor={'transparent'} style={[styles.tapCircle, {backgroundColor: 'blue'}]} onPress={this.startGame.bind(this)}>
          <Text style={styles.tapCircleText}>START</Text>
        </TouchableHighlight>,
      continueButton: null,
      question: 'Are you ready to take on a question?',
      answer: null,
      choices: null,
      choice0: null,
      choice1: null,
      choice2: null,
      choice3: null,
    };
  }

  decode(str) {
    return str.replace(/\&amp;/g,'&').replace(/\&lt;/g,'<').replace(/\&quot;/g,'"').replace(/\&#039;/g, "'").replace(/\&uuml;/g, 'Ü');
  }

  startGame() {
    var that = this;
    fetch('https://www.opentdb.com/api.php?amount=1&type=multiple', {
      method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
      var allChoices = that.randomizer(data.results[0].incorrect_answers, data.results[0].correct_answer);
      that.setState({
        question: that.decode(data.results[0].question),
        answer: that.decode(data.results[0].correct_answer),
        button: null,
        choices: allChoices,
        continueButton: null,
        choice0: 
          <TouchableHighlight underlayColor={'transparent'} style={styles.choiceContainer} onPress={that.checkAnswer.bind(this, 0)}>
            <Text style={styles.choiceText}>{that.decode(allChoices[0])}</Text>
          </TouchableHighlight>,
        choice1:
          <TouchableHighlight underlayColor={'transparent'} style={styles.choiceContainer} onPress={that.checkAnswer.bind(this, 1)}>
            <Text style={styles.choiceText}>{that.decode(allChoices[1])}</Text>
          </TouchableHighlight>,
        choice2:
          <TouchableHighlight underlayColor={'transparent'} style={styles.choiceContainer} onPress={that.checkAnswer.bind(this, 2)}>
            <Text style={styles.choiceText}>{that.decode(allChoices[2])}</Text>
          </TouchableHighlight>,
        choice3:
          <TouchableHighlight underlayColor={'transparent'} style={styles.choiceContainer} onPress={that.checkAnswer.bind(this, 3)}>
            <Text style={styles.choiceText}>{that.decode(allChoices[3])}</Text>
          </TouchableHighlight>,
      });
    })
    .catch((error) => {
      console.warn(error);
    }).done();
  }

  checkAnswer(choice) {
    if (this.state.choices[choice] === this.state.answer) {
      this.setState({
        gameStart: false,
        gameComplete: true,
        question: 'Correct Answer! Congratulations!',
        choice0: null,
        choice1: null,
        choice2: null,
        choice3: null,
        button:
          <TouchableHighlight underlayColor={'transparent'} style={[styles.tapCircle, {backgroundColor: 'green'}]}>
            <Text style={styles.tapCircleText}>COMPLETE</Text>
          </TouchableHighlight>,
        continueButton: <Button title={'Again!'} onPress={this.startGame.bind(this)}/>,
      });
    } else {
      if (choice === 0) {
        this.setState({
          choice0:
            <View style={[styles.choiceContainer, {backgroundColor: 'red'}]}>
              <Text style={styles.choiceText}>Try Again!</Text>
            </View>,
        });
      } else if (choice === 1) {
        this.setState({
          choice1:
            <View style={[styles.choiceContainer, {backgroundColor: 'red'}]}>
              <Text style={styles.choiceText}>Try Again!</Text>
            </View>,
        });
      } else if (choice === 2) {
        this.setState({
          choice2:
            <View style={[styles.choiceContainer, {backgroundColor: 'red'}]}>
              <Text style={styles.choiceText}>Try Again!</Text>
            </View>,
        });
      } else if (choice === 3) {
        this.setState({
          choice3:
            <View style={[styles.choiceContainer, {backgroundColor: 'red'}]}>
              <Text style={styles.choiceText}>Try Again!</Text>
            </View>,
        });
      }
    }
  }

  randomizer(arr, answer) {
    arr.push(answer);
    for (var i = 0; i < arr.length; i++) {
      var temp = Math.floor(Math.random() * arr.length);
      var swap = arr[temp];
      arr[temp] = arr[i];
      arr[i] = swap;
    }
    return arr;
  }

  render() {
    return (
      <View style={styles.gameContainer}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{this.state.question}</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.inputContainer}>
            {this.state.button}
            {this.state.choice0}
            {this.state.choice1}
            {this.state.choice2}
            {this.state.choice3}
          </View>
          <View style={styles.continueContainer}>
            {this.state.continueButton}
          </View>
        </View>
      </View>
    ); 
  }
}

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
  },
  questionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
  },
  questionText: {
    margin: 5,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 2,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Noteworthy',
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
  },
  inputContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tapCircle: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderStyle: 'solid',
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tapCircleText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 36,
  },
  choiceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgb(255, 250, 125)',
    margin: 5,
    width: Dimensions.get('window').width * 0.8,
    borderWidth: 2,
    borderStyle: 'solid',
  },
  choiceText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
  },
  continueContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
  }
});
