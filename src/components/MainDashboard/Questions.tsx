import React, { PureComponent } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getQuestions } from '../../store/actions';
import { IReduxState } from '../../store/store';
import { globalStyles, IQuestions } from '../../utils';
import Question from './Question';
import styles from './styles';

interface IProps {
  readonly questions: IQuestions[];
  readonly getQuestions: (callback?: () => void) => void;
}

class Questions extends PureComponent<IProps> {
  public readonly state = {
    refreshing: false
  };

  private renderItem = ({ item }: { item: IQuestions }) => {
    return (
      <Question item={item}/>
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
    questions: data.questions
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<IReduxState, void, Action>) => {
  return {
    getQuestions: (callback?: () => void) => dispatch(getQuestions(callback)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);