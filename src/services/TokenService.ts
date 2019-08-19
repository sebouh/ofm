import AsyncStorage from '@react-native-community/async-storage';
import config from '../config';

class TokenService {
  constructor(private _token: string) {
    this.getInitialToken();
  }

  private async getInitialToken() {
    const token = await AsyncStorage.getItem(config.storage_access_token);

    this.token = token as string;
  }

  public get token() {
    return this._token;
  }

  public set token(newToken: string) {
    this._token = newToken;
  }

  public async setToken(token: string) {
    await AsyncStorage.setItem(config.storage_access_token, token);

    this.token = token;
  }

  public async removeToken() {
    await AsyncStorage.removeItem(config.storage_access_token);

    this.token = '';
  }
}

export default new TokenService('');