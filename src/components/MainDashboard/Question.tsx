import { Button, } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Image, Text, View } from 'react-native';
import { IQuestions } from '../../utils';
import styles from './styles';

class Question extends PureComponent<{ question: IQuestions }> {
  public render() {
    const { question } = this.props;
    return (
      <View style={styles.question.container}>
        <View style={styles.question.header}>
          <Text style={styles.question.title}>{question.question}</Text>
          <Text style={styles.question.points}>{question.value}</Text>
        </View>
        {question.pictureRequired && (
          <Button style={styles.question.photo_container} transparent={true}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../../assets/images/icons/photo.png')} style={{ width: 30, height: 30 }}/>
              <Text style={styles.question.photo_text}>
                <FormattedMessage id={'main_dashboard_photo'}/>
              </Text>
            </View>
          </Button>
        )}
        <View style={styles.question.divider}/>
        <View style={styles.question.footer}>
          <View style={styles.question.timer_container}>
            <Image source={require('../../assets/images/icons/timer.png')} style={{ width: 24, height: 24 }}/>
            <Text style={styles.question.timer_text}>{question.duration}</Text>
          </View>
          <View style={styles.question.yes_no_container}>
            <Button transparent={true} style={styles.question.answer_button}>
              <Text style={styles.question.answer_button_text}>
                <FormattedMessage id={'main_dashboard_question_yes'}/>
              </Text>
            </Button>
            <View style={styles.question.vertical_separator}/>
            <Button transparent={true} style={styles.question.answer_button}>
              <Text style={styles.question.answer_button_text}>
                <FormattedMessage id={'main_dashboard_question_no'}/>
              </Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

export default Question;