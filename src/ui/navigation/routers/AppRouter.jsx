import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Todo } from '../../todo';
import { Links } from '../components/Links';

import './AppRouter.scss';

export const AppRouter = () => {
  const lists = useSelector((store) => store.todo);
  return (
    <Router>
      <div className="navigation">
        <Links />
        <Switch>
          {lists.map((item, i) => (
            <Route key={i} path={`/${item.title.replace(' ', '_')}${i}`}>
              <Todo numList={i} />
            </Route>
          ))}
        </Switch>
      </div>
    </Router>
  );
};
