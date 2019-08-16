const EventEmitter = require('EventEmitter');

class EmitterService {
  private readonly eventEmitter = new EventEmitter();

  public on(eventName: string, listener: (args: any) => any) {
    this.eventEmitter.addListener(eventName, listener);
  }

  public removeEventListener(eventName: string, listener: (args: any) => any) {
    this.eventEmitter.removeListener(eventName, listener);
  }

  public emit(event: string, payload?: object, error: boolean = false) {
    this.eventEmitter.emit(event, payload, error);
  }

  public getEventEmitter() {
    return this.eventEmitter();
  }
}

export default new EmitterService();