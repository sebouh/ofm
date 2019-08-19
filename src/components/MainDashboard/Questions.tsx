import React, { PureComponent } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { IReduxState } from '../../store/store';
import { globalStyles, IQuestions } from '../../utils';
import Question from './Question';
import styles from './styles';

interface IProps {
  readonly questions: IQuestions[];
}

class Questions extends PureComponent<IProps> {
  public readonly state = {
    refreshing: false
  };

  private renderItem = ({ item }: { item: IQuestions }) => {
    return (
      <Question question={item}/>
    );
  };

  private onRefresh = () => {
    this.setState({ refreshing: true }, () => {
      setTimeout(() => this.setState({ refreshing: false }), 1000);
    });
  };

  public render() {
    return (
      <FlatList
        data={this.props.questions}
        renderItem={this.renderItem}
        keyExtractor={item => item.id.toString()}
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
export default connect(mapStateToProps)(Questions);