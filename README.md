# @shayrn/react-native-keyboard-safearea-view

A comprehensive React Native component that provides intelligent keyboard handling and safe area management for your mobile applications. This component combines the power of keyboard awareness with safe area handling to create a seamless user experience across all devices.

## ✨ Features

- 🎯 **Smart Keyboard Handling** - Automatically adjusts layout when keyboard appears/disappears
- 📱 **Safe Area Aware** - Respects device notches, status bars, and navigation bars
- 🔄 **Flexible Scrolling** - Optional keyboard-aware scroll view with smooth animations
- 🎨 **Customizable Styling** - Full control over appearance and behavior
- 🚀 **Performance Optimized** - Efficient rendering and minimal re-renders
- 📐 **Responsive Scaling** - Built-in scaling support for different screen sizes
- 🔧 **TypeScript Support** - Full type safety and IntelliSense

## 📦 Installation

Choose your preferred package manager:

### npm
```bash
npm install @shayrn/react-native-keyboard-safearea-view
```

### yarn
```bash
yarn add @shayrn/react-native-keyboard-safearea-view
```

### pnpm
```bash
pnpm add @shayrn/react-native-keyboard-safearea-view
```

### Expo
```bash
npx expo install @shayrn/react-native-keyboard-safearea-view
```

## 🔧 Required Dependencies

Make sure you have these peer dependencies installed:

```bash
# Core dependencies
npm install react-native-safe-area-context react-native-keyboard-controller

# For Expo projects
npx expo install react-native-safe-area-context react-native-keyboard-controller

# Scaling utility (if not already installed)
npm install @shayrn/react-native-scaler
```

### Important Setup Steps

1. **Wrap your app with `SafeAreaProvider`** (required for safe area handling):

```tsx
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* Your app content */}
    </SafeAreaProvider>
  );
}
```

2. **For optimal keyboard handling**, the `KeyboardProvider` is automatically included in the component when `keyboardAwareScrollView={true}` (default).

## 🚀 Quick Start

```tsx
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { KeyboardSafeAreaView } from '@shayrn/react-native-keyboard-safearea-view';

export default function MyScreen() {
  return (
    <KeyboardSafeAreaView>
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
```

## 📋 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | **Required** | Content to render inside the safe area |
| `safeAreaStyle` | `ViewStyle` | `undefined` | Styles for the outer SafeAreaView container |
| `keyboardAwareScrollViewStyle` | `ViewStyle` | `undefined` | Styles for the KeyboardAwareScrollView |
| `header` | `React.ReactNode` | `undefined` | Optional header content rendered above the main content |
| `footer` | `React.ReactNode` | `undefined` | Optional footer content rendered below the main content |
| `disableEnhancedInputHandling` | `boolean` | `false` | (Deprecated) This prop no longer has any effect and will be removed in a future version |
| `bottomOffset` | `number` | `0` | Additional bottom offset for keyboard calculations |
| `resetPaddings` | `boolean` | `false` | Remove default paddings from the container |
| `keyboardAwareScrollView` | `boolean` | `true` | Enable/disable keyboard-aware scrolling |

## 🎨 Usage Examples

### Basic Form Layout

```tsx
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { KeyboardSafeAreaView } from '@shayrn/react-native-keyboard-safearea-view';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardSafeAreaView
      safeAreaStyle={styles.container}
      keyboardAwareScrollViewStyle={styles.scrollContent}
    >
      <Text style={styles.title}>Sign In</Text>
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </KeyboardSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
```

### With Header and Footer

```tsx
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { KeyboardSafeAreaView } from '@shayrn/react-native-keyboard-safearea-view';

export default function ChatScreen() {
  return (
    <KeyboardSafeAreaView
      safeAreaStyle={styles.container}
      keyboardAwareScrollViewStyle={styles.content}
      header={
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chat</Text>
        </View>
      }
      footer={
        <View style={styles.footer}>
          <Text style={styles.footerText}>Type a message...</Text>
        </View>
      }
    >
      <Text>Chat messages go here</Text>
    </KeyboardSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 16,
  },
  header: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerText: {
    color: '#666',
  },
});
```

### Non-Scrollable Layout

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { KeyboardSafeAreaView } from '@shayrn/react-native-keyboard-safearea-view';

export default function StaticLayout() {
  return (
    <KeyboardSafeAreaView
      safeAreaStyle={styles.container}
      keyboardAwareScrollViewStyle={styles.content}
      keyboardAwareScrollView={false}
      resetPaddings={true}
    >
      <View style={styles.fixedContent}>
        <Text>This content won't scroll</Text>
      </View>
    </KeyboardSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
  },
  fixedContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
```

### Advanced Configuration

```tsx
import React from 'react';
import { KeyboardSafeAreaView } from '@shayrn/react-native-keyboard-safearea-view';

export default function AdvancedExample() {
  return (
    <KeyboardSafeAreaView
      safeAreaStyle={{
        flex: 1,
        backgroundColor: '#f5f5f5',
      }}
      keyboardAwareScrollViewStyle={{
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
      bottomOffset={20}
      disableEnhancedInputHandling={false}
      resetPaddings={false}
    >
      {/* Your content here */}
    </KeyboardSafeAreaView>
  );
}
```

## 🔧 Configuration Options

### Keyboard Behavior

- **Default**: Automatically handles keyboard appearance/disappearance
- **Enhanced**: Additional event listeners for fine-tuned control
- **Disabled**: Turn off keyboard handling with `disableEnhancedInputHandling={true}`

### Scrolling Behavior

- **Enabled** (default): Uses KeyboardAwareScrollView for smooth scrolling
- **Disabled**: Uses a simple View container with `keyboardAwareScrollView={false}`

### Safe Area Management

- **Automatic**: Respects all device safe areas (notches, status bars, etc.)
- **Custom**: Override with your own `safeAreaStyle` configurations

## 🎯 Best Practices

1. **Wrap your app with SafeAreaProvider**: Always wrap your root component with `SafeAreaProvider` from `react-native-safe-area-context`
2. **Style props are optional**: Both `safeAreaStyle` and `keyboardAwareScrollViewStyle` are now optional for easier setup
3. **Use resetPaddings wisely**: Set to `true` when you want full control over spacing
4. **Test on various devices**: Always test on devices with different safe area configurations (notches, home indicators, etc.)
5. **Keep dependencies updated**: Regularly update `react-native-keyboard-controller` and `react-native-safe-area-context` for the latest improvements

## 🔒 Security

This library follows security best practices:
- Dependencies are regularly audited using `npm audit`
- ESLint security plugin is configured to detect common vulnerabilities
- TypeScript strict mode is enabled for type safety
- All peer dependencies use semantic versioning for compatibility

To audit dependencies in your project:
```bash
npm audit
# or
yarn audit
```

## 🐛 Troubleshooting

### Common Issues

**Keyboard not responding properly**
- Ensure `react-native-keyboard-controller` is properly installed and linked
- Check if `disableEnhancedInputHandling` is affecting your use case

**Safe area not working**
- Verify `react-native-safe-area-context` is installed and the provider is set up
- Make sure you're testing on a device with actual safe area constraints

**Scrolling issues**
- Try adjusting `bottomOffset` for better keyboard clearance
- Consider disabling `keyboardAwareScrollView` for simpler layouts

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

We welcome contributions! Please read our contributing guide and submit pull requests to our repository.

## 📞 Support

For issues and questions:
- 🐛 [Report bugs](https://github.com/maheshmuttintidev/react-native-keyboard-safearea-view/issues)
- 💬 [Discussions](https://github.com/maheshmuttintidev/react-native-keyboard-safearea-view/discussions)
- 📧 [Contact us](mailto:maheshmuttinti@gmail.com)

---

Made with ❤️ by the Shayrn team