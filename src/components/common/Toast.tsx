import { SuccessIton, ErrorIcon } from '@/assets';
import { Toaster } from 'react-hot-toast';

const Toast = () => {
  return (
    <Toaster
      position='top-center'
      toastOptions={{
        duration: 3000,
        success: {
          icon: <SuccessIton />,
          style: {
            background: '#ECFDF3',
            color: '#008A2E',
            borderRadius: '8px',
            border: '1px solid #BFFCD9',
            padding: '12px 16px',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '16px',
            whiteSpace: 'nowrap',
            wordBreak: 'keep-all',
            minWidth: '250px',
          },
        },
        error: {
          icon: <ErrorIcon />,
          style: {
            background: '#FFF0F0',
            color: '#E60000',
            borderRadius: '8px',
            border: '1px solid #FFE0E1',
            padding: '12px 16px',
            fontSize: '16px',
            fontWeight: '400',
            lineHeight: '16px',
            whiteSpace: 'nowrap',
            wordBreak: 'keep-all',
            minWidth: '350px',
          },
        },
      }}
      containerStyle={{
        top: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    />
  );
};

export default Toast;
