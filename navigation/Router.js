import { createRouter } from '@expo/ex-navigation';

import quizGame from '../screens/quizGame';
import tapGame from '../screens/tapGame';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  quiz: () => quizGame,
  tap: () => tapGame,
  rootNavigation: () => RootNavigation,
}));
