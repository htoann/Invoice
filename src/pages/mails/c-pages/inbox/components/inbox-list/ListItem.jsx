import { formatTime } from '@/utils/index';
import { UilInbox } from '@iconscout/react-unicons';
import Paragraph from 'antd/lib/typography/Paragraph';
import { Link } from 'react-router-dom';
import { EmailNav } from '../style';

export const ListItem = ({ inboxList, selectedInbox, setSelectedInbox }) => {
  return (
    <EmailNav>
      <ul>
        {inboxList?.length > 0 &&
          inboxList.map((item) => (
            <li key={item.id} style={{ marginBottom: 5 }}>
              <Link
                className={item?.id === selectedInbox?.id ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedInbox(item);
                }}
              >
                <UilInbox />
                <span className="nav-text">
                  <div className="email-container">
                    <div className="email-content">
                      <Paragraph className="email-subject" ellipsis title={item?.subject}>
                        {item?.subject}
                      </Paragraph>
                      <Paragraph
                        className="email-sender"
                        ellipsis
                        style={{
                          width: '100%',
                          marginBottom: 0,
                          lineHeight: '1.2rem',
                        }}
                        title={item?.sender}
                      >
                        {item?.sender}
                      </Paragraph>
                    </div>
                    <span className="email-date">{formatTime(item?.date, 'DD/MM/YY')}</span>
                  </div>
                </span>
              </Link>
            </li>
          ))}
      </ul>
    </EmailNav>
  );
};
