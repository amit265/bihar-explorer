import React from 'react';
import { Text, TextProps } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { typography } from '../theme/typography';

interface TypographyProps extends TextProps {
  variant?: 'regular' | 'medium' | 'semiBold';
  lang?: 'en' | 'hi' | 'auto';
}

const containsHindi = (str: string) => /[\u0900-\u097F]/.test(str);

export const Typography: React.FC<TypographyProps> = ({ 
  children, 
  variant = 'regular', 
  lang = 'auto',
  style, 
  ...props 
}) => {
  const { colors } = useTheme();
  
  let isHindi = lang === 'hi';
  if (lang === 'auto' && typeof children === 'string') {
    isHindi = containsHindi(children);
  } else if (lang === 'auto' && Array.isArray(children)) {
    // If it's an array of strings (like ["Hello ", "World"])
    const combinedString = children.filter(c => typeof c === 'string').join('');
    if (combinedString) {
      isHindi = containsHindi(combinedString);
    }
  }

  let fontFamily = typography.fontFamily.regular;
  if (isHindi) {
    if (variant === 'semiBold') fontFamily = typography.fontFamily.hindiSemiBold;
    else if (variant === 'medium') fontFamily = typography.fontFamily.hindiMedium;
    else fontFamily = typography.fontFamily.hindiRegular;
  } else {
    if (variant === 'semiBold') fontFamily = typography.fontFamily.semiBold;
    else if (variant === 'medium') fontFamily = typography.fontFamily.medium;
  }

  return (
    <Text style={[{ fontFamily, color: colors.text }, style]} {...props}>
      {children}
    </Text>
  );
};
