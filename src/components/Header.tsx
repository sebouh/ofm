import React, { PureComponent } from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { IReduxState } from '../store/store';
import { getStatusBarHeight } from '../utils';

interface IProps {
  readonly routeName: string;
}

class Header extends PureComponent<IProps> {
  private readonly smallHeaderScreens: string[] = ['change_password'];

  public render() {
    const { routeName } = this.props;
    return (
      <View style={[styles.container, this.smallHeaderScreens.includes(routeName) && styles.smallContainer]}>
        <StatusBar barStyle={'light-content'}/>
        <LinearGradient colors={['#00008b', '#8b008b']} style={styles.gradient}/>
        <Image style={styles.image} source={require('../assets/images/logo.png')}/>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container: {
      height: 139
    },
    smallContainer: {
      height: 101
    },
    gradient: {
      flex: 1,
      opacity: 0.5,
      alignItems: 'center',
      justifyContent: 'center'
    },
    image: {
      position: 'absolute',
      top: getStatusBarHeight() + 34,
      left: '50%',
      marginLeft: -89
    }
  }
);

const mapStateToProps = ({ router }: IReduxState) => {
  return {
    routeName: router && router.routeName ? router.routeName : ''
  };
};

export default connect(mapStateToProps)(Header);