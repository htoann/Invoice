import { Button } from '@/components/buttons';
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const UploadFile = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const uploadProps = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
      authorization: 'authorization-text',
    },
    accept: '.xls,.xlsx',
    showUploadList: false,
    onChange(info) {
      if (info.file.status === 'uploading') {
        setLoading(true);
      } else {
        setLoading(false);
      }

      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Upload {...uploadProps}>
      <Button type="primary" size="small" outlined loading={loading}>
        <UploadOutlined />
        {t('Nhập excel')}
      </Button>
    </Upload>
  );
};
