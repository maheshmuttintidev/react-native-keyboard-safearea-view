import { Keyboard, StyleSheet, View, type ViewStyle } from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardProvider,
} from 'react-native-keyboard-controller';
import React, { useEffect } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from '@shayrn/react-native-scaler';

export type KeyboardSafeAreaViewProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  disableEnhancedInputHandling?: boolean;
  bottomOffset?: number;
  footer?: React.ReactNode;
  resetPaddings?: boolean;
  keyboardAwareScrollView?: boolean;
  safeAreaStyle: ViewStyle;
  keyboardAwareScrollViewStyle: ViewStyle;
};

export function KeyboardSafeAreaView({
  header,
  children,
  disableEnhancedInputHandling = false,
  bottomOffset = 0,
  footer,
  resetPaddings = false,
  keyboardAwareScrollView = true,
  safeAreaStyle,
  keyboardAwareScrollViewStyle,
}: KeyboardSafeAreaViewProps) {
  useEffect(() => {
    if (disableEnhancedInputHandling) return;

    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () => {
      // Optional: Adjust layout if needed
    });
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
      // Optional: Reset scroll position if needed
    });

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, [disableEnhancedInputHandling]);

  const content = keyboardAwareScrollView ? (
    <KeyboardProvider>
      <KeyboardAwareScrollView
        nestedScrollEnabled
        contentContainerStyle={[
          styles.container,
          { paddingTop: resetPaddings ? 0 : scale(16) },
          keyboardAwareScrollViewStyle,
        ]}
        keyboardShouldPersistTaps="handled"
        // Add these props to improve touch handling
        bottomOffset={bottomOffset}
        // Ensure touches are properly handled
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        // Important: Remove any potential interference with touch events
        removeClippedSubviews={false}
      >
        {children}
      </KeyboardAwareScrollView>
    </KeyboardProvider>
  ) : (
    <View style={{ flex: 1, paddingTop: resetPaddings ? 0 : scale(16) }}>
      {children}
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          paddingHorizontal: resetPaddings ? 0 : scale(12),
        },
        safeAreaStyle,
      ]}
      edges={['top', 'left', 'right', 'bottom']}
    >
      {header}
      {content}
      {footer}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
});
