import { Input } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { ViewStyle } from 'react-native';
import { globalStyles } from '../../utils';

interface IProps {
  readonly placeholder: string;
  readonly style: ViewStyle;
  readonly value: string;
  readonly onChange: (e: string) => void;
  readonly placeholderColor?: string;
}

class PasswordInput extends PureComponent<IProps> {
  public static defaultProps = {
    placeholderColor: globalStyles.colors.black
  };

  public render() {
    return (
      <FormattedMessage id={this.props.placeholder}>
        {placeholder => (
          <Input
            placeholder={placeholder as string}
            style={this.props.style}
            autoCapitalize={'none'}
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={e => this.props.onChange(e)}
            value={this.props.value}
            placeholderTextColor={this.props.placeholderColor}
          />
        )}
      </FormattedMessage>
    );
  }
}

export default PasswordInput;