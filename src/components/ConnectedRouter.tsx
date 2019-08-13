import React, { Component } from 'react';
import { Actions, Reducer, Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import routes from '../Routes';
import { IReduxState } from '../store/store';

const Scenes = Actions.create(
  <Scene key={'root'}>
    {routes.map((route) => <Scene key={route.key} {...route} hideNavBar={true}/>)}
  </Scene>
);

interface IProps {
  readonly dispatch: (action: AnyAction) => void;
  readonly routeName: string;
}

class ConnectedRouter extends Component<IProps> {
  private reducerCreate = (params: object) => {
    const defaultReducer = new Reducer(params);
    return (state: IReduxState, action: AnyAction) => {
      this.props.dispatch(action);
      return defaultReducer(state, action);
    };
  };

  public render() {
    return (
      <Router createReducer={this.reducerCreate} scenes={Scenes}>
        {this.props.children}
      </Router>
    );
  }
}

const mapStateToProps = ({ router }: IReduxState) => {
  return {
    routeName: router && router.routeName ? router.routeName : ''
  };
};

export default connect(mapStateToProps)(ConnectedRouter);