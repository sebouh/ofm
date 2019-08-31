import React, { PureComponent } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getQuestions } from '../../store/actions';
import { IReduxState } from '../../store/store';
import { globalStyles, IQuestions, IQuestionsExtra } from '../../utils';
import Question from './Question';
import styles from './styles';

interface IProps {
  readonly questions: IQuestions[];
  readonly questionsExtra: IQuestionsExtra[];
  readonly getQuestions: (callback?: () => void) => void;
}

class Questions extends PureComponent<IProps> {
  private interval: number = 0;
  public readonly state = {
    refreshing: false
  };

  public componentDidMount(): void {
    this.interval = setInterval(() => this.props.getQuestions(), 60000);
  }

  public componentWillUnmount(): void {
    clearInterval(this.interval);
    this.interval = 0;
  }

  private renderItem = ({ item }: { item: IQuestions }) => {
    const extra = this.props.questionsExtra.find(el => item.id === el.id);
    return (
      <Question item={item} extra={(extra || {}) as IQuestionsExtra}/>
    );
  };

  private onRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.props.getQuestions(() => this.setState({ refreshing: false }));
    });
  };

  public render() {
    return (
      <FlatList
        data={this.props.questions}
        renderItem={this.renderItem}
        keyExtractor={item => item.question.id.toString()}
        style={styles.questions_list.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
            tintColor={globalStyles.colors.purple}
          />
        }
      />
    );
  }
}

const mapStateToProps = ({ data }: IReduxState) => {
  return {
    questions: data.questions,
    questionsExtra: data.questionsExtra
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IReduxState, void, Action>) => {
  return {
    getQuestions: (callback?: () => void) => dispatch(getQuestions(callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);