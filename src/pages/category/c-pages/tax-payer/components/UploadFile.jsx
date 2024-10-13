import { Button } from '@/components/buttons';
import { Modal } from '@/components/modals';
import { ORG_LIST } from '@/utils/index';
import { getLocalStorage } from '@/utils/localStorage';
import { UploadOutlined } from '@ant-design/icons';
import { Checkbox, List, message, Upload } from 'antd';
import axios from 'axios';
import { useAuth } from 'context/AuthContext';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const UploadFile = () => {
  const { t } = useTranslation();
  const { userInfo } = useAuth();

  const [file, setFile] = useState(null);
  const [selectedCompanies, setSelectCompanies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const orgs = userInfo?.organizations || getLocalStorage(ORG_LIST) || [];

  const onReset = () => {
    setFile(null);
    setSelectCompanies([]);
  };

  const uploadProps = {
    beforeUpload: (selectedFile) => {
      setFile(selectedFile);
      if (selectedCompanies.length === 0) {
        setModalOpen(true);
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    fileList: file ? [file] : [],
    accept: '.xls,.xlsx',
    showUploadList: false,
  };

  const handleUpload = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('orgs', selectedCompanies);

    setLoading(true);

    axios
      .post('https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload', formData)
      .then(() => {
        message.success(`${file.name} file uploaded successfully`);
        onReset();
      })
      .catch(() => {
        message.error('Upload failed.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleModalCancel = () => {
    setModalOpen(false);
    onReset();
  };

  const handleSelectItem = (id) => {
    const isSelected = selectedCompanies.includes(id);
    if (isSelected) {
      setSelectCompanies(selectedCompanies.filter((item) => item !== id));
    } else {
      setSelectCompanies([...selectedCompanies, id]);
    }
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectCompanies(orgs.map((item) => item.id));
    } else {
      setSelectCompanies([]);
    }
  };

  return (
    <>
      <Upload {...uploadProps}>
        <Button type="primary" size="small" outlined icon={<UploadOutlined />}>
          {t('Nhập excel')}
        </Button>
      </Upload>

      <Modal
        title={t('Chọn công ty')}
        open={modalOpen}
        onOk={handleUpload}
        onCancel={handleModalCancel}
        top="100"
        footer={
          <>
            <Button size="default" type="white" outlined style={{ marginRight: 8 }} onClick={handleModalCancel}>
              {t('Common_Cancel')}
            </Button>
            <Button
              size="default"
              type="primary"
              key="submit"
              loading={loading}
              onClick={handleUpload}
              disabled={!selectedCompanies?.length}
            >
              {t('Common_Continue')}
            </Button>
          </>
        }
      >
        <Checkbox
          checked={selectedCompanies?.length === orgs?.length}
          indeterminate={!!selectedCompanies?.length && selectedCompanies?.length < orgs?.length}
          onChange={handleSelectAll}
          style={{ marginBottom: 16, marginLeft: 24, fontWeight: 500 }}
        >
          <span style={{ marginLeft: 10 }}>{t('Chọn tất cả')}</span>
        </Checkbox>

        <List
          style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: 10 }}
          dataSource={orgs}
          renderItem={(item) => (
            <List.Item>
              <Checkbox
                style={{ margin: '2px 0', width: '100%' }}
                checked={selectedCompanies.includes(item.id)}
                onChange={() => handleSelectItem(item.id)}
              >
                <span style={{ marginLeft: 10 }}>{item.name}</span>
              </Checkbox>
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
};
