import { Button } from 'native-base';
import React, { PureComponent } from 'react';
import { Alert, Image, StatusBar, StyleSheet, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setActiveQuestionId, setCameraStatus, updateQuestion } from '../store/actions';
import { IReduxState } from '../store/store';
import { getStatusBarHeight } from '../utils';
import LoaderIndicator from './LoaderIndicator';

interface IProps {
  readonly activeQuestionId: number | null;
  readonly isCameraOpened: boolean;
  readonly setCameraStatus: (stat: boolean) => void;
  readonly setActiveQuestionId: (id: null | number) => void;
  readonly updateQuestion: (id: number, payload: object) => void;
}

class Camera extends PureComponent<IProps> {
  private camera: RNCamera | null = null;

  public readonly state = {
    isProcessing: false
  };

  private takePicture = async () => {
    this.setState({ isProcessing: true }, async () => {
      try {
        if (this.camera) {
          const options = { quality: 0.5, base64: true, fixOrientation: true, forceUpOrientation: true };
          const data = await this.camera.takePictureAsync(options);

          this.props.updateQuestion(this.props.activeQuestionId as number, { image: data.uri, file: data.base64 });
          this.props.setActiveQuestionId(null);
          return this.props.setCameraStatus(false);
        }
      } catch (e) {
        Alert.alert('Image was not saved. Please try again.');
      } finally {
        this.setState({ isProcessing: false });
      }
    });
  };

  private closeCamera = () => {
    this.props.setActiveQuestionId(null);
    this.props.setCameraStatus(false);
  };

  public render() {
    return (
      <View style={[styles.hiddenContainer, this.props.isCameraOpened && styles.container]}>
        {this.props.isCameraOpened && <StatusBar hidden={true} animated={true}/>}
        <Button transparent={true} style={styles.closeButton} onPress={this.closeCamera}>
          <Image style={{ width: 22, height: 22 }} source={require('../assets/images/icons/close_white.png')}/>
        </Button>
        {this.props.isCameraOpened && (
          <RNCamera
            ref={ref => this.camera = ref}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.auto}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel'
            }}
            captureAudio={false}
          />
        )}
        {this.state.isProcessing ? (
          <LoaderIndicator loaderColor={'#fff'} style={[styles.capture, { backgroundColor: 'transparent', width: 66, height: 66 }]}/>
        ) : (
          <Button transparent={true} onPress={this.takePicture} style={styles.capture}>
            <Image source={require('../assets/images/icons/camer_button.png')} style={{ width: 66, height: 66 }}/>
          </Button>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hiddenContainer: {
    display: 'none',
    zIndex: 3
  },
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  closeButton: {
    position: 'absolute',
    top: getStatusBarHeight() + 18,
    left: 20,
    zIndex: 1
  },
  preview: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 4
  },
  capture: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    marginLeft: -33,
    zIndex: 5,
  },
});

const mapStateToProps = ({ camera }: IReduxState) => {
  return {
    activeQuestionId: camera.activeQuestionId,
    isCameraOpened: camera.isActive
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