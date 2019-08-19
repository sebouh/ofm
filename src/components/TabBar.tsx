import { Button } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { globalStyles } from '../utils';

class TabBar extends PureComponent<{ active?: number }> {
  private readonly tabs = [
    {
      id: 1,
      title: 'tab_bar_earn',
      icon: require('../assets/images/icons/earn_icon.png'),
      icon_active: require('../assets/images/icons/earn_icon_active.png'),
      screen: 'main_dashboard'
    }, {
      id: 2,
      title: 'tab_bar_redeem',
      icon: require('../assets/images/icons/redeem_icon.png'),
      icon_active: require('../assets/images/icons/redeem_icon_active.png'),
      screen: 'redeem_initial'
    }
  ];

  private onTabPress = (screen: string) => {
    return Actions.replace(screen);
  };

  public render() {
    return (
      <View style={styles.container}>
        <View style={styles.inner_container}>
          {this.tabs.map(tab => {
            const isActive = this.props.active === tab.id;
            return (
              <Button key={tab.id} transparent={true} disabled={isActive} onPress={() => this.onTabPress(tab.screen)}>
                <View style={styles.tab}>
                  <Image style={styles.image} source={isActive ? tab.icon_active : tab.icon}/>
                  <Text style={[styles.tab_text, isActive && styles.tab_text_active]}>
                    <FormattedMessage id={tab.title}/>
                  </Text>
                </View>
              </Button>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container: {
      paddingTop: 16,
      height: 90,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(248, 250, 250, 0.92)',
      shadowColor: globalStyles.colors.black50,
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowRadius: 6,
      shadowOpacity: 1
    },
    inner_container: {
      width: 186,
      justifyContent: 'space-between',
      flexDirection: 'row'
    },
    tab: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
      width: 35,
      height: 33
    },
    tab_text: {
      marginTop: 5,
      ...globalStyles.fonts.semiBold,
      fontSize: 13,
      fontWeight: '600',
      letterSpacing: -0.21,
      color: '#5c5c5c'
    },
    tab_text_active: {
      color: globalStyles.colors.purple,
      textShadowColor: 'rgba(119, 20, 161, 0.25)',
      textShadowOffset: {
        width: 0,
        height: 1
      },
      textShadowRadius: 2
    }
  }
);

export default TabBar;