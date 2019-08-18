import { Button, } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch, } from 'redux';
import { setActiveQuestionId, setCameraStatus, updateQuestion } from '../../store/actions';
import { IQuestions } from '../../utils';
import styles from './styles';

interface IProps {
  readonly question: IQuestions;
  readonly setCameraStatus: (stat: boolean) => void;
  readonly setActiveQuestionId: (id: null | number) => void;
  readonly updateQuestion: (id: number, payload: object) => void;
}

class Question extends PureComponent<IProps> {
  private openCamera = () => {
    this.props.setActiveQuestionId(this.props.question.id);
    this.props.setCameraStatus(true);
  };

  private onDeleteImage = () => {
    this.props.updateQuestion(this.props.question.id, { image: null });
  };

  private renderMiddleContent() {
    const { question } = this.props;

    if (question.image) {
      return (
        <View style={styles.question.photo_container}>
          <Image source={{ uri: question.image }} style={{ width: 125, height: 125 }}/>
          <Button transparent={true} style={styles.question.photo_delete_button} onPress={this.onDeleteImage}>
            <Image source={require('../../assets/images/icons/close_white.png')} style={{ width: 22, height: 22 }}/>
          </Button>
        </View>
      );
    }

    if (question.pictureRequired) {
      return (
        <Button style={styles.question.camera_container} transparent={true} onPress={this.openCamera}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../../assets/images/icons/photo.png')} style={{ width: 30, height: 30 }}/>
            <Text style={styles.question.photo_text}>
              <FormattedMessage id={'main_dashboard_photo'}/>
            </Text>
          </View>
        </Button>
      );
    }
  }

  private renderFooter() {
    const { question } = this.props;

    if (question.pictureRequired && question.image && question.answer || !question.pictureRequired && question.answer) {
      return (
        <View style={styles.question.footer}>
          <Button transparent={true} onPress={() => this.answer('')}>
            <Text style={styles.question.cancel_submit_text}>
              <FormattedMessage id={'main_dashboard_question_cancel'}/>
            </Text>
          </Button>
          <Button transparent={true} onPress={() => this.answer('')}>
            <Text style={styles.question.cancel_submit_text}>
              <FormattedMessage id={'main_dashboard_question_submit'}/>
            </Text>
          </Button>
        </View>
      );
    }

    return (
      <View style={styles.question.footer}>
        <View style={styles.question.timer_container}>
          <Image source={require('../../assets/images/icons/timer.png')} style={{ width: 24, height: 24 }}/>
          <Text style={styles.question.timer_text}>{question.duration}</Text>
        </View>
        <View style={styles.question.yes_no_container}>
          <Button transparent={true} style={styles.question.answer_button} onPress={() => this.answer('yes')}>
            <Text style={[styles.question.answer_button_text, question.answer === 'yes' && styles.question.answer_button_text_active]}>
              <FormattedMessage id={'main_dashboard_question_yes'}/>
            </Text>
          </Button>
          <View style={styles.question.vertical_separator}/>
          <Button transparent={true} style={styles.question.answer_button} onPress={() => this.answer('no')}>
            <Text style={[styles.question.answer_button_text, question.answer === 'no' && styles.question.answer_button_text_active]}>
              <FormattedMessage id={'main_dashboard_question_no'}/>
            </Text>
          </Button>
        </View>
      </View>
    );
  }

  private answer = (answer: string) => {
    return this.props.updateQuestion(this.props.question.id, { answer });
  };

  public render() {
    const { question } = this.props;

    return (
      <View style={styles.question.container}>
        <View style={styles.question.header}>
          <Text style={styles.question.title}>{question.question}</Text>
          <Text style={styles.question.points}>{question.value} <FormattedMessage id={'main_dashboard_question_points'}/></Text>
        </View>
        {question.answer !== '' && typeof question.answer !== 'undefined' ? (
          <Text style={styles.question.answer}>
            <FormattedMessage id={`main_dashboard_question_text_${question.answer.toLocaleLowerCase()}`}/>
          </Text>
        ) : null}
        {this.renderMiddleContent()}
        <View style={styles.question.divider}/>
        {this.renderFooter()}
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setCameraStatus: (stat: boolean) => dispatch(setCameraStatus(stat)),
    setActiveQuestionId: (id: null | number) => dispatch(setActiveQuestionId(id)),
    updateQuestion: (id: number, payload: object) => dispatch(updateQuestion(id, payload))
  };
};

export default connect(null, mapDispatchToProps)(Question);