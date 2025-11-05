# Testing Documentation

## Overview

This package uses **Jest** and **React Native Testing Library** for comprehensive unit testing. All tests are designed to work with React Native components without requiring a full device or web environment.

---

## Test Setup

### Dependencies

The following testing dependencies are installed:

- `@testing-library/react-native` - React Native testing utilities
- `react-test-renderer` - Required peer dependency for testing library
- `jest` - Testing framework
- `@types/jest` - TypeScript types for Jest

### Configuration

Jest is configured in `package.json`:

```json
{
  "jest": {
    "preset": "react-native",
    "modulePathIgnorePatterns": [
      "<rootDir>/example/node_modules",
      "<rootDir>/lib/"
    ]
  }
}
```

---

## Running Tests

### All Tests
```bash
npm test
```

### With Coverage
```bash
npm test -- --coverage
```

### Watch Mode
```bash
npm test -- --watch
```

### Specific Test File
```bash
npm test -- src/__tests__/index.test.tsx
```

---

## Test Structure

### Test File Location
All tests are located in `src/__tests__/` directory:
- `src/__tests__/index.test.tsx` - Main component tests

### Mocking Strategy

Since this is a React Native library that depends on other RN packages, we mock all external dependencies:

1. **react-native-safe-area-context** - Mocked to return a simple View
2. **react-native-keyboard-controller** - Mocked to return testable components with testIDs
3. **@shayrn/react-native-scaler** - Mocked to return the input value unchanged

This allows us to test the component's behavior without requiring the native modules.

---

## Test Coverage

### Current Test Suite (13 Tests)

The test suite covers all major functionality:

#### ✅ Basic Rendering
- Renders children correctly
- Renders with custom safeAreaStyle
- Renders with custom keyboardAwareScrollViewStyle
- Renders without optional props

#### ✅ Header & Footer
- Renders header when provided
- Renders footer when provided

#### ✅ Keyboard Behavior
- Renders with KeyboardAwareScrollView by default
- Renders without KeyboardAwareScrollView when disabled

#### ✅ Props & Configuration
- Handles multiple children
- Applies resetPaddings prop correctly
- Handles bottomOffset prop
- Handles all props together

#### ✅ Complex Scenarios
- Renders complex form layout with all features

---

## Writing New Tests

### Example Test

```typescript
it('should render with custom props', () => {
  const { getByText } = render(
    <KeyboardSafeAreaView
      safeAreaStyle={{ backgroundColor: 'blue' }}
      header={<Text>Custom Header</Text>}
    >
      <Text>Test Content</Text>
    </KeyboardSafeAreaView>
  );

  expect(getByText('Custom Header')).toBeTruthy();
  expect(getByText('Test Content')).toBeTruthy();
});
```

### Best Practices

1. **Use testID for complex queries**
   ```typescript
   const { getByTestId } = render(<Component />);
   expect(getByTestId('keyboard-aware-scroll-view')).toBeTruthy();
   ```

2. **Test user-facing behavior, not implementation**
   - ✅ Test that children render
   - ✅ Test that props affect output
   - ❌ Don't test internal state
   - ❌ Don't test mocked dependencies

3. **Keep tests focused and isolated**
   - One concept per test
   - Clear test descriptions
   - No dependencies between tests

4. **Use React Native Testing Library queries**
   - `getByText` - Find by text content
   - `getByTestId` - Find by testID
   - `getByPlaceholderText` - Find inputs by placeholder
   - `queryBy*` - Returns null if not found (for negative assertions)

---

## Continuous Integration

### CI Workflow

The GitHub Actions workflow runs the following checks:

```yaml
- name: Run unit tests
  run: yarn test --maxWorkers=2 --coverage
```

### Pre-commit Hooks

Lefthook runs linting before commits:
- ESLint checks all TypeScript/JavaScript files
- Tests must pass before push

---

## Troubleshooting

### Common Issues

#### Issue: "Cannot find module 'react-native'"
**Solution:** Make sure all dependencies are installed:
```bash
npm install
```

#### Issue: Tests timeout
**Solution:** Increase Jest timeout in test file:
```typescript
jest.setTimeout(10000);
```

#### Issue: "Invariant Violation: requireNativeComponent"
**Solution:** This usually means a dependency isn't mocked. Check that all React Native dependencies have jest.mock() calls.

---

## Test Metrics

| Metric | Status |
|--------|--------|
| Total Tests | 13 |
| Passing | 13 (100%) |
| Coverage | High (all props & behaviors) |
| Test Types | Unit tests |
| CI Integration | ✅ Enabled |

---

## Future Enhancements

Potential areas for additional testing:

1. **Integration Tests**
   - Test with real SafeAreaProvider
   - Test with real KeyboardController

2. **Snapshot Tests**
   - Component structure snapshots
   - Style snapshots

3. **Performance Tests**
   - Render performance
   - Re-render optimization

4. **Accessibility Tests**
   - Screen reader compatibility
   - Keyboard navigation

---

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Last Updated:** November 5, 2025
