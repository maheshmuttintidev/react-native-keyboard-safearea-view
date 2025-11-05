import { Text, TextInput } from 'react-native';
import { render } from '@testing-library/react-native';
import { KeyboardSafeAreaView } from '../KeyboardSafeAreaView';

// Mock the dependencies
jest.mock('react-native-safe-area-context', () => {
  const RN = require('react-native');
  return {
    SafeAreaView: ({ children, ...props }: any) => {
      return <RN.View {...props}>{children}</RN.View>;
    },
  };
});

jest.mock('react-native-keyboard-controller', () => {
  const RN = require('react-native');
  return {
    KeyboardProvider: ({ children }: any) => {
      return <RN.View testID="keyboard-provider">{children}</RN.View>;
    },
    KeyboardAwareScrollView: ({ children, ...props }: any) => {
      return (
        <RN.ScrollView {...props} testID="keyboard-aware-scroll-view">
          {children}
        </RN.ScrollView>
      );
    },
  };
});

jest.mock('@shayrn/react-native-scaler', () => ({
  scale: (value: number) => value,
}));

describe('KeyboardSafeAreaView', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <KeyboardSafeAreaView>
        <Text>Test Content</Text>
      </KeyboardSafeAreaView>
    );

    expect(getByText('Test Content')).toBeTruthy();
  });

  it('renders with custom safeAreaStyle', () => {
    const { getByTestId } = render(
      <KeyboardSafeAreaView safeAreaStyle={{ backgroundColor: 'red' }}>
        <Text>Test Content</Text>
      </KeyboardSafeAreaView>
    );

    // Check that the component renders
    expect(getByTestId('keyboard-aware-scroll-view')).toBeTruthy();
  });

  it('renders with custom keyboardAwareScrollViewStyle', () => {
    const { getByTestId } = render(
      <KeyboardSafeAreaView keyboardAwareScrollViewStyle={{ padding: 20 }}>
        <Text>Test Content</Text>
      </KeyboardSafeAreaView>
    );

    expect(getByTestId('keyboard-aware-scroll-view')).toBeTruthy();
  });

  it('renders header when provided', () => {
    const { getByText } = render(
      <KeyboardSafeAreaView header={<Text>Header Content</Text>}>
        <Text>Main Content</Text>
      </KeyboardSafeAreaView>
    );

    expect(getByText('Header Content')).toBeTruthy();
    expect(getByText('Main Content')).toBeTruthy();
  });

  it('renders footer when provided', () => {
    const { getByText } = render(
      <KeyboardSafeAreaView footer={<Text>Footer Content</Text>}>
        <Text>Main Content</Text>
      </KeyboardSafeAreaView>
    );

    expect(getByText('Footer Content')).toBeTruthy();
    expect(getByText('Main Content')).toBeTruthy();
  });

  it('renders with KeyboardAwareScrollView by default', () => {
    const { getByTestId } = render(
      <KeyboardSafeAreaView>
        <Text>Test Content</Text>
      </KeyboardSafeAreaView>
    );

    expect(getByTestId('keyboard-aware-scroll-view')).toBeTruthy();
    expect(getByTestId('keyboard-provider')).toBeTruthy();
  });

  it('renders without KeyboardAwareScrollView when disabled', () => {
    const { queryByTestId, getByText } = render(
      <KeyboardSafeAreaView keyboardAwareScrollView={false}>
        <Text>Test Content</Text>
      </KeyboardSafeAreaView>
    );

    expect(queryByTestId('keyboard-aware-scroll-view')).toBeNull();
    expect(queryByTestId('keyboard-provider')).toBeNull();
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('handles multiple children', () => {
    const { getByText } = render(
      <KeyboardSafeAreaView>
        <Text>First Child</Text>
        <Text>Second Child</Text>
        <TextInput placeholder="Input Field" />
      </KeyboardSafeAreaView>
    );

    expect(getByText('First Child')).toBeTruthy();
    expect(getByText('Second Child')).toBeTruthy();
  });

  it('applies resetPaddings prop correctly', () => {
    const { getByTestId } = render(
      <KeyboardSafeAreaView resetPaddings={true}>
        <Text>Test Content</Text>
      </KeyboardSafeAreaView>
    );

    expect(getByTestId('keyboard-aware-scroll-view')).toBeTruthy();
  });

  it('handles bottomOffset prop', () => {
    const { getByTestId } = render(
      <KeyboardSafeAreaView bottomOffset={20}>
        <Text>Test Content</Text>
      </KeyboardSafeAreaView>
    );

    expect(getByTestId('keyboard-aware-scroll-view')).toBeTruthy();
  });

  it('renders complex form layout', () => {
    const { getByText, getByPlaceholderText } = render(
      <KeyboardSafeAreaView
        header={<Text>Login Form</Text>}
        footer={<Text>© 2025</Text>}
      >
        <Text>Welcome</Text>
        <TextInput placeholder="Email" />
        <TextInput placeholder="Password" />
      </KeyboardSafeAreaView>
    );

    expect(getByText('Login Form')).toBeTruthy();
    expect(getByText('Welcome')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('© 2025')).toBeTruthy();
  });

  it('renders without optional props', () => {
    const { getByText } = render(
      <KeyboardSafeAreaView>
        <Text>Minimal Setup</Text>
      </KeyboardSafeAreaView>
    );

    expect(getByText('Minimal Setup')).toBeTruthy();
  });

  it('handles all props together', () => {
    const { getByText, getByTestId } = render(
      <KeyboardSafeAreaView
        header={<Text>Header</Text>}
        footer={<Text>Footer</Text>}
        safeAreaStyle={{ backgroundColor: 'white' }}
        keyboardAwareScrollViewStyle={{ padding: 16 }}
        bottomOffset={10}
        resetPaddings={false}
        keyboardAwareScrollView={true}
      >
        <Text>Content</Text>
      </KeyboardSafeAreaView>
    );

    expect(getByText('Header')).toBeTruthy();
    expect(getByText('Content')).toBeTruthy();
    expect(getByText('Footer')).toBeTruthy();
    expect(getByTestId('keyboard-aware-scroll-view')).toBeTruthy();
  });
});
