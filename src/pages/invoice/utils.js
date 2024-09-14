import { routes } from '@/routes/const';
import { formatCurrency } from '@/utils/index';
import i18next from 'i18next';

export const handleTableDataSource = (invoiceList, current, pageSize) => {
  return invoiceList?.length > 0
    ? invoiceList.map((item, index) => {
        return {
          key: item?.id || item?.no,
          stt: (current - 1) * pageSize + index + 1,
          id: item?.id || item?.no,
          khmshdon: <span>{item.khmshdon}</span>,
          khhdon: <span>{item.khhdon}</span>,
          shdon: <span>{item.shdon}</span>,
          nlap: <span>{item.nlap}</span>,
          nky: <span>{item.nky}</span>,
          nhomhd: <span>{item.nhomhd}</span>,
          chinhanh: <span>{item.chinhanh}</span>,
          mst: <span>{item.mst}</span>,
          ten: <span>{item.ten}</span>,
          tgtcthue: <span>{formatCurrency(item.tgtcthue)}</span>,
          tgtthue: <span>{formatCurrency(item.tgtthue)}</span>,
          ttcktmai: <span>{formatCurrency(item.ttcktmai)}</span>,
          thttlphi: <span>{formatCurrency(item.thttlphi)}</span>,
          tgtttbso: <span>{formatCurrency(item.tgtttbso)}</span>,
          dvtte: <span>{item.dvtte}</span>,
          tthai: <span>{item.tthai}</span>,
          ttxly: <span>{item.ttxly}</span>,
          linkhd: <span>{item.linkhd}</span>,
          matracuu: <span>{item.matracuu}</span>,
          sohdgoc: <span>{item.sohdgoc}</span>,
          sohdgocngay: <span>{item.sohdgocngay}</span>,
          loaitd: item?.loaitd?.split('\n')?.map((line, index) => <span key={index}>{line}</span>),
          ngaytd: <span>{item.ngaytd}</span>,
          msttd: <span>{item.msttd}</span>,
          tentd: <span>{item.tentd}</span>,
          diachitd: <span>{item.diachitd}</span>,
          ketquadoichieu: <span>{item.ketquadoichieu}</span>,
          tinhtrangdn: <span>{item.tinhtrangdn}</span>,
          ngaycongbo: <span>{item.ngaycongbo}</span>,
        };
      })
    : [];
};

export const handleDataTable = (loaiHoaDon) => {
  return [
    {
      title: i18next.t('Common_STT'),
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: i18next.t('Invoice_ModelCode'),
      dataIndex: 'khmshdon',
      key: 'khmshdon',
      sorter: (a, b) => a?.khmshdon?.props?.children - b?.khmshdon?.props?.children,
    },
    {
      title: i18next.t('Invoice_InvoiceCode'),
      dataIndex: 'khhdon',
      key: 'khhdon',
      sorter: (a, b) => a?.khhdon?.props?.children?.localeCompare(b?.khhdon?.props?.children),
    },
    {
      title: i18next.t('Invoice_InvoiceNumber'),
      dataIndex: 'shdon',
      key: 'shdon',
      sorter: (a, b) => a?.shdon?.props?.children - b?.shdon?.props?.children,
      fixed: 'left',
    },
    {
      title: i18next.t('Invoice_CreationDate'),
      dataIndex: 'nlap',
      key: 'nlap',
      sorter: (a, b) => a?.nlap?.props?.children?.localeCompare(b?.nlap?.props?.children),
    },
    {
      title: i18next.t('Invoice_InvoiceSignDate'),
      dataIndex: 'nky',
      key: 'nky',
      sorter: (a, b) => a?.nky?.props?.children?.localeCompare(b?.nky?.props?.children),
    },
    {
      title: i18next.t('Invoice_InvoiceGroup'),
      dataIndex: 'nhomhd',
      key: 'nhomhd',
      sorter: (a, b) => a?.nhomhd?.props?.children?.localeCompare(b?.nhomhd?.props?.children),
    },
    {
      title: i18next.t('Invoice_BranchSource'),
      dataIndex: 'chinhanh',
      key: 'chinhanh',
      sorter: (a, b) => a?.chinhanh?.props?.children?.localeCompare(b?.chinhanh?.props?.children),
    },
    {
      title: loaiHoaDon === 'sold' ? i18next.t('Invoice_BuyerTaxCode') : i18next.t('Invoice_SellerTaxCode'),
      dataIndex: 'mst',
      key: 'mst',
      sorter: (a, b) => a?.mst?.props?.children?.localeCompare(b?.mst?.props?.children),
    },
    {
      title: loaiHoaDon === 'sold' ? i18next.t('Invoice_BuyerName') : i18next.t('Invoice_SellerName'),
      dataIndex: 'ten',
      key: 'ten',
      sorter: (a, b) => a?.ten?.props?.children?.localeCompare(b?.ten?.props?.children),
    },
    {
      title: i18next.t('Địa chỉ người bán'),
      dataIndex: 'dchi',
      key: 'dchi',
      sorter: (a, b) => a?.dchi?.props?.children?.localeCompare(b?.dchi?.props?.children),
    },
    {
      title: i18next.t('Invoice_TotalBeforeTax'),
      dataIndex: 'tgtcthue',
      key: 'tgtcthue',
      sorter: (a, b) => a?.tgtcthue?.props?.children - b?.tgtcthue?.props?.children,
    },
    {
      title: i18next.t('Invoice_TotalTax'),
      dataIndex: 'tgtthue',
      key: 'tgtthue',
      sorter: (a, b) => a?.tgtthue?.props?.children - b?.tgtthue?.props?.children,
    },
    {
      title: i18next.t('Invoice_TotalCommercialDiscount'),
      dataIndex: 'ttcktmai',
      key: 'ttcktmai',
      sorter: (a, b) => a?.ttcktmai?.props?.children - b?.ttcktmai?.props?.children,
    },
    {
      title: i18next.t('Invoice_TotalFees'),
      dataIndex: 'thttlphi',
      key: 'thttlphi',
      sorter: (a, b) => a?.thttlphi?.props?.children - b?.thttlphi?.props?.children,
    },
    {
      title: i18next.t('Invoice_TotalPayment'),
      dataIndex: 'tgtttbso',
      key: 'tgtttbso',
      sorter: (a, b) => a?.tgtttbso?.props?.children - b?.tgtttbso?.props?.children,
    },
    {
      title: i18next.t('Invoice_Currency'),
      dataIndex: 'dvtte',
      key: 'dvtte',
      sorter: (a, b) => a?.dvtte?.props?.children?.localeCompare(b?.dvtte?.props?.children),
    },
    {
      title: i18next.t('Invoice_Status'),
      dataIndex: 'tthai',
      key: 'tthai',
      sorter: (a, b) => a?.tthai?.props?.children?.localeCompare(b?.tthai?.props?.children),
    },
    {
      title: i18next.t('Invoice_CheckResult'),
      dataIndex: 'ttxly',
      key: 'ttxly',
      sorter: (a, b) => a?.ttxly?.props?.children?.localeCompare(b?.ttxly?.props?.children),
    },
    {
      title: i18next.t('Invoice_TraceCode'),
      dataIndex: 'matracuu',
      key: 'matracuu',
      sorter: (a, b) => a?.matracuu?.props?.children?.localeCompare(b?.matracuu?.props?.children),
    },
    {
      title: i18next.t('Invoice_OriginalInvoiceNumber'),
      dataIndex: 'sohdgoc',
      key: 'sohdgoc',
      sorter: (a, b) => a?.sohdgoc?.props?.children - b?.sohdgoc?.props?.children,
    },
    {
      title: i18next.t('Invoice_OriginalInvoiceDate'),
      dataIndex: 'sohdgocngay',
      key: 'sohdgocngay',
      sorter: (a, b) => a?.sohdgocngay?.props?.children?.localeCompare(b?.sohdgocngay?.props?.children),
    },
    {
      title: i18next.t('Invoice_ChangeType'),
      dataIndex: 'loaitd',
      key: 'loaitd',
      sorter: (a, b) => a?.loaitd?.props?.children?.localeCompare(b?.loaitd?.props?.children),
    },
    {
      title: i18next.t('Invoice_ChangeDate'),
      dataIndex: 'ngaytd',
      key: 'ngaytd',
      sorter: (a, b) => a?.ngaytd?.props?.children?.localeCompare(b?.ngaytd?.props?.children),
    },
    {
      title: i18next.t('Common_TaxCode'),
      dataIndex: 'msttd',
      key: 'msttd',
      sorter: (a, b) => a?.msttd?.props?.children?.localeCompare(b?.msttd?.props?.children),
    },
    {
      title: i18next.t('Invoice_CompanyName'),
      dataIndex: 'tentd',
      key: 'tentd',
      sorter: (a, b) => a?.tentd?.props?.children?.localeCompare(b?.tentd?.props?.children),
    },
    {
      title: i18next.t('Common_Address'),
      dataIndex: 'diachitd',
      key: 'diachitd',
      sorter: (a, b) => a?.diachitd?.props?.children?.localeCompare(b?.diachitd?.props?.children),
    },
    {
      title: i18next.t('Invoice_InformationVerificationResult'),
      dataIndex: 'ketquadoichieu',
      key: 'ketquadoichieu',
      sorter: (a, b) => a?.ketquadoichieu?.props?.children?.localeCompare(b?.ketquadoichieu?.props?.children),
    },
    {
      title: i18next.t('Invoice_CompanyStatus'),
      dataIndex: 'tinhtrangdn',
      key: 'tinhtrangdn',
      sorter: (a, b) => a?.tinhtrangdn?.props?.children?.localeCompare(b?.tinhtrangdn?.props?.children),
    },
    {
      title: i18next.t('Invoice_PublicationDate'),
      dataIndex: 'ngaycongbo',
      key: 'ngaycongbo',
      sorter: (a, b) => a?.ngaycongbo?.props?.children?.localeCompare(b?.ngaycongbo?.props?.children),
    },
  ];
};

export const pageRoutes = [
  { path: routes.invoice, breadcrumbName: i18next.t('Invoice_Management') },
  { path: routes.invoice, breadcrumbName: i18next.t('Invoice_List') },
];
