import React, { useRef, useState, useEffect } from 'react';
import { TextInput, View, Pressable, StyleSheet } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';

const PinInputContainer = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
});

const Cell = styled.View<{ isFocused: boolean }>(({ theme, isFocused }: { theme: DefaultTheme; isFocused: boolean }) => ({
  width: 45,
  height: 55,
  borderWidth: 1,
  borderColor: isFocused ? theme.colors.primary : theme.colors.surface,
  borderRadius: theme.borders.radius,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.colors.surface,
}));

const CellText = styled.Text(({ theme }: { theme: DefaultTheme }) => ({
  color: theme.colors.text,
  fontSize: 24,
}));

interface PinInputProps {
  pinLength?: number;
  onPinCompleted: (pin: string) => void;
}

export function PinInput({ pinLength = 6, onPinCompleted }: PinInputProps) {
  const [pin, setPin] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (pin.length === pinLength) {
      onPinCompleted(pin);
    }
    setFocusedIndex(pin.length);
  }, [pin, pinLength, onPinCompleted]);

  const handlePress = () => {
    inputRef.current?.focus();
  };

  const renderCells = () => {
    const cells = [];
    for (let i = 0; i < pinLength; i++) {
      const char = pin[i];
      const isFocused = i === focusedIndex;
      cells.push(
        <Cell key={i} isFocused={isFocused}>
          <CellText>{char || ''}</CellText>
        </Cell>
      );
    }
    return cells;
  };

  return (
    <View>
      <Pressable onPress={handlePress}>
        <PinInputContainer>{renderCells()}</PinInputContainer>
      </Pressable>
      <TextInput
        ref={inputRef}
        value={pin}
        onChangeText={setPin}
        maxLength={pinLength}
        keyboardType="number-pad"
        caretHidden
        style={styles.hiddenInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  hiddenInput: {
    ...StyleSheet.absoluteFillObject,
    color: 'transparent',
    opacity: 0,
  },
});