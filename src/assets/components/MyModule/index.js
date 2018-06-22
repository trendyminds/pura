export default class MyModule {
  constructor(greeting = "Hi") {
    this.greeting = greeting;
  }

  sayHello() {
    return `${this.greeting} from MyModule!`;
  }
}
