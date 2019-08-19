import React, { PureComponent } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { LoaderIndicator } from '../components';
import { IReduxState } from '../store/store';

interface IProps {
  readonly isLoggedIn: boolean | undefined;
}

class Loader extends PureComponent<IProps> {
  public componentDidMount(): void {
    if (this.props.isLoggedIn) {
      return Actions.reset('main_dashboard');
    }

    if (this.props.isLoggedIn === false) {
      return Actions.reset('signup_email_pass');
    }
  }

  public componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any): void {
    if (this.props.isLoggedIn) {
      return Actions.reset('main_dashboard');
    }

    if (this.props.isLoggedIn === false) {
      return Actions.reset('signup_email_pass');
    }
  }

  public render() {
    return <LoaderIndicator />;
  }
}

const mapStateToProps = ({ settings }: IReduxState) => {
  return {
    isLoggedIn: settings.isLoggedIn
  };
};

export default connect(mapStateToProps)(Loader);