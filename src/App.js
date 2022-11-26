import React, { useContext } from 'react';
import { AuthContext } from './components/Context/auth-context';

import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth'

const App = props => {
  const ctx = useContext(AuthContext);
  let content = ctx.isAuth ? <Ingredients /> : <Auth />
  return content;
};

export default App;
