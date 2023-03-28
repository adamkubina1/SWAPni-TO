const ButtonTheme = {
  variants: {
    swapDarkOutline: {
      borderColor: 'swap.darkHighlight',
      borderWidth: '1px',
      _hover: {
        background: 'swap.darkHighlight',
      },
    },
    swapLightSolid: {
      backgroundColor: 'swap.lightBase',
      color: 'swap.lightText',
      _hover: { backgroundColor: 'swap.lightHighlight' },
    },
  },
};

export { ButtonTheme };
