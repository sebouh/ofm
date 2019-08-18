import { Button } from 'native-base';
import React, { PureComponent } from 'react';
import { Image, StatusBar, StyleSheet, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setActiveQuestionId, setCameraStatus, updateQuestion } from '../store/actions';
import { IReduxState } from '../store/store';
import { getStatusBarHeight } from '../utils';

interface IProps {
  readonly activeQuestionId: number | null;
  readonly setCameraStatus: (stat: boolean) => void;
  readonly setActiveQuestionId: (id: null | number) => void;
  readonly updateQuestion: (id: number, payload: object) => void;
}

class Camera extends PureComponent<IProps> {
  private camera: RNCamera | null = null;

  private takePicture = async () => {
    if (this.camera) {
      const options = { quality: 1, base64: true };
      const data = await this.camera.takePictureAsync(options);

      this.props.updateQuestion(this.props.activeQuestionId as number, { image: data.uri });
      this.props.setActiveQuestionId(null);
      this.props.setCameraStatus(false);
    }
  };

  private closeCamera = () => {
    this.props.setActiveQuestionId(null);
    this.props.setCameraStatus(false);
  };

  public render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <Button transparent={true} style={styles.closeButton} onPress={this.closeCamera}>
          <Image style={{ width: 22, height: 22 }} source={require('../assets/images/icons/close_white.png')}/>
        </Button>
        <RNCamera
          ref={ref => this.camera = ref}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel'
          }}
        />
        <Button transparent={true} onPress={this.takePicture} style={styles.capture}>
          <Image source={require('../assets/images/icons/camer_button.png')} style={{ width: 66, height: 66 }}/>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  closeButton: {
    position: 'absolute',
    top: getStatusBarHeight() + 18,
    left: 20
  },
  preview: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    marginLeft: -33
  },
});

const mapStateToProps = ({ camera }: IReduxState) => {
  return {
    activeQuestionId: camera.activeQuestionId
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setCameraStatus: (stat: boolean) => dispatch(setCameraStatus(stat)),
    setActiveQuestionId: (id: null | number) => dispatch(setActiveQuestionId(id)),
    updateQuestion: (id: number, payload: object) => dispatch(updateQuestion(id, payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Camera);