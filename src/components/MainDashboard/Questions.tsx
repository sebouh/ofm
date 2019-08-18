import React, { PureComponent } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { globalStyles, IQuestions } from '../../utils';
import Question from './Question';
import styles from './styles';

interface IProps {
  readonly questions: IQuestions[];
}

class Questions extends PureComponent<IProps> {
  public static defaultProps = {
    questions: [
      {
        id: 1,
        duration: '2:52',
        pictureRequired: true,
        question: 'Are storefront doors and windows clean and free of cracks?',
        value: '5 pts'
      },
      {
        id: 2,
        duration: 0,
        pictureRequired: false,
        question: 'Are storefront doors and windows clean and free of cracks?',
        value: '25 pts'
      },
      {
        id: 3,
        duration: 0,
        pictureRequired: false,
        question: 'Are storefront doors and windows clean and free of cracks?',
        value: '15 pts'
      },
      {
        id: 4,
        duration: 0,
        pictureRequired: true,
        question: 'Are storefront doors and windows clean and free of cracks?',
        value: '5 pts'
      },
      {
        id: 5,
        duration: 0,
        pictureRequired: false,
        question: 'Are storefront doors and windows clean and free of cracks?',
        value: '25 pts'
      },
      {
        id: 6,
        duration: 0,
        pictureRequired: false,
        question: 'Are storefront doors and windows clean and free of cracks?',
        value: '15 pts'
      }
    ]
  };

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
      console.log('refreshed');
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

export default Questions;