import { Input } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { ViewStyle } from 'react-native';

interface IProps {
  readonly email: string;
  readonly onChange: (val: string) => void;
  readonly style: ViewStyle;
}

class EmailInput extends PureComponent<IProps> {
  public render() {
    return (
      <FormattedMessage id={'email'}>
        {placeholder => (
          <Input
            placeholder={placeholder as string}
            style={this.props.style}
            autoCapitalize={'none'}
            keyboardType={'email-address'}
            autoCorrect={false}
            autoCompleteType={'email'}
            onChangeText={e => this.props.onChange(e)}
            value={this.props.email}
          />
        )}
      </FormattedMessage>
    );
  }
}

export default EmailInput;