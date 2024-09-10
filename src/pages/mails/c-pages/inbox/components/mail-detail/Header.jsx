import Heading from '@/components/heading';
import { Popover } from '@/components/popup';
import { formatTime } from '@/utils/index';
import { UilAngleDown } from '@tooni/iconscout-unicons-react';
import { Avatar } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Header = ({ email }) => {
  const { t } = useTranslation();

  return (
    <div className="message-box d-flex justify-content-between align-items-center">
      <div className="message-author">
        <Avatar size={48} style={{ backgroundColor: '#8231D3' }}>
          {email?.sender?.charAt(0)?.toUpperCase()}
        </Avatar>
        <div>
          <Heading as="h4">{email?.sender}</Heading>
          <Popover
            content={
              <ul className="mail-props">
                <li>
                  <span>{t('Common_From')}:</span> <span>{email?.sender}</span>{' '}
                </li>
                <li>
                  <span>{t('Common_To')}:</span> <span>{email?.receiver}</span>{' '}
                </li>
                {email?.cc && email?.cc !== '()' && (
                  <li>
                    <span>{t('Common_CC')}:</span> <span>{email?.cc}</span>{' '}
                  </li>
                )}
                {email?.bcc && email?.bcc !== '()' && (
                  <li>
                    <span>{t('Common_BCC')}:</span> <span>{email?.bcc}</span>{' '}
                  </li>
                )}
                <li>
                  <span>{t('Common_Date')}:</span> <span>{formatTime(email?.date, 'HH:mm D MMMM, YYYY')}</span>
                </li>
              </ul>
            }
          >
            <Link to="#">
              {t('Common_To')} {email?.receiver}
              <UilAngleDown />
            </Link>
          </Popover>
        </div>
      </div>

      <div className="message-excerpt">
        <span>{formatTime(email?.date, 'HH:mm D MMMM, YYYY')}</span>
      </div>
    </div>
  );
};
