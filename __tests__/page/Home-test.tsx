/**
 * @format
 */

import 'react-native';
import React from 'react';

import Home, {HomeProp} from '../../src/page/Home';
import {fireEvent, render} from '@testing-library/react-native';

function getHome(innerProps: HomeProp) {
  return <Home {...innerProps} />;
}

// jest 라이브러리 describe는 각각의 test들을 그룹핑(?) 해주고 모든 테스트는 test메서드로 할 수 있는데 test는 alias로 it이라는
//  메서드로도 사용할 수 있다.
describe('[Home] Render', () => {
  const props = {};
  const component = getHome(props);
  test('render without crashing', () => {
    const rendered = render(component);
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });
});

describe('[Home] Button Test', () => {
  const onPressMock = jest.fn();
  const props: HomeProp = {
    title: 'Hello!',
    content: 'Hello',
    onPressContent: onPressMock,
  };

  test('버튼이 눌린다.', () => {
    const rendered = render(<Home {...props} />);
    for (let i = 0; i < 5; i++) {
      fireEvent(rendered.getByTestId('Button'), 'onPress');
    }
    expect(onPressMock).toBeCalledTimes(5);

    expect(rendered.getByText('Hello'));
  });
});
