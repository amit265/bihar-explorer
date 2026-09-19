import { typography } from './typography';

export const getMarkdownStyles = (theme: any, language: 'en' | 'hi') => {
  const isHi = language === 'hi';
  const regularFont = isHi ? typography.fontFamily.hindiRegular : typography.fontFamily.regular;
  const boldFont = isHi ? typography.fontFamily.hindiSemiBold : typography.fontFamily.semiBold;

  return {
    body: {
      color: theme.textSecondary,
      fontSize: 15,
      lineHeight: 24,
      fontFamily: regularFont,
    },
    heading1: {
      color: theme.text,
      fontSize: 22,
      marginTop: 20,
      marginBottom: 10,
      fontFamily: boldFont,
    },
    heading2: {
      color: theme.text,
      fontSize: 18,
      marginTop: 16,
      marginBottom: 8,
      fontFamily: boldFont,
    },
    heading3: {
      color: theme.text,
      fontSize: 16,
      marginTop: 12,
      marginBottom: 6,
      fontFamily: boldFont,
    },
    strong: {
      color: theme.text,
      fontFamily: boldFont,
    },
    em: {
      fontStyle: 'italic' as const,
      color: theme.textSecondary,
    },
    bullet_list: {
      marginTop: 4,
      marginBottom: 12,
    },
    ordered_list: {
      marginTop: 4,
      marginBottom: 12,
    },
    list_item: {
      marginBottom: 6,
      flexDirection: 'row' as const,
    },
    bullet_list_icon: {
      marginRight: 8,
      fontSize: 15,
      color: theme.textSecondary,
    },
    bullet_list_content: {
      flex: 1,
    },
    ordered_list_icon: {
      marginRight: 8,
      fontSize: 15,
      color: theme.textSecondary,
      fontFamily: boldFont,
    },
    ordered_list_content: {
      flex: 1,
    },
    paragraph: {
      marginTop: 0,
      marginBottom: 12,
    },
  };
};
