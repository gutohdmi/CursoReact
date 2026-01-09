import { Modal, Paper, Typography, IconButton, Box, type SxProps, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import type { ReactElement } from 'react';

type Props = {
    title: string;
    titleIcon?: ReactElement;
    closeModal: () => void;
    isModalOpen: boolean;
    componentsSx?: {
        title?: SxProps;
        content?: SxProps;
        footer?: SxProps;
        paper?: SxProps;
    };
    content?: ReactElement;
    footer?: ReactElement;
    noClose?: boolean;
} & (
    | {
          fullscreenButton: boolean;
          fullscreenButtonAction: () => void;
          isFullscreen: boolean;
      }
    | {
          fullscreenButton?: undefined;
          fullscreenButtonAction?: undefined;
          isFullscreen?: undefined;
      }
);

export function SafeModal({
    title,
    titleIcon,
    closeModal,
    isModalOpen,
    componentsSx,
    content,
    footer,
    fullscreenButton,
    fullscreenButtonAction,
    isFullscreen,
    noClose,
}: Props) {
    const { palette } = useTheme();

    return (
        <Modal open={isModalOpen} onClose={closeModal} disableEnforceFocus disableAutoFocus>
            <Paper
                sx={{
                    position: 'absolute',
                    bgcolor: 'background.paper',
                    boxShadow: 5,
                    width: `400px`,
                    maxHeight: `90%`,
                    borderRadius: '8px',
                    py: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    ...componentsSx?.paper,
                }}
            >
                <Box display="flex" alignItems="center" gap="8px" height="28px" paddingBottom="6px" justifyContent="space-between" px="16px">
                    <Box display="flex" alignItems="center" gap="8px">
                        {titleIcon && titleIcon}
                        <Typography variant="subtitle1" fontWeight={500} color="text.primary">
                            {title}
                        </Typography>
                    </Box>

                    <Box display="flex" gap="8px" alignItems="center">
                        {fullscreenButton && (
                            <IconButton onClick={fullscreenButtonAction} size="small">
                                {!isFullscreen ? <OpenInFullIcon fontSize="small" /> : <CloseFullscreenIcon fontSize="small" />}
                            </IconButton>
                        )}
                        {!noClose && (
                            <IconButton size="small" onClick={closeModal}>
                                <CloseIcon sx={{ color: palette.action.active }} />
                            </IconButton>
                        )}
                    </Box>
                </Box>

                <Box display="flex" flexDirection="column" width="100%" overflow="auto" gap="32px" px="16px" sx={componentsSx?.content}>
                    {content && content}
                </Box>

                <Box display="flex" gap="8px" alignItems="center" justifyContent="flex-end" px="16px" sx={componentsSx?.footer}>
                    {footer && footer}
                </Box>
            </Paper>
        </Modal>
    );
}