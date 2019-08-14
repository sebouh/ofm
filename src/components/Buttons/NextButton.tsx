import { Button } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import { globalStyles } from '../../utils';

interface IProps {
  readonly buttonStyle?: ViewStyle | ViewStyle[];
  readonly textStyle?: TextStyle;
}

class NextButton extends PureComponent<IProps> {
  public render() {
    return (
      <Button block={true} style={[styles.button, this.props.buttonStyle]}>
        <Text style={[styles.button_text, this.props.textStyle]}>
          <FormattedMessage id={'next_button'}/>
        </Text>
      </Button>
    );
  };
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: globalStyles.colors.purple,
    borderRadius: 10,
    height: 50
  },
  button_text: {
    color: globalStyles.colors.white,
    ...globalStyles.fonts.semiBold,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: -0.41,
  }
});

export default NextButton;