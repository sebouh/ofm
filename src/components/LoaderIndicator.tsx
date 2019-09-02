import React, { PureComponent } from 'react';
import { ActivityIndicator, StyleSheet, View, ViewStyle } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { IReduxState } from '../store/store';
import { globalStyles } from '../utils';

interface IProps {
  readonly isLoggedIn: undefined | boolean;
  readonly style?: ViewStyle | ViewStyle[];
  readonly loaderColor?: string;
}

class LoaderIndicator extends PureComponent<IProps> {
  private interval: any;

  public componentDidMount(): void {
    this.interval = setInterval(this.checkAndRedirect, 3000);
  }

  public componentWillUnmount(): void {
    clearInterval(this.interval);
  }

  private checkAndRedirect = () => {
    if (this.props.isLoggedIn) {
      return Actions.replace('main_dashboard');
    }

    if (this.props.isLoggedIn === false) {
      return Actions.reset('signup_email_pass');
    }
  };

  public render() {
    return (
      <View style={[styles.loader, this.props.style]}>
        <ActivityIndicator size={'large'} color={this.props.loaderColor || globalStyles.colors.purple}/>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    loader: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: '#ffffff'
    }
  });

const mapStateToProps = ({ settings }: IReduxState) => {
  return {
    isLoggedIn: settings.isLoggedIn,
  };
};

export default connect(mapStateToProps)(LoaderIndicator);