import { Button } from 'native-base';
import React, { PureComponent, ReactChild } from 'react';
import { FormattedMessage } from 'react-intl';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { Camera, Header, Questions, Refer, TabBar } from '../components';
import { IReduxState } from '../store/store';
import styles from './styles';

const Gradient = ({ children, isSelected }: { children: ReactChild, isSelected: boolean }) => {
  if (!isSelected) {
    return (
      <React.Fragment>{children}</React.Fragment>
    );
  }

  return (
    <LinearGradient colors={['rgba(119, 20, 161, 0.6)', 'rgba(0, 0, 139, 0.7)']} style={styles.main_dashboard.gradient}>
      {children}
    </LinearGradient>
  );
};

class MainDashboard extends PureComponent<{ isCameraOpened: boolean }> {
  public readonly state = {
    tab: 'questions'
  };

  private readonly buttons = [
    {
      id: 1,
      tab: 'questions',
      title: 'main_dashboard_navigator_questions'
    }, {
      id: 2,
      tab: 'refer',
      title: 'main_dashboard_navigator_refer'
    }
  ];

  public render() {
    const layout = {
      questions: <Questions/>,
      refer: <Refer/>
    } as { [key: string]: any };

    if (this.props.isCameraOpened) {
      return <Camera />;
    }

    return (
      <View style={{ flex: 1 }}>
        <Header/>
        <View style={styles.main_dashboard.buttonContainer}>
          {this.buttons.map(button => {
            const isActive = this.state.tab === button.tab;

            return (
              <Button
                key={button.id}
                bordered={!isActive}
                transparent={isActive}
                onPress={() => this.setState({ tab: button.tab })}
                style={[styles.main_dashboard.button, isActive && styles.main_dashboard.button_active]}
              >
                <Gradient isSelected={isActive}>
                  <Text style={[styles.main_dashboard.button_text, !isActive && styles.main_dashboard.button_text_active]}>
                    <FormattedMessage id={button.title}/>
                  </Text>
                </Gradient>
              </Button>
            );
          })}
        </View>
        {layout[this.state.tab]}
        <TabBar active={1}/>
      </View>
    );
  }
}

const mapStateToProps = ({ camera }: IReduxState) => {
  return {
    isCameraOpened: camera.isActive
  };
};

export default connect(mapStateToProps)(MainDashboard);