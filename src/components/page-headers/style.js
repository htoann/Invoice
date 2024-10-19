import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 30px;
  background: ${({ theme, bgColor }) => bgColor || theme[theme.mainContent]['main-background-light']};
  border-radius: 5px;
  margin: 4px 0;

  @media only screen and (max-width: 991px) {
    padding: 18px 15px 12px;
  }

  @media only screen and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    padding: 20px 15px 30px;
  }

  .ant-page-header-heading-title {
    color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
  }

  .ant-page-header-heading-sub-title {
    color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme[theme.mainContent]['dark-text']};

  @media only screen and (max-width: 767px) {
    margin-right: 0;
  }
`;

export const BreadcrumbWrapper = styled.div`
  .ant-breadcrumb {
    display: flex;
    justify-content: flex-start;

    @media only screen and (max-width: 767px) {
      justify-content: center;
    }

    ol li {
      display: flex;

      .ant-breadcrumb-link {
        display: flex;
        transition: color 0.3s;

        div {
          line-height: 1;

          svg {
            position: relative;
            top: 2px;
            ${({ theme }) => (!theme.rtl ? 'margin-right' : 'margin-left')}: 8px;
          }
        }

        a {
          color: rgb(116, 116, 116);
        }

        &:hover {
          div {
            svg path {
              fill: ${({ theme }) => theme['primary-color']};
            }
          }
        }
      }

      .ant-breadcrumb-separator {
        display: flex;
        align-items: center;

        .invoice-separator {
          display: block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background-color: ${({ theme }) => theme[theme.mainContent]['extra-light']};
        }
      }

      &:last-child .ant-breadcrumb-separator {
        display: none;
      }
    }
  }
`;
