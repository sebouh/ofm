import { Input } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { TextInput, ViewStyle } from 'react-native';
import { globalStyles } from '../../utils';

interface IProps {
  readonly email: string;
  readonly onChange: (val: string) => void;
  readonly style: ViewStyle;
  readonly placeholderColor?: string;
  readonly placeholder?: string;
  readonly hidePlaceHolder?: boolean;
  readonly getRef?: (instance: TextInput | null) => void;
}

class EmailInput extends PureComponent<IProps> {
  public static defaultProps = {
    placeholderColor: globalStyles.colors.black
  };

  public render() {
    return (
      <FormattedMessage id={this.props.placeholder || 'email'}>
        {placeholder => (
          <Input
            ref={this.props.getRef}
            placeholder={this.props.hidePlaceHolder ? '' : placeholder as string}
            style={this.props.style}
            autoCapitalize={'none'}
            keyboardType={'email-address'}
            autoCorrect={false}
            autoCompleteType={'email'}
            onChangeText={e => this.props.onChange(e)}
            value={this.props.email}
            placeholderTextColor={this.props.placeholderColor}
          />
        )}
      </FormattedMessage>
    );
  }
}

export default EmailInput;