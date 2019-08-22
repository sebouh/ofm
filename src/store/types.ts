export enum settingTypes {
  setLocale = '@@settings/SET_LOCALE',
  setIsLoggedIn = '@@settings/SET_IS_LOGGED_IN',
  setModalConfigs = '@@settings/SET_MODAL_CONFIGS',
  closeModal = '@@settings/CLOSE_MODAL',
  setCurrentUser = '@settings/SET_CURRENT_USER'
}

export enum cameraTypes {
  setCameraStatus = '@@camera/SET_CAMERA_STATUS',
  setActiveQuestionId = '@@camera/SET_ACTIVE_QUESTION_ID'
}

export enum dataTypes {
  setQuestions = '@@data/SET_QUESTIONS',
  updateQuestion = '@@data/UPDATE_QUESTION',
  deleteQuestion = '@@data/DELETE_QUESTION',
  setPositions = '@@data/SET_POSITIONS',
  updatePosition = '@@data/UPDATE_POSITION',
  setRedeem = '@@data/SET_REDEEM'
}