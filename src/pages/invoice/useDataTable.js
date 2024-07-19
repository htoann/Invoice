import { useTranslation } from 'react-i18next';

export const useInvoiceDataTable = () => {
  const { t } = useTranslation();

  return [
    {
      title: t('Common_STT'),
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('Invoice_ModelCode'),
      dataIndex: 'khmshdon',
      key: 'khmshdon',
      sorter: (a, b) => a.khmshdon.props.children - b.khmshdon.props.children,
    },
    {
      title: t('Invoice_InvoiceCode'),
      dataIndex: 'khhdon',
      key: 'khhdon',
      sorter: (a, b) => a.khhdon.props.children.localeCompare(b.khhdon.props.children),
    },
    {
      title: t('Invoice_InvoiceNumber'),
      dataIndex: 'shdon',
      key: 'shdon',
      sorter: (a, b) => a.shdon.props.children - b.shdon.props.children,
      fixed: 'left',
    },
    {
      title: t('Invoice_CreationDate'),
      dataIndex: 'ntao',
      key: 'ntao',
      sorter: (a, b) => a.ntao.props.children.localeCompare(b.ntao.props.children),
    },
    {
      title: t('Invoice_InvoiceSignDate'),
      dataIndex: 'nky',
      key: 'nky',
      sorter: (a, b) => a.nky.props.children.localeCompare(b.nky.props.children),
    },
    {
      title: t('Invoice_InvoiceGroup'),
      dataIndex: 'nhomhd',
      key: 'nhomhd',
      sorter: (a, b) => a.nhomhd.props.children.localeCompare(b.nhomhd.props.children),
    },
    {
      title: t('Invoice_BranchSource'),
      dataIndex: 'chinhanh',
      key: 'chinhanh',
      sorter: (a, b) => a.chinhanh.props.children.localeCompare(b.chinhanh.props.children),
    },
    {
      title: t('Invoice_BuyerTaxCode'),
      dataIndex: 'nmmst',
      key: 'nmmst',
      sorter: (a, b) => a.nmmst.props.children.localeCompare(b.nmmst.props.children),
    },
    {
      title: t('Invoice_BuyerName'),
      dataIndex: 'nmten',
      key: 'nmten',
      sorter: (a, b) => a.nmten.props.children.localeCompare(b.nmten.props.children),
    },
    {
      title: t('Invoice_TotalBeforeTax'),
      dataIndex: 'tgtcthue',
      key: 'tgtcthue',
      sorter: (a, b) => a.tgtcthue.props.children - b.tgtcthue.props.children,
    },
    {
      title: t('Invoice_TotalTax'),
      dataIndex: 'tgtthue',
      key: 'tgtthue',
      sorter: (a, b) => a.tgtthue.props.children - b.tgtthue.props.children,
    },
    {
      title: t('Invoice_TotalCommercialDiscount'),
      dataIndex: 'ttcktmai',
      key: 'ttcktmai',
      sorter: (a, b) => a.ttcktmai.props.children - b.ttcktmai.props.children,
    },
    {
      title: t('Invoice_TotalFees'),
      dataIndex: 'thttlphi',
      key: 'thttlphi',
      sorter: (a, b) => a.thttlphi.props.children - b.thttlphi.props.children,
    },
    {
      title: t('Invoice_TotalPayment'),
      dataIndex: 'tgtttbso',
      key: 'tgtttbso',
      sorter: (a, b) => a.tgtttbso.props.children - b.tgtttbso.props.children,
    },
    {
      title: t('Invoice_Currency'),
      dataIndex: 'dvtte',
      key: 'dvtte',
      sorter: (a, b) => a.dvtte.props.children.localeCompare(b.dvtte.props.children),
    },
    {
      title: t('Invoice_Status'),
      dataIndex: 'tthai',
      key: 'tthai',
      sorter: (a, b) => a.tthai.props.children.localeCompare(b.tthai.props.children),
    },
    {
      title: t('Invoice_CheckResult'),
      dataIndex: 'ttxly',
      key: 'ttxly',
      sorter: (a, b) => a.ttxly.props.children.localeCompare(b.ttxly.props.children),
    },
    {
      title: t('Invoice_InvoiceLink'),
      dataIndex: 'linkhd',
      key: 'linkhd',
      sorter: (a, b) => a.linkhd.props.children.localeCompare(b.linkhd.props.children),
    },
    {
      title: t('Invoice_TraceCode'),
      dataIndex: 'matracuu',
      key: 'matracuu',
      sorter: (a, b) => a.matracuu.props.children.localeCompare(b.matracuu.props.children),
    },
    {
      title: t('Invoice_OriginalInvoiceNumber'),
      dataIndex: 'sohdgoc',
      key: 'sohdgoc',
      sorter: (a, b) => a.sohdgoc.props.children - b.sohdgoc.props.children,
    },
    {
      title: t('Invoice_OriginalInvoiceDate'),
      dataIndex: 'sohdgocngay',
      key: 'sohdgocngay',
      sorter: (a, b) => a.sohdgocngay.props.children.localeCompare(b.sohdgocngay.props.children),
    },
    {
      title: t('Invoice_ChangeType'),
      dataIndex: 'loaitd',
      key: 'loaitd',
      sorter: (a, b) => a.loaitd.props.children.localeCompare(b.loaitd.props.children),
    },
    {
      title: t('Invoice_ChangeDate'),
      dataIndex: 'ngaytd',
      key: 'ngaytd',
      sorter: (a, b) => a.ngaytd.props.children.localeCompare(b.ngaytd.props.children),
    },
    {
      title: t('Invoice_TaxCode'),
      dataIndex: 'msttd',
      key: 'msttd',
      sorter: (a, b) => a.msttd.props.children.localeCompare(b.msttd.props.children),
    },
    {
      title: t('Invoice_CompanyName'),
      dataIndex: 'tentd',
      key: 'tentd',
      sorter: (a, b) => a.tentd.props.children.localeCompare(b.tentd.props.children),
    },
    {
      title: t('Invoice_Address'),
      dataIndex: 'diachitd',
      key: 'diachitd',
      sorter: (a, b) => a.diachitd.props.children.localeCompare(b.diachitd.props.children),
    },
    {
      title: t('Invoice_InformationVerificationResult'),
      dataIndex: 'ketquadoichieu',
      key: 'ketquadoichieu',
      sorter: (a, b) => a.ketquadoichieu.props.children.localeCompare(b.ketquadoichieu.props.children),
    },
    {
      title: t('Invoice_CompanyStatus'),
      dataIndex: 'tinhtrangdn',
      key: 'tinhtrangdn',
      sorter: (a, b) => a.tinhtrangdn.props.children.localeCompare(b.tinhtrangdn.props.children),
    },
    {
      title: t('Invoice_PublicationDate'),
      dataIndex: 'ngaycongbo',
      key: 'ngaycongbo',
      sorter: (a, b) => a.ngaycongbo.props.children.localeCompare(b.ngaycongbo.props.children),
    },
  ];
};
