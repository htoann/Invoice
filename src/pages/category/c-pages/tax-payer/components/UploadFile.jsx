// import { Button } from '@/components/buttons';
// import { Modal } from '@/components/modals';
// import { API_TAX_PAYER_EXCEL } from '@/service/apiConst';
// import { dataService } from '@/service/dataService';
// import { ORG_LIST } from '@/utils/index';
// import { getLocalStorage } from '@/utils/localStorage';
// import { UploadOutlined } from '@ant-design/icons';
// import { Checkbox, List, message, Tooltip, Upload } from 'antd';
// import { useAuth } from 'context/AuthContext';
// import { useState } from 'react';
// import { useTranslation } from 'react-i18next';

// export const UploadFile = ({ getList }) => {
//   const { t } = useTranslation();
//   const { userInfo } = useAuth();

//   const [file, setFile] = useState(null);
//   const [selectOrgs, setSelectOrgs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const orgs = userInfo?.organizations || getLocalStorage(ORG_LIST) || [];

//   const onReset = () => {
//     setFile(null);
//     setSelectOrgs([]);
//   };

//   const uploadProps = {
//     beforeUpload: (selectedFile) => {
//       setFile(selectedFile);
//       if (selectOrgs.length === 0) {
//         setIsModalOpen(true);
//         return Upload.LIST_IGNORE;
//       }
//       return false;
//     },
//     fileList: file ? [file] : [],
//     accept: '.xls,.xlsx',
//     showUploadList: false,
//   };

//   const handleUpload = () => {
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('file', file);
//     selectOrgs.forEach((orgId) => {
//       formData.append('organization_ids[]', +orgId);
//     });

//     setLoading(true);

//     dataService
//       .post(API_TAX_PAYER_EXCEL, formData, {
//         'Content-Type': 'multipart/form-data',
//       })
//       .then(() => {
//         message.success(`${file.name} đã được tải lên thành công`);
//         setIsModalOpen(false);
//         onReset();
//         getList();
//       })
//       .catch(() => {
//         message.error('Nhập excel thất bại');
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   const handleModalCancel = () => {
//     setIsModalOpen(false);
//     onReset();
//   };

//   const handleSelectItem = (id) => {
//     const isSelected = selectOrgs.includes(id);
//     if (isSelected) {
//       setSelectOrgs(selectOrgs.filter((item) => item !== id));
//     } else {
//       setSelectOrgs([...selectOrgs, id]);
//     }
//   };

//   const handleSelectAll = (e) => {
//     const isChecked = e.target.checked;
//     if (isChecked) {
//       setSelectOrgs(orgs.map((item) => item.id));
//     } else {
//       setSelectOrgs([]);
//     }
//   };

//   return (
//     <>
//       <Upload {...uploadProps}>
//         <Button type="primary" size="small" outlined icon={<UploadOutlined />}>
//           {t('Nhập excel')}
//         </Button>
//       </Upload>

//       <Modal
//         title={t('Chọn công ty')}
//         open={isModalOpen}
//         onOk={handleUpload}
//         onCancel={handleModalCancel}
//         top="100"
//         footer={
//           <>
//             <Button size="default" type="white" outlined style={{ marginRight: 8 }} onClick={handleModalCancel}>
//               {t('Common_Cancel')}
//             </Button>
//             <Button
//               size="default"
//               type="primary"
//               key="submit"
//               loading={loading}
//               onClick={handleUpload}
//               disabled={!selectOrgs?.length}
//             >
//               {t('Common_Continue')}
//             </Button>
//           </>
//         }
//       >
//         <Checkbox
//           checked={selectOrgs?.length === orgs?.length}
//           indeterminate={!!selectOrgs?.length && selectOrgs?.length < orgs?.length}
//           onChange={handleSelectAll}
//           style={{ marginBottom: 16, marginLeft: 24, fontWeight: 500 }}
//           disabled={!orgs?.length}
//         >
//           <span style={{ marginLeft: 10 }}>{t('Chọn tất cả')}</span>
//         </Checkbox>

//         <List
//           style={{ maxHeight: '500px', overflowY: 'auto' }}
//           dataSource={orgs}
//           renderItem={(item) => (
//             <List.Item style={{ margin: '0 24px', paddingLeft: 0 }}>
//               <Checkbox
//                 style={{ margin: '2px 0', width: '100%' }}
//                 checked={selectOrgs.includes(item.id)}
//                 onChange={() => handleSelectItem(item.id)}
//               >
//                 <Tooltip title={item.name}>
//                   <span className="text-ellipsis" style={{ marginLeft: 10, width: 490 }}>
//                     {item.name}
//                   </span>
//                 </Tooltip>
//               </Checkbox>
//             </List.Item>
//           )}
//         />
//       </Modal>
//     </>
//   );
// };

import { Button } from '@/components/buttons';
import { API_TAX_PAYER_EXCEL } from '@/service/apiConst';
import { dataService } from '@/service/dataService';
import { UploadOutlined } from '@ant-design/icons';
import { message, notification, Upload } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const UploadFile = ({ getList }) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  const handleUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);

    dataService
      .post(API_TAX_PAYER_EXCEL, formData, {
        'Content-Type': 'multipart/form-data',
      })
      .then(() => {
        message.success(`${file.name} đã được tải lên thành công`);
        getList();
      })
      .catch((err) => {
        const errMsg =
          err?.response?.data?.errors?.code === 'invalid_organization'
            ? t('Vui lòng sử dụng mã số thuế mà bạn có quyền quản lý.')
            : t('Có lỗi xảy ra khi nhập excel.');
        notification.error({
          message: t('Thông tin người nộp thuế'),
          description: errMsg,
        });
      })
      .finally(() => {
        setLoading(false);
      });

    return false;
  };

  const uploadProps = {
    accept: '.xls,.xlsx',
    customRequest: ({ file }) => handleUpload(file),
    showUploadList: false,
  };

  return (
    <Upload {...uploadProps}>
      <Button type="primary" size="small" outlined icon={<UploadOutlined />} loading={loading}>
        {t('Nhập excel')}
      </Button>
    </Upload>
  );
};
