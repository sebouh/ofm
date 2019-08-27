import { Button } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import { globalStyles } from '../../utils';

interface IProps {
  readonly buttonStyle?: ViewStyle | ViewStyle[];
  readonly textStyle?: TextStyle;
  readonly onPress: () => void;
  readonly title?: string;
  readonly disabled?: boolean;
}

class NextButton extends PureComponent<IProps> {
  public render() {
    return (
      <Button disabled={this.props.disabled} block={true} style={[styles.button, this.props.buttonStyle]} onPress={this.props.onPress}>
        <Text style={[styles.button_text, this.props.textStyle]}>
          <FormattedMessage id={this.props.title || 'next_button'}/>
        </Text>
      </Button>
    );
  }
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