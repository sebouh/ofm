export enum settingTypes {
  setLocale = '@@settings/SET_LOCALE',
  setModalConfigs = '@@settings/SET_MODAL_CONFIGS',
  closeModal = '@@settings/CLOSE_MODAL'
}

export enum cameraTypes {
  setCameraStatus = '@@camera/SET_CAMERA_STATUS',
  setActiveQuestionId = '@@camera/SET_ACTIVE_QUESTION_ID'
}

export enum dataTypes {
  setQuestions = '@@data/SET_QUESTIONS',
  updateQuestion = '@@data/UPDATE_QUESTION',
  setPositions = '@@data/SET_POSITIONS'
}