import { Text, TextInput } from 'react-native';
import { KeyboardSafeAreaView } from '../../src/KeyboardSafeAreaView';

export default function MyScreen() {
  return (
    <KeyboardSafeAreaView
      safeAreaStyle={{ backgroundColor: '#f5f5f5' }}
      keyboardAwareScrollViewStyle={{ padding: 20 }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome!</Text>
      <TextInput
        placeholder="Enter your name"
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          padding: 15,
          borderRadius: 8,
          backgroundColor: 'white',
        }}
      />
    </KeyboardSafeAreaView>
  );
}
