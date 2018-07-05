import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import DeckList from './components/DeckList.js';
import AddDeck from './components/AddDeck.js';
import { Constants } from 'expo';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { Entypo } from '@expo/vector-icons';
import DeckItem from './components/DeckItem';


function FlashcardStatusBar ({backgroundColor, ...props}){
  return (
    <View style={{ backgroundColor,  height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Entypo name='documents' size={26} color={tintColor} />
    }
  },
  NewDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <Entypo name='add-to-list' size={26} color={tintColor} />
    }
  }
},
{
tabBarOptions: {
    activeTintColor: 'black',
    style: {
      height: 60,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    },
     labelStyle: {
      fontSize: 14
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  DeckItem: {
    screen: DeckItem,
    navigationOptions: {
      headerTintColor: '#fff',
      headerForceInset: {top: 'never'},
      headerStyle: {
        backgroundColor: 'rgb(0,5,40)',
      }
    }
  },
  initialRouteName: 'Home'
})


export default class App extends React.Component {
  store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  render() {
    return (
      <Provider store={this.store}>
        <View style={{flex: 1}}>
          <FlashcardStatusBar backgroundColor={'rgb(0,5,40)'} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

