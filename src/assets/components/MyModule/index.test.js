import MyModule from "./index";

describe("The MyModule component", () => {
  it("says hello", () => {
    const myModule = new MyModule("Hello");

    expect(myModule.sayHello()).toBe("Hello from MyModule!");
  });

  it("has a default value if one is not set", () => {
    const myModule = new MyModule();

    expect(myModule.sayHello()).toBe("Hi from MyModule!");
  });
});
