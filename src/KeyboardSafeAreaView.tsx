import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import React from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from '@shayrn/react-native-scaler';

export type KeyboardSafeAreaViewProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  bottomOffset?: number;
  footer?: React.ReactNode;
  resetPaddings?: boolean;
  keyboardAwareScrollView?: boolean;
  safeAreaStyle?: StyleProp<ViewStyle>;
  keyboardAwareScrollViewStyle?: StyleProp<ViewStyle>;
};

export function KeyboardSafeAreaView({
  header,
  children,
  bottomOffset = 0,
  footer,
  resetPaddings = false,
  keyboardAwareScrollView = true,
  safeAreaStyle,
  keyboardAwareScrollViewStyle,
}: KeyboardSafeAreaViewProps) {
  const content = keyboardAwareScrollView ? (
    <KeyboardAwareScrollView
      nestedScrollEnabled
      contentContainerStyle={[
        styles.container,
        { paddingTop: resetPaddings ? 0 : scale(16) },
        keyboardAwareScrollViewStyle,
      ]}
      keyboardShouldPersistTaps="handled"
      bottomOffset={bottomOffset}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={false}
    >
      {children}
    </KeyboardAwareScrollView>
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
