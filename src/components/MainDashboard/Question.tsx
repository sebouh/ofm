import debounce from 'lodash/debounce';
import { Button, } from 'native-base';
import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { Alert, Image, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch, } from 'redux';
import { deleteQuestion, setActiveQuestionId, setCameraStatus, updateQuestion } from '../../store/actions';
import { axiosInstance, getDateDiff, getIsoDate, IQuestions, IQuestionsExtra } from '../../utils';
import LoaderIndicator from '../LoaderIndicator';
import styles from './styles';

interface IProps {
  readonly item: IQuestions;
  readonly extra: IQuestionsExtra;
  readonly setCameraStatus: (stat: boolean) => void;
  readonly setActiveQuestionId: (id: null | number) => void;
  readonly updateQuestion: (id: number, payload: object) => void;
  readonly deleteQuestion: (id: number) => void;
}

class Question extends PureComponent<IProps> {
  private readonly interval: number;

  public readonly state = {
    currentDate: new Date().getTime(),
    isSendingRequest: false
  };

  constructor(props: IProps) {
    super(props);

    this.interval = setInterval(() => this.setState({ currentDate: new Date().getTime() }), 10000);
  }

  public componentWillUnmount(): void {
    clearInterval(this.interval);
  }

  private openCamera = () => {
    this.props.setActiveQuestionId(this.props.item.question.id);
    this.props.setCameraStatus(true);
  };

  private onDeleteImage = () => {
    this.props.updateQuestion(this.props.item.question.id, { image: null });
  };

  private submitAnswer = async () => {
    this.setState({ isSendingRequest: true }, async () => {
      const { item, extra } = this.props;
      try {
        const formData = new FormData();

        if (item.question.pictureRequired) {
          formData.append('file', { uri: extra.image, type: 'image/jpg', name: 'screen.jpg' });
        }

        formData.append('questionId', item.question.id);
        formData.append('response', extra.answer === 'yes');
        formData.append('zonedDateTime', getIsoDate(new Date()));

        await axiosInstance.post('/response', formData);

        this.props.updateQuestion(item.question.id, { answered: true, answer: '', file: undefined });
      } catch (e) {
        if (e.message === 'internet') {
          return Alert.alert('Please check internet connection and try again');
        }

        let message = e && e.response && e.response.message ? e.response.message : 'Something went wrong';

        if (e && e.response && e.response.status === 401) {
          message = 'You don\'t have permissions to use this app';
        }

        Alert.alert(message);
      } finally {
        this.setState({ isSendingRequest: false });
      }
    });
  };

  private onSubmitPress = debounce(this.submitAnswer, 1000, { leading: true, trailing: false });

  private renderMiddleContent() {
    const { item, extra } = this.props;
    const { isSendingRequest } = this.state;

    if (item.question.answered || item.answered || extra.answered) {
      return null;
    }

    if (extra.image) {
      return (
        <View style={styles.question.photo_container}>
          {isSendingRequest && (
            <React.Fragment>
              <View style={styles.question.overlay}/>
              <LoaderIndicator loaderColor={'#fff'} style={styles.question.loader}/>
            </React.Fragment>
          )}
          <Image source={{ uri: extra.image }} style={{ width: 125, height: 125 }}/>
          <Button transparent={true} style={styles.question.photo_delete_button} onPress={this.onDeleteImage} disabled={isSendingRequest}>
            <Image source={require('../../assets/images/icons/close_white.png')} style={{ width: 22, height: 22 }}/>
          </Button>
        </View>
      );
    }

    if (item.question.pictureRequired) {
      return (
        <Button style={styles.question.camera_container} transparent={true} onPress={this.openCamera} disabled={isSendingRequest}>
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
    const { item, extra } = this.props;
    const { isSendingRequest } = this.state;

    if (item.answered || item.question.answered || extra.answered) {
      return (
        <View style={styles.question.footer}>
          {item.question.pictureRequired ? <Image source={require('../../assets/images/icons/photo.png')}/> : <View/>}
          <Text style={styles.question.cancel_submit_text}>
            <FormattedMessage id={'main_dashboard_question_answered'}/>
          </Text>
        </View>
      );
    }

    if (item.question.pictureRequired && extra.image && extra.answer || !item.question.pictureRequired && extra.answer) {
      return (
        <View style={styles.question.footer}>
          <Button transparent={true} onPress={() => this.answer('')} disabled={isSendingRequest}>
            <Text style={styles.question.cancel_submit_text}>
              <FormattedMessage id={'main_dashboard_question_cancel'}/>
            </Text>
          </Button>
          <Button transparent={true} onPress={this.onSubmitPress} disabled={isSendingRequest}>
            <Text style={styles.question.cancel_submit_text}>
              <FormattedMessage id={'main_dashboard_question_submit'}/>
            </Text>
          </Button>
        </View>
      );
    }

    const date = getDateDiff(item.until);

    if (!date) {
      this.props.deleteQuestion(item.id);
    }

    return (
      <View style={styles.question.footer}>
        <View style={styles.question.timer_container}>
          <Image source={require('../../assets/images/icons/timer.png')} style={{ width: 24, height: 24 }}/>
          <Text style={styles.question.timer_text}>{date}</Text>
        </View>
        <View style={styles.question.yes_no_container}>
          <Button transparent={true} style={styles.question.answer_button} onPress={() => this.answer('yes')} disabled={isSendingRequest}>
            <Text style={[styles.question.answer_button_text, extra.answer === 'yes' && styles.question.answer_button_text_active]}>
              <FormattedMessage id={'main_dashboard_question_yes'}/>
            </Text>
          </Button>
          <View style={styles.question.vertical_separator}/>
          <Button transparent={true} style={styles.question.answer_button} onPress={() => this.answer('no')} disabled={isSendingRequest}>
            <Text style={[styles.question.answer_button_text, extra.answer === 'no' && styles.question.answer_button_text_active]}>
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
    const { item, extra } = this.props;

    return (
      <View style={styles.question.container}>
        <View style={styles.question.header}>
          <Text style={styles.question.title}>{item.question.question}</Text>
          <Text style={styles.question.points}>{item.question.value} <FormattedMessage id={'main_dashboard_question_points'}/></Text>
        </View>
        {extra.answer !== '' && typeof extra.answer !== 'undefined' ? (
          <Text style={styles.question.answer}>
            <FormattedMessage id={`main_dashboard_question_text_${extra.answer.toLocaleLowerCase()}`}/>
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
    updateQuestion: (id: number, payload: object) => dispatch(updateQuestion(id, payload)),
    deleteQuestion: (id: number) => dispatch(deleteQuestion(id))
  };
};

export default connect(null, mapDispatchToProps)(Question);
