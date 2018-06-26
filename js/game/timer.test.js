import {assert} from "chai";
import {createTimer} from "./timer";

describe(`Check timer creator`, () => {
  it(`should not allow set negative values`, () => {
    assert.throws(() => createTimer(-1), /Time should not be negative value/);
  });

  it(`should not allow set non integer value`, () => {
    assert.throws(() => createTimer(`5 minutes`), /Time should not be non integer value/);
    assert.throws(() => createTimer(`100.5`), /Time should not be non integer value/);
  });

  it(`should create object`, () => {
    assert.isObject(createTimer(0));
    assert.isObject(createTimer(300));
  });
});
