import { Button } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { IReduxState } from '../store/store';
import { getStatusBarHeight, globalStyles, isIphoneX } from '../utils';

interface IProps {
  readonly routeName: string;
}

class Header extends PureComponent<IProps> {
  private readonly smallHeaderScreens: string[] = ['change_password'];
  private readonly showBackButton: string[] = ['sign_in_recover_password'];

  public render() {
    const { routeName } = this.props;
    return (
      <View style={[styles.container, this.smallHeaderScreens.includes(routeName) && styles.smallContainer]}>
        <StatusBar barStyle={'light-content'}/>
        <LinearGradient colors={['#00008b', '#8b008b']} style={styles.gradient}/>
        {this.showBackButton.includes(routeName) ? (
          <Button transparent={true} style={styles.back_button} onPress={() => Actions.pop()}>
            <Image source={require('../assets/images/icons/back.png')} style={{ width: 12, height: 20.5 }}/>
            <Text style={styles.back_button_text}><FormattedMessage id={'back_button'}/></Text>
          </Button>
        ) : null}
        <Image style={styles.image} source={require('../assets/images/logo.png')}/>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container: {
      height: isIphoneX() ? 161 : 139
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
    back_button: {
      position: 'absolute',
      top: getStatusBarHeight() + 34,
      left: 16,
      flexDirection: 'row',
      alignItems: 'center',
      height: 30
    },
    back_button_text: {
      ...globalStyles.fonts.regular,
      fontSize: 17,
      letterSpacing: -0.41,
      color: globalStyles.colors.white,
      marginLeft: 5
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