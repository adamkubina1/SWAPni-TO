import { Box, PlacementWithLogical, Tooltip } from '@chakra-ui/react';
import { ReactNode, useState } from 'react';

const ResponsiveTooltip = ({
  children,
  text,
  placement = 'bottom',
}: {
  children: ReactNode;
  text: string;
  placement?: PlacementWithLogical | undefined;
}) => {
  const [isTooltipOpen, setTooltipOpen] = useState<boolean>(false);
  return (
    <Tooltip
      label={text}
      aria-label={text}
      isOpen={isTooltipOpen}
      placement={placement}
      fontSize={'md'}
    >
      <Box
        onClick={() => setTooltipOpen(!isTooltipOpen)}
        onMouseOver={() => setTooltipOpen(true)}
        onMouseLeave={() => setTooltipOpen(false)}
        _hover={{ cursor: 'pointer' }}
      >
        {children}
      </Box>
    </Tooltip>
  );
};

export { ResponsiveTooltip };
