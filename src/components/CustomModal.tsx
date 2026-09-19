import React from 'react';
import { Platform, Modal as RNModal, View, StyleSheet, ModalProps } from 'react-native';

export function CustomModal({
  children,
  visible,
  onRequestClose,
  animationType,
  transparent,
  ...props
}: ModalProps) {
  if (!visible) return null;

  if (Platform.OS === 'web') {
    return (
      <View style={[StyleSheet.absoluteFill, styles.webModalWrapper]}>
        {children}
      </View>
    );
  }

  return (
    <RNModal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType={animationType}
      transparent={transparent}
      {...props}
    >
      {children}
    </RNModal>
  );
}

const styles = StyleSheet.create({
  webModalWrapper: {
    zIndex: 99999,
    position: 'absolute',
  },
});
