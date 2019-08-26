import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../utils';

interface IProps {
  readonly title: string;
}

class SubHeader extends PureComponent<IProps> {
  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          <FormattedMessage id={this.props.title}/>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container: {
      backgroundColor: 'rgba(119, 20, 161, 0.86)',
      height: 44,
      shadowColor: globalStyles.colors.black50,
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowRadius: 2,
      shadowOpacity: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      ...globalStyles.fonts.regular,
      fontSize: 17,
      lineHeight: 25,
      letterSpacing: 0.32,
      color: globalStyles.colors.white
    }
  }
);

export default SubHeader;