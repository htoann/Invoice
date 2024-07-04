export const handleTableDataSource = (invoiceList) => {
  const tableDataSource = [];

  if (invoiceList.length > 0) {
    invoiceList.map((item) => {
      return tableDataSource.push({
        id: item.no,
        khmshdon: <span className="ninjadash-username">{item.khmshdon}</span>,
        khhdon: <span>{item.khhdon}</span>,
        shdon: <span>{item.shdon}</span>,
        ntao: <span>{item.ntao}</span>,
        nky: <span>{item.nky}</span>,
        nhomhd: <span>{item.nhomhd}</span>,
        chinhanh: <span>{item.chinhanh}</span>,
        nmmst: <span>{item.nmmst}</span>,
        nmten: <span>{item.nmten}</span>,
        tgtcthue: <span>{item.tgtcthue}</span>,
        tgtthue: <span>{item.tgtthue}</span>,
        ttcktmai: <span>{item.ttcktmai}</span>,
        thttlphi: <span>{item.thttlphi}</span>,
        tgtttbso: <span>{item.tgtttbso}</span>,
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
      });
    });
  }

  return tableDataSource;
};
