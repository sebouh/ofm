import { Button, } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Alert, Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch, } from 'redux';
import { setActiveQuestionId, setCameraStatus, updateQuestion } from '../../store/actions';
import { axiosInstance, IQuestions } from '../../utils';
import styles from './styles';

interface IProps {
  readonly item: IQuestions;
  readonly setCameraStatus: (stat: boolean) => void;
  readonly setActiveQuestionId: (id: null | number) => void;
  readonly updateQuestion: (id: number, payload: object) => void;
}

class Question extends PureComponent<IProps> {
  private openCamera = () => {
    this.props.setActiveQuestionId(this.props.item.question.id);
    this.props.setCameraStatus(true);
  };

  private onDeleteImage = () => {
    this.props.updateQuestion(this.props.item.question.id, { image: null });
  };

  private submitAnswer = async () => {
    const { item } = this.props;
    try {
      const formData = new FormData();

      if (item.question.pictureRequired) {
        formData.append('file', item.file);
      }

      formData.append('questionId', item.question.id);
      formData.append('response', item.answer === 'yes');
      formData.append('zonedDateTime', new Date().toISOString());

      await axiosInstance.post('/response', formData);

      this.props.updateQuestion(item.question.id, { answered: true, answer: '' });
    } catch (e) {
      console.log(e);
      Alert.alert(e && e.response ? e.response.message : 'Something went wrong');
    }
  };

  private renderMiddleContent() {
    const { item } = this.props;

    if (item.question.answered) {
      return null;
    }

    if (item.image) {
      return (
        <View style={styles.question.photo_container}>
          <Image source={{ uri: item.image }} style={{ width: 125, height: 125 }}/>
          <Button transparent={true} style={styles.question.photo_delete_button} onPress={this.onDeleteImage}>
            <Image source={require('../../assets/images/icons/close_white.png')} style={{ width: 22, height: 22 }}/>
          </Button>
        </View>
      );
    }

    if (item.question.pictureRequired) {
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
    const { item } = this.props;

    if (item.question.answered) {
      return (
        <View style={[styles.question.footer, { justifyContent: 'flex-end' }]}>
          <Text style={styles.question.cancel_submit_text}>
            <FormattedMessage id={'main_dashboard_question_answered'}/>
          </Text>
        </View>
      );
    }

    if (item.question.pictureRequired && item.image && item.answer || !item.question.pictureRequired && item.answer) {
      return (
        <View style={styles.question.footer}>
          <Button transparent={true} onPress={() => this.answer('')}>
            <Text style={styles.question.cancel_submit_text}>
              <FormattedMessage id={'main_dashboard_question_cancel'}/>
            </Text>
          </Button>
          <Button transparent={true} onPress={this.submitAnswer}>
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
          <Text style={styles.question.timer_text}>{item.question.duration}</Text>
        </View>
        <View style={styles.question.yes_no_container}>
          <Button transparent={true} style={styles.question.answer_button} onPress={() => this.answer('yes')}>
            <Text style={[styles.question.answer_button_text, item.answer === 'yes' && styles.question.answer_button_text_active]}>
              <FormattedMessage id={'main_dashboard_question_yes'}/>
            </Text>
          </Button>
          <View style={styles.question.vertical_separator}/>
          <Button transparent={true} style={styles.question.answer_button} onPress={() => this.answer('no')}>
            <Text style={[styles.question.answer_button_text, item.answer === 'no' && styles.question.answer_button_text_active]}>
              <FormattedMessage id={'main_dashboard_question_no'}/>
            </Text>
          </Button>
        </View>
      </View>
    );
  }

  private answer = (answer: string) => {
    return this.props.updateQuestion(this.props.item.question.id, { answer });
  };

  public render() {
    const { item } = this.props;

    return (
      <View style={styles.question.container}>
        <View style={styles.question.header}>
          <Text style={styles.question.title}>{item.question.question}</Text>
          <Text style={styles.question.points}>{item.question.value} <FormattedMessage id={'main_dashboard_question_points'}/></Text>
        </View>
        {item.answer !== '' && typeof item.answer !== 'undefined' ? (
          <Text style={styles.question.answer}>
            <FormattedMessage id={`main_dashboard_question_text_${item.answer.toLocaleLowerCase()}`}/>
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