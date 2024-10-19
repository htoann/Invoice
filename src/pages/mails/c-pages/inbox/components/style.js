import { Table } from 'antd';
import Styled from 'styled-components';

const Style = Styled(Table)`
  margin-bottom: 30px;  
  .ant-table{
    padding-bottom: 30px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme[theme.mainContent]['white-background']};
    tr{
      th,
      td{
        border-bottom: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-default']};
        &:first-child{
          ${({ theme }) => (theme.rtl ? 'padding-right' : 'padding-left')}: 30px;
        }
        &:last-child{
          ${({ theme }) => (!theme.rtl ? 'padding-right' : 'padding-left')}: 30px;
        }
      }
    }
    .ant-table-selection-extra{
      right: 15px;
    }
  }
  .ant-table-thead{
    >tr{
      >th{
        background: ${({ theme }) => theme[theme.mainContent]['white-background']};
        &:first-child{
          ${({ theme }) => (!theme.rtl ? 'padding-right' : 'padding-left')}: 20px;
          border-top-left-radius: 10px !important;
        }
        &:last-child{
          border-top-right-radius: 10px !important;
        }
        .ant-table-selection-extra{
          ${({ theme }) => (!theme.rtl ? 'right' : 'left')}: -25px
        }
        .ant-dropdown-trigger{
          svg{
            width: 20px;
            color: ${({ theme }) => theme['gray-solid']};
          }
        }
        .email-top-search{
          display: flex;
          justify-content: ${({ theme }) => (theme.rtl ? 'flex-start' : 'flex-end')};
          align-items: center;
          min-width: 350px;
          @media only screen and (max-width: 575px){
            display: none;
          }
          .ant-select{
            max-width: 350px;
          }
          .ant-select-selector{
            height: 46px !important;
          }
          .ant-select-selection-search{
            width: 100% !important;
            .ant-select-selection-search-input{
              text-align: right;
              border-radius: 24px;
              background:  ${({ theme }) => theme[theme.mainContent]['general-background']};
              border: 0 none;
              input{
                height: 44px !important;
                border-radius: 6px !important;
                background:  ${({ theme }) => theme[theme.mainContent]['general-background']};
                &::placeholder{
                  color:  ${({ theme }) => theme[theme.mainContent]['extra-light-text']};
                }
              }
              .ant-input-suffix{
                ${({ theme }) => (!theme.rtl ? 'margin-right' : 'margin-left')}: 0;
                .anticon-search{
                  svg{
                    color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
                  }
                }
              }
            }
          }
        }
        .email-top-right{
          justify-content: flex-end;
          .email-extra{
            line-height: 1;
            a{
              color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
              &:not(:last-child){
                ${({ theme }) => (theme.rtl ? 'margin-left' : 'margin-right')}: 25px;
              }
              svg{
                width: 16px;
                height: 16px;
              }
            }
          }
          .page-number{
            display: inline-block;
            font-size: 14px;
            font-weight: 400;
            color: ${({ theme }) => theme[theme.mainContent]['gray-light-text']};
            @media only screen and (max-width: 575px){
              display: none;
            }
          }
          .pagination-slider{
            margin: ${({ theme }) => (theme.rtl ? '0 15px 0 20px' : '0 20px 0 15px')};
            .btn-paging{
              display: inline-flex;
              height: 30px;
              width: 30px;
              border-radius: 50%;
              align-items: center;
              justify-content: center;
              &:hover{
                background: ${({ theme }) => theme['primary-color']}10;
              }
              svg{
                color: ${({ theme }) => theme[theme.mainContent]['light-text']};
              }
            }
          }
        }
      }
    }
  }

  
  .ant-table-tbody{
    .ant-table-cell{
      white-space: normal !important;
      text-align: ${({ theme }) => (theme.rtl ? 'right' : 'left')};
    }
    >tr{
      &:hover{
        box-shadow: 0 15px 40px ${({ theme }) => theme['gray-solid']}20;
        h1{
          font-weight: 600;
          color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
          a{
            color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
          }
        }
        .email-time{
          font-weight: 500;
          color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
        }
        >td{
          background: ${({ theme }) => theme[theme.mainContent]['white-background']} !important;
          border-color: ${({ theme }) => theme[theme.mainContent]['border-color-default']};
        }
      }
      p{
        color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
      }
      h1 a{
        font-weight: 500;
        transition: 0s;
        color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
      }
      &.ant-table-row-selected{
        &:hover{
            >td{
              background: ${({ theme }) => theme[theme.mainContent]['white-background']};
            }
        }
        >td{
          background: ${({ theme }) => theme[theme.mainContent]['white-background']};
        }
      }
      >td{
        padding: 15px 16px;
        &:last-child{
          text-align: ${({ theme }) => (!theme.rtl ? 'right' : 'left')};
        }
        .ant-checkbox-wrapper{
          margin-top: 5px;
        }
        .email-time{
          font-size: 13px;
          font-weight: 400;
          color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
        }
      }
    }
  }
  .ant-table-thead > tr > th .ant-table-header-column {
    width: 100%;
  }
  .ant-table-thead > tr:first-child > th:last-child {
    border-top-right-radius: 4px;
  }
  .ant-pagination-item {
    display: none;
  }
  .ant-table-pagination.ant-pagination {
    position: absolute;
    z-index: 1;
    ${({ theme }) => (!theme.rtl ? 'right' : 'left')}: 0;
  }
  
`;

const small = ({ rtl }) => {
  return `
    max-width: 600px;
    width: 100%;
    position: fixed;
    height: calc(100vh - 40%);
    bottom: 140px;
    ${!rtl ? 'right' : 'left'}: 15px;
    @media only screen and (max-width: 1450px){
      height: calc(100vh - 50%);
      bottom: 35%;
    }
    @media only screen and (max-width: 575px){
      min-height: 450px;
      bottom: 80px;
    }
`;
};

const big = ({ rtl }) => {
  return `
  max-width: 1200px;
  width: 100%;
  position: fixed;
  min-height: 600px;
  bottom: 100px;
  ${!rtl ? 'right' : 'left'}: 100px;
  z-index: 988;
  `;
};

const MailBox = Styled.div`
  ${({ size, theme }) => size === 'small' && small(theme)}
  ${({ size, theme }) => size === 'big' && big(theme)}

  background: ${({ theme }) => theme[theme.mainContent]['white-background']};
  z-index: 988;
  border-radius: 10px;
  box-shadow: 0 10px 50px rgba(146, 153, 184, .19);
  @media only screen and (max-width: 575px){
    ${({ theme }) => (!theme.rtl ? 'right' : 'left')}: 0;
  }
  .reply-inner{
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-default']} !important;
    &:focus,
    &:hover{
      border-color: ${({ theme }) => theme['primary-color']};
    }
  }
  input{
    border: 0 none;
    border-radius: 0px;
    background: ${({ theme }) => theme[theme.mainContent]['white-background']};
    border-bottom: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-default']};
  }
  .react-tagsinput{
    width: 100%;
    background: ${({ theme }) => theme[theme.mainContent]['white-background']};
    ${({ theme }) => (theme.rtl ? 'padding-right' : 'padding-left')}: 0;
    border: 0 none;
    input{
      border: 0 none;
      width: 100%;
    }
    input::placeholder{
      color: ${({ theme }) => theme[theme.mainContent]['light-text']};
    }
    .react-tagsinput-tag{
      padding: 5px 16px;
      border: 0 none;
      border-radius: 16px;
      color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
      background: ${({ theme }) => theme[theme.mainContent]['general-background']};
      .react-tagsinput-remove{
        ${({ theme }) => (theme.rtl ? 'padding-right' : 'padding-left')}: 8px;
        color: ${({ theme }) => theme[theme.mainContent]['light-text']};
      }
    }
  }
  .ant-upload-list{
    position: absolute;
    bottom: 15%;
    ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 25px;
    width: 95%;    
  }
  input{
    padding: 15px 0;
    color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
    &:focus{
      box-shadow: 0 0;
    }
  }
  input::placeholder{
    color: ${({ theme }) => theme[theme.mainContent]['light-text']};
  }

  .header {
    padding: 20px;
    color: ${({ theme }) => theme[theme.mainContent]['white-text']};
    border-radius: 10px 10px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: ${({ theme }) => theme[theme.mainContent]['dark-text']};
    p {
      margin: 0;
      padding: 0;
    }
    .icon-right {
      svg {
        width: 18px;
        height: 18px;
        cursor: pointer;
        opacity: .70;
      }
      svg:first-child {
        ${({ theme }) => (!theme.rtl ? 'margin-right' : 'margin-left')}: 20px;
      }
    }
  }
  .body {
    @media only screen and (max-width: 1599px){
      height: 450px;
      overflow-y: scroll;
    }
    @media only screen and (max-width: 1450px){
      height: 400px;
    }
    .group {
      padding: 0px 30px;
      position: relative;
      @media only screen and (max-width: 575px){
        padding: 0px 15px;
      }
      >div{
        box-shadow: 0 0;
        background: ${({ theme }) => theme[theme.mainContent]['white-background']};
        border: none;
      }
      .mail-cc{
        position: absolute;
        ${({ theme }) => (!theme.rtl ? 'right' : 'left')}: 30px;
        color: ${({ theme }) => theme[theme.mainContent]['light-text']};
      }
      .DraftEditor-root{
        font-size: 14px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }
      .EditorToolbar__root___3_Aqz{
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        border-bottom-color: ${({ theme }) => theme[theme.mainContent]['border-color-default']};
        .public-DraftStyleDefault-block{
          color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
          span{
            color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
          }
        }
      }
    }
    .public-DraftEditorPlaceholder-root{
      padding-top: 20px;
    }
    .public-DraftEditor-content {
      height: 275px;
      padding-top: 20px;
      @media only screen and (max-width: 1599px){
        height: 220px
      }
      @media only screen and (max-width: 1450px){
        height: 170px
      }
      @media only screen and (max-width: 575px){
        height: 160px
      }
    }
  }
  .footer {
    border-top: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-default']};
    padding: 20px 0 30px;
    margin: 0 30px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left{
      button,
      a{
        ${({ theme }) => (!theme.rtl ? 'margin-right' : 'margin-left')}: 10px;
        line-height: 1;
        svg{
          width: 18px;
          height: 18px;
          color: ${({ theme }) => theme[theme.mainContent]['gray-light-text']};
        }
      }
      .ant-upload {
        margin-top: 4px;
          svg{
            width: 15px;
            height: 15px;
            ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 10px;
          }
      }
      .ant-upload-list{
        overflow: hidden;
        .ant-upload-list-item{
          border-radius: 4px;
          height: 25px;
          line-height: 2.5;
          z-index: 10;
          background: ${({ theme }) => theme[theme.mainContent]['general-background']};
          .ant-upload-list-item-name{
            font-size: 13px;
          }
          .ant-upload-list-item-card-actions{
            top: -4px;
            line-height: 1;
          }
        }
      }
    }
    .right{
      line-height: 1;
      a{
        color: ${({ theme }) => theme[theme.mainContent]['gray-light-text']};
        svg{
          width: 18px;
          height: 18px;
          color: ${({ theme }) => theme[theme.mainContent]['gray-light-text']};
        }
      }
    }
  }
`;

const EmailNav = Styled.nav`
  ul{
    list-style: none;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 0;
    padding-right: 5px;
    li{
      &:has(.empty) {
        position: relative;
        height: 100%;
      }
      &.add-label-btn{
        direction: ${({ theme }) => (!theme.rtl ? 'ltr' : 'ltr')};
        a{
          direction: ${({ theme }) => (!theme.rtl ? 'ltr' : 'rtl')};
        }
        &:hover{
          background: transparent;
          a{
            background: transparent;
            color: ${({ theme }) => theme['primary-color']} !important;
          }
        }
        a{
          color: ${({ theme }) => theme[theme.mainContent]['gray-light-text']} !important;
          transition: .3s;
          span{
            line-height: 1.5;
          }
          &:hover{
            background: transparent;
            svg,
            i,
            span{
              color: ${({ theme }) => theme['primary-color']};
            }
          }
        }
      }
      a{
        padding: 10px 15px;
        display: flex;
        align-items: center;
        transition: 0.3s ease;
        border-radius: 6px;
        line-height: 1;
        color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
        svg{
          width: 16px;
          min-width: 16px;
          ${({ theme }) => (!theme.rtl ? 'margin-right' : 'margin-left')}: 15px;
          color: ${({ theme }) => theme[theme.mainContent]['extra-light-text']};
        }
        &.active{
          background: ${({ theme }) => theme[theme.mainContent]['primary-transparent']};
          color: ${({ theme }) => theme[theme.mainContent]['menu-active']};
          span{
            color: ${({ theme }) => theme[theme.mainContent]['menu-active']};
          }
          svg,
          i{
            color: ${({ theme }) => theme[theme.mainContent]['menu-active']};
          }
        }
        span{
          color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
        }
      }

      &:hover{
        a{
          background: ${({ theme }) => theme[theme.mainContent]['primary-transparent']};
          color: ${({ theme }) => theme[theme.mainContent]['menu-active']};
          svg,
          i{
            color: ${({ theme }) => theme[theme.mainContent]['menu-active']};
          }
        }
      }
      .nav-text{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .email-container {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 0.5rem;
          width: 100%;
          flex: 1;
          align-items: center;
          grid-auto-flow: column;
          grid-template-rows: auto;

          .email-content {
            display: flex;
            flex-direction: column;
            grid-column: 1 / 2;
            overflow: hidden;

            .email-subject {
              width: 100%;
              font-weight: 500;
              color: rgb(64, 64, 64);
              margin-bottom: 5px !important;
              line-height: 1.5;
            }

            .email-sender {
              width: 100%;
              margin-bottom: 0;
              line-height: 1.2rem;
            }
          }

          .email-date {
            white-space: nowrap;
            font-size: 13px;
            font-weight: 400;
            color: rgb(64, 64, 64);
            grid-column: 2 / 3;
          }
        }
      }
      .add-label{
        box-shadow: 0 10px 40px rgba(146,153,184,0.2);
        padding: 25px 30px;
        position: relative;
        width: calc(100% + 60px);
        ${({ theme }) => (theme.rtl ? 'left' : 'left')}: 50%;
        transform: translateX(-50%);
        background: ${({ theme }) => theme[theme.mainContent]['white-background']};
        border-radius: 8px;
        @media only screen and (max-width: 1199px){
          width: calc(100% + 40px);
          padding: 15px;
          bottom: 150px;
        }
        h1{
          text-align: left;
          font-size: 16px;
          line-height: 20px;
          margin-bottom: 16px;
          font-weight: 500;
          transition: .3s;
          color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
        }
        input{
          height: 44px;
          border-radius: 2px;
          background-color: ${({ theme }) => theme[theme.mainContent]['input-bg']};
          border: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-default']};
        }
        .btn-group{
          margin-top: 15px;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          margin: 10px -5px -5px;
          button{
            margin: 5px;
            height: 38px;
          }
          .ant-btn-default{
            padding: 0 12px;
            color: ${({ theme }) => theme[theme.mainContent]['light-text']};
          }
        }
      }
    }
  }
  .nav-labels{
    margin-top: 35px;
    p{
      font-size: 12px;
      text-align: left;
      margin: 0;
      padding: 0 15px;
      color: #9299b8;
      text-align: ${({ theme }) => (theme.rtl ? 'right' : 'left')};
    }
    ul{
      margin-top: 6px;
      margin-bottom: 0;
    }
  }
`;

const MailDetailsWrapper = Styled.div`
  .ant-card-body{
    padding-top: 30px !important;
    overflow: auto;
    max-height: var(--mail-detail)
  }
  .ant-card-head-wrapper{
    @media only screen and (max-width: 767px){
      flex-flow: column;
      align-items: center;
    }
  }

  .ant-card-head {
    .ant-card-extra{
      @media only screen and (max-width: 767px){
        width: 100%;
        justify-content: center;
      }
    }
    .ant-card-head-title{
      @media only screen and (max-width: 767px){
        padding: 18px 0 0;
      }
    }
  }
`;
const MessageAction = Styled.div`
  display: flex;
  align-items: center;
  margin: 0 -5px;
  @media only screen and (max-width: 575px){
    flex-flow: row !important;
    margin-bottom: 5px;
  }
  a{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    margin: 0 4px;
    transition: 0.3s ease;
    @media only screen and (max-width: 575px){
      width: 25px;
      height: 25px;
    }
    svg{
      min-width: 16px;
      width: 16px;
      color: ${({ theme }) => theme[theme.mainContent]['extra-light-text']};
    }
    &:hover{
      background: rgba(95,99,242,0.05);
      svg{
        color: ${({ theme }) => theme['primary-color']};
      }
    }
  }
`;

const EmailAuthor = Styled.div`
  display: flex;
  align-items: center;  
  svg{
    color: ${({ theme }) => theme[theme.mainContent]['extra-light-text']};
  }
  img{
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: inline-block;
    ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 20px;
    ${({ theme }) => (!theme.rtl ? 'margin-right' : 'margin-left')}: 16px;
  }
  h1{
    margin: 0;
    font-size: 15px;
    font-weight: 500;
    a{
      color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
      transition: .3s;
    }
  }
  i,
  span.fa{
    color: ${({ theme }) => theme[theme.mainContent]['gray-light-text']};
  }
`;

const EmailHeader = Styled.div`
  min-width: 540px;
  @media only screen and (max-width: 575px){
    min-width: 180px;
  }
  h1{
    font-size: 15px;
    font-weight: 500;
    transition: .3s;
    color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
    a{
      color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
      transition: .3s;
      &:hover{
        color: ${({ theme }) => theme['primary-color']};
      }
    }
  }
  .mail-badge{
    display: inline-block;
    ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 10px;
    font-size: 12px;
    font-weight: 400;
    height: 22px;
    padding: 0 6.4px;
    border-radius: 3px;
    text-transform: capitalize;
    color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
    background: ${({ theme }) => theme[theme.mainContent]['dark-background']};
    @media only screen and (max-width: 575px){
      ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 0px;
    }
    &.primary{
      background: ${({ theme }) => theme[theme.mainContent]['primary-transparent']};
      color: ${({ theme }) => theme[theme.mainContent]['menu-active']};
    }
  }
  p{
    margin: 0;
    color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
  }
  .btn-attachment{
    font-size: 13px;
    margin-top: 15px;
    display: inline-flex;
    align-items: center;
    height: 30px;
    padding: 0 22px;
    border-radius: 15px;
    color: ${({ theme }) => theme[theme.mainContent]['gray-light-text']};
    background: ${({ theme }) => theme[theme.mainContent]['general-background']};
    @media only screen and (max-width: 575px){
      display: none;
    }
    i,
    svg{
      min-width: 16px;
      width: 16px;
      ${({ theme }) => (!theme.rtl ? 'margin-right' : 'margin-left')}: 6px;
    }
  }
  a + a{
    ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 15px;
  }
`;

const MessageDetails = Styled.div`
  padding: 0 30px;
  width: fit-content;
  .message-box {
    @media only screen and (max-width: 767px){
      flex-flow: column;
      align-items: flex-start;
    }
    @media only screen and (max-width: 575px){
      padding: 0;
    }
  }
  >div{
    &.align-items-center{
      @media only screen and (max-width: 375px){
        align-items: flex-start;
      }
    }
  }
  .message-subject{
    h1{
      display: flex;
      align-items: center;
      font-weight: 500;
      color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
      @media only screen and (max-width: 767){
        font-size: 20px;
      }
      @media only screen and (max-width: 375px){
        flex-flow: column;
        align-items: flex-start;
      }
      .mail-badge{
        display: inline-block;
        ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 20px;
        font-size: 12px;
        font-weight: 400;
        height: 20px;
        line-height: 1.6;
        padding: 0 6.4px;
        border-radius: 3px;
        text-transform: capitalize;
        @media only screen and (max-width: 375px){
          margin: 15px 0 0 0;
        }
        background: ${({ theme }) => theme['bg-color-deep']};
        &.primary{
          background: ${({ theme }) => theme[theme.mainContent]['primary-transparent']};
          color: ${({ theme }) => theme[theme.mainContent]['menu-active']};
        }
      }
    }
  }
  .message-action{
    display: flex;
    align-items: center;
    a{
      display: flex;
      align-items:center;
      justify-content: center;
      flex-direction: column;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      transition: 0.3s ease;
      color: ${({ theme }) => theme[theme.mainContent]['gray-light-text']};
      svg{
        min-width: 16px;
        width: 16px;
        height: 16px;
        margin: -3px 0;
      }
      &:hover{
        background: rgba(95,99,242,0.05);
      }
    }
  }
  .message-author{
    display: flex;
    align-items: center;
    margin-top: 20px;
    @media only screen and (max-width: 767px){
      margin-top: 14px;
    }
    div{
      ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 20px;
      h1{
        font-weight: 500;
        font-size: 16px;
        margin-bottom: 4px;
        color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
      }
      a{
        display: flex;
        align-items: center;
        color: ${({ theme }) => theme[theme.mainContent]['gray-light-text']};
        svg,
        i{
          min-width: 18px;
          width: 18px;
          height: 18px;
          ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 5px;
        }
      }
    }

  }
  .message-excerpt{
    display: flex;
    align-items: center;
    margin: 0 -15px;
    @media only screen and (max-width: 767px){
      margin: 18px 0 0;
    }
    span + span{
      font-size: 13px;
      line-height: 1.5;
    }
    span, a{
      display: block;
      padding: 0 15px;
      line-height: 0;
      color: ${({ theme }) => theme[theme.mainContent]['gray-light-text']};
      @media only screen and (max-width: 1199px){
        padding: 0 6px;
      }
    }
    & > span{
      ${({ theme }) => (theme.rtl ? 'padding-right' : 'padding-left')}: 0;
    }
    svg{
      min-width: 16px;
      width: 16px;
      height: 16px;
    }
    a{
      i,
      span.fa{
        font-size: 16px;
        color: ${({ theme }) => theme[theme.mainContent]['gray-light-text']};
      }
      &.starDeactivate{
        i:before{
          content: "\f31b";
        }
      }
      &.starActive{
        color: ${({ theme }) => theme['warning-color']};
        i:before,
        span.fa:before{
          content: "\f005";
        }
      }
    }
  }

  .message-body{
    ${({ theme }) => (theme.rtl ? 'padding-right' : 'padding-left')}: 60px;
    margin-top: 25px;
    width: 100%;
    margin-bottom: 0 !important;

    @media only screen and (max-width: 767px){
      ${({ theme }) => (theme.rtl ? 'padding-right' : 'padding-left')}: 0px;
      margin-top: 18px;
    },
    
    .welcome-text{
      font-size: 15px;
      margin-bottom: 40px;
      display: inline-block;
      color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
    }
    p{
      color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
      font-size: 15px;
      line-height: 1.667;
    }
    h1{
      font-size: 15px;
      color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
      font-weight: normal;
      line-height: 30px;
    }
  }
  .message-attachments{
    margin: 10px -5px 10px -5px;
    ${({ theme }) => (theme.rtl ? 'padding-right' : 'padding-left')}: 20px;
    display: flex;
    flex-wrap: wrap;
    @media only screen and (max-width: 767px){
      margin: 30px 0 0;
      ${({ theme }) => (theme.rtl ? 'padding-right' : 'padding-left')}: 0px;
      justify-content: center;
    }
    figure{
      position: relative;
      border: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-default']};
      border-radius: 10px;
      padding: 10px;
      margin: 0 5px 30px;
      &:hover{
        box-shadow: 0 10px 20px ${({ theme }) => theme['gray-solid']}10;
        .attachment-image{
          &:after{
            height: 100%;
            opacity: 1;
            visibility: visible;
          }
        }
        .attachment-hover{
          opacity: 1;
          visibility: visible
        }
      }
      .attachment-image{
        position: relative;
        &:after{
          position: absolute;
          ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 0;
          top: 0;
          width: 100%;
          height: 0%;
          border-radius: 10px;
          content: '';
          opacity: 0;
          visibility: hidden;
          // background: ${({ theme }) => theme['dark-color']}60;
          background: rgb(182 182 182);
          // transition: .1s;
        }
      }
      .attachment-hover{
        position: absolute;
        top: 20px;
        ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 50%;
        transform: translateX(-50%);
        opacity: 0;
        visibility: hidden;
        // transition: .1s;
        .btn-link{
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          &:after{
            position: absolute;
            ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            // background: #fff;
            // opacity: .20;
            // background: #80868b;
            content: '';
          }
          svg,
          img{
            min-width: 14.5px;
            width: 50px;
            color: #fff;
            z-index: 1000;
          }
        }
        .btn-link + .btn-link{
          ${({ theme }) => (theme.rtl ? 'margin-right' : 'margin-left')}: 10px;
        }
      }
      figcaption{
        margin-top: 10px;
        h1{
          font-size: 13px;
          margin: 0;
          color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
        }
        p{
          font-size: 12px;
          color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
          margin:0;
        }
      }
    }

    .invoice-ticket-file-item {
    align-items: flex-start;
    justify-content: space-between;
    &:not(:last-child) {
      margin-bottom: 22px;
    }
    span {
      color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
    }
    .invoice-ticket-file-item__logo {
      ${({ theme }) => (!theme.rtl ? 'margin-right' : 'margin-left')}: 10px;
    }
    .invoice-file-item__content {
      .invoice-ticket-file-name {
        font-size: 15px;
        font-weight: 500;
        color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
      }
      .invoice-ticket-file-size {
        display: block;
        font-size: 15px;
        font-weight: 400;
        color: ${({ theme }) => theme[theme.mainContent]['gray-light-text']};
      }
    }
  }
  }
  hr{
    margin-bottom: 30px;
    border: 0 none;
    height: 1px;
    background: ${({ theme }) => theme[theme.mainContent]['border-color-default']};
  }
`;

const MailRightAction = Styled.div`
  span{
    color: ${({ theme }) => theme['light-color']};
  }
`;

const EmailWrapper = Styled.div`
  position: relative;
  .trigger-close.ant-btn-link{
    margin: 0 !important;
    position: absolute;
    ${({ theme }) => (!theme.rtl ? 'right' : 'left')}: 20px;
    top: 20px;
    z-index: 99;
    padding: 0;
    background: transparent !important;
  }
  .ant-btn-link{
    background: #fff !important;
    margin-bottom: 25px;
    border-radius: 6px;
    color: ${({ theme }) => theme['primary-color']} !important;
    &:focus{
      color: ${({ theme }) => theme['primary-color']} !important;
    }
  }
  .mail-sidebar{
    height: 100%;
    &.hide{
      transform: translateX(${({ theme }) => (theme.rtl ? '100%' : '-100%')});
      transition: .35s ease-in;
    }
    &.show{
      transform: translateX(0%);
      transition: .35s ease-in;
    }
    @media only screen and (max-width: 991px){
      display: block;
      background: #fff;
      position: fixed;
      ${({ theme }) => (theme.rtl ? 'right' : 'left')}: 0;
      top: 72px;
      width: 500px;
      height: 100%;
      z-index: 99;
    }
    .ant-card{
      height: auto;
      .ant-card-body{
        padding: 0px !important;
        height: 100%;
      }
    }
  }

  .mail-sidebar-top{
    padding: 30px 30px 0;
    @media only screen and (max-width: 991px){
      padding: 60px 30px 0;
    }
  }

  .mail-sidebar-bottom{
    padding: 25px 15px 0 15px;
    height: var(--mail-inbox);
    overflow: scroll;
    display: flex;
    flex-direction: column;
  }

  .mail-sidebar-bottom-scroll {
    height: calc(100vh - 72px);
    overflow: auto;
  }

  table{
    .ant-table-tbody{
      .ant-table-cell{
        vertical-align: top;
      }
    }
    tr td.ant-table-selection-column{
      padding: 15px 16px;
    }
  }
`;

const MailSideBar = Styled.div`
  display: ${({ collapsed }) => (!collapsed ? 'none' : 'block')}
`;

export {
  EmailAuthor,
  EmailHeader,
  EmailNav,
  EmailWrapper,
  MailBox,
  MailDetailsWrapper,
  MailRightAction,
  MailSideBar,
  MessageAction,
  MessageDetails,
  Style,
};
