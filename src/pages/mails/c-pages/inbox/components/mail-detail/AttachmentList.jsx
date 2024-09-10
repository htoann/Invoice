import Heading from '@/components/heading';
import AttachmentLogo from '@/static/img/files/attach2.png';
import { API_ENDPOINT, formatDataSize } from '@/utils/index';
import { UilImport } from '@iconscout/react-unicons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
// import csvImg from '@/static/img/files/csv.png';
// import pdfImg from '@/static/img/files/pdf.png';

export const AttachmentList = ({ email }) => {
  const { t } = useTranslation();

  return (
    <>
      {!!email?.attachments?.length && (
        <>
          <hr style={{ marginTop: 30, marginBottom: 15, marginLeft: 60 }} />
          <p style={{ paddingLeft: 60, fontWeight: 600, marginBottom: 10 }}>
            {email?.attachments?.length} {t('Mail_Attachments')}
          </p>
        </>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', marginLeft: 40 }}>
        {email?.attachments?.length > 0 &&
          email?.attachments.map((item) => (
            <Link
              className="message-attachments"
              key={item.id}
              to={`${API_ENDPOINT}/mails/attachments/${item.id}`}
              target="_blank"
            >
              <figure style={{ width: 150 }}>
                <div className="attachment-image">
                  <img src={AttachmentLogo} alt="" width={60} height={60} style={{ display: 'flex', margin: 'auto' }} />
                </div>
                <div className="attachment-hover">
                  <div className="btn-link" to={`${API_ENDPOINT}/mails/attachments/${item.id}`} target="_blank">
                    <UilImport />
                  </div>
                </div>
                <figcaption>
                  <Heading as="h4">
                    <div
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        width: '100%',
                      }}
                      title={item.file_name}
                    >
                      {item.file_name}
                    </div>
                  </Heading>
                  <p>{formatDataSize(item.size)}</p>
                </figcaption>
              </figure>
            </Link>
          ))}
      </div>
    </>
  );
};
