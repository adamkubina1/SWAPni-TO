const ButtonTheme = {
  variants: {
    swapDarkOutline: {
      size: 'xs',
      borderColor: 'swap.darkHighlight',
      borderWidth: '1px',
      _hover: {
        background: 'swap.darkHighlight',
      },
    },
    swapLightSolid: {
      size: 'xs',
      backgroundColor: 'swap.lightBase',
      color: 'swap.lightText',
      _hover: { backgroundColor: 'swap.lightHighlight' },
    },
    swapLightOutline: {
      size: 'xs',
      borderColor: 'swap.lightHighlight',
      borderWidth: '1px',
      color: 'swap.lightText',
      _hover: { backgroundColor: 'swap.lightHighlight' },
    },
  },
};

export { ButtonTheme };
