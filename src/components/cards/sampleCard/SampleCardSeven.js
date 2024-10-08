import { UilEllipsisH } from '@tooni/iconscout-unicons-react';
import propTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../buttons';
import { Checkbox } from '../../checkbox/checkbox';
import { Dropdown } from '../../dropdown';

const CardWrapper = styled.figure`
  background: ${({ theme }) => theme[theme.mainContent]['white-background']};
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  margin-bottom: 0;
  .card-short {
    .card-short__title {
      padding: 25px 25px 0;
    }
    .card-short__content {
      padding: 0 25px;
      p {
        color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
      }
    }
    .card-short__title {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 18px;
      color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
      img {
        max-width: 50px;
        ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 20px;
      }
    }
    .card-short__bottom {
      border-top: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-default']};
      padding: 20px 25px 25px;
      .card-short-actions {
        .ant-btn-circle {
          border-radius: 42px;
          ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 16px;
          svg,
          img,
          i {
            color: ${({ theme }) => theme[theme.mainContent]['extra-light-text']};
          }
        }
        .content-action {
          display: flex;
          align-items: center;
          .ant-dropdown-trigger {
            svg,
            img,
            i {
              color: ${({ theme }) => theme[theme.mainContent]['extra-light-text']};
            }
          }
        }
      }
      .card-short-checkbox {
        display: none;
      }
      .content-installed {
        display: none !important;
      }
      .content-not-installed.content-action {
        justify-content: flex-end;
      }
      &.installed {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .content-not-installed {
          display: none;
        }
        .content-installed {
          display: flex !important;
          .more {
            line-height: 1;
          }
        }
        .card-short-checkbox {
          display: block !important;
          .ant-checkbox {
            &:hover {
              .ant-checkbox-inner {
                border-color: #01b81a;
              }
            }
          }
          .ant-checkbox-checked {
            &:after {
              border-color: ${({ theme }) => theme['success-color']};
            }
            .ant-checkbox-inner {
              border-color: ${({ theme }) => theme['success-color']};
              background: ${({ theme }) => theme['success-color']};
              &:hover {
                border-color: ${({ theme }) => theme['success-color']};
                background: ${({ theme }) => theme['success-color']};
                color: #fff;
              }
            }
          }
          span {
            color: ${({ theme }) => theme['success-color']};
          }
        }
      }
    }
  }
`;

const SampleCardSeven = ({
  item = {
    id: 1,
    title: 'Adobe CC',
    installed: true,
    content: 'Lorem Ipsum is simply dummy text of the and the typesetting industry.',
    img: 'static/img/icon/adobe.svg',
  },
}) => {
  const { installed, content, title, img } = item;
  const [state, setState] = useState({
    checked: false,
  });
  const onChange = (checked) => {
    setState({ ...state, checked });
  };
  return (
    <CardWrapper>
      <div className="card-short">
        <h4 className="card-short__title align-v-center">
          <img src={require(`@/${img}`)} alt="" />
          <span>{title}</span>
        </h4>
        <div className="card-short__content">
          <p>{content}</p>
        </div>
        <div className={installed ? 'card-short__bottom installed' : 'card-short__bottom'}>
          <div className="card-short-checkbox">
            <Checkbox checked={state.checked} onChange={onChange}>
              Installed
            </Checkbox>
          </div>
          <div className="card-short-actions">
            <div className="content-installed content-action">
              <Button type="primary" size="small" shape="circle" outlined>
                Open
              </Button>
              <div className="more">
                <Dropdown
                  action={['click']}
                  className="wide-dropdown"
                  content={
                    <>
                      <Link to="#">Edit</Link>
                      <Link to="#">Delete</Link>
                      <Link to="#">View</Link>
                    </>
                  }
                >
                  <Link to="#">
                    <UilEllipsisH />
                  </Link>
                </Dropdown>
              </div>
            </div>
            <div className="content-not-installed content-action">
              <Button type="primary" size="small" shape="circle" raised>
                Install
              </Button>
              <div className="more">
                <Dropdown
                  action={['click']}
                  className="wide-dropdown"
                  content={
                    <>
                      <Link to="#">Edit</Link>
                      <Link to="#">Delete</Link>
                      <Link to="#">View</Link>
                    </>
                  }
                >
                  <Link to="#">
                    <UilEllipsisH />
                  </Link>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};

SampleCardSeven.propTypes = {
  item: propTypes.object,
};

export default SampleCardSeven;
