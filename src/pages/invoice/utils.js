import { formatCurrency } from '@/utils/index';

export const handleTableDataSource = (invoiceList, current, pageSize) => {
  return invoiceList?.length > 0
    ? invoiceList.map((item, index) => {
        return {
          stt: (current - 1) * pageSize + index + 1,
          id: item.no,
          khmshdon: <span>{item.khmshdon}</span>,
          khhdon: <span>{item.khhdon}</span>,
          shdon: <span>{item.shdon}</span>,
          ntao: <span>{item.ntao}</span>,
          nky: <span>{item.nky}</span>,
          nhomhd: <span>{item.nhomhd}</span>,
          chinhanh: <span>{item.chinhanh}</span>,
          nmmst: <span>{item.nmmst}</span>,
          nmten: <span>{item.nmten}</span>,
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
          loaitd: <span>{item.loaitd}</span>,
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
