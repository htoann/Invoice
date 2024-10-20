import Styled from 'styled-components';

const AuthenticationWrap = Styled.div`
  position: relative;
  padding: 130px 0;
  background-position: top;
  background-repeat: no-repeat;
  background-size: 100%;
  @media only screen and (max-width: 1399px){
    padding: 130px 0;
  }
  .invoice-authentication-wrap{
    @media only screen and (max-width: 767px){
      padding: 0 15px;
    }
  }
  .invoice-authentication-brand{
    text-align: center;
  }
`;

const AuthFormWrap = Styled.div`
  border-radius: 6px;
  margin-top: 25px;
  box-shadow: 0 5px 20px rgba(140,144,164,.08);
  background-color: ${({ theme }) => theme[theme.mainContent]['white-background']};
  .invoice-authentication-top{
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-secondary']};
    .invoice-authentication-top__title{
      font-size: 20px;
      font-weight: 600;
      line-height: 1;
      margin-bottom: 0;
      margin: 10px;
      color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
    }
  }
  .invoice-authentication-content{
    // padding: 30px 40px 0 30px; // change after has register
    padding: 30px 40px;
    @media only screen and (max-width: 1599px){
      padding: 30px 30px 0 30px;
    }
    .ant-form-item-label {
      > label{
        font-size: 14px;
        color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
      }
    }
    .ant-form-item{
      margin-bottom: 25px;
    }
    .ant-input:focus,
    .ant-input-focused{
      box-shadow: 0 5px 20px rgba(251,53,134,.10);
    }
    .ant-input{
      &::placeholder{
        color: ${({ theme }) => theme[theme.mainContent]['extra-light-text']};
      }
    }
    .ant-form-item-explain-error{
      font-size: 13px;
      margin-top: 2px;
    }
    .invoice-auth-extra-links{
      display: flex;
      justify-content: space-between;
      margin-top: -5px;
      .ant-checkbox-wrapper{
        span{
          font-size: 13px;
          color: ${({ theme }) => theme[theme.mainContent]['light-text']};
        }
        .ant-checkbox{
          &+span{
            position: relative;
            top: -2px;
          }
        }
      }
      .forgot-pass-link{
        font-size: 13px;
        color: ${({ theme }) => theme['primary-color']};
      }
    }
    .btn-signIn,
    .btn-reset,
    .btn-create{
      font-size: 14px;
      font-weight: 500;
      border-radius: 6px;
      width: 100%;
      min-height: 48px;
      margin-top: 25px;
    }
    .btn-reset{
      margin-top: 0;
    }
    .invoice-form-divider{
      font-size: 13px;
      color: ${({ theme }) => theme[theme.mainContent]['border-color-default']};
      text-align: center;
      position: relative;
      margin: 0 -10px 25px -10px;
      &:before{
        content: '';
        position: absolute;
        width: 100%;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
        height: 1px;
        background: ${({ theme }) => theme[theme.mainContent]['border-color-secondary']};
      }
      span{
        font-weight: 500;
        padding: 0 15px;
        display: inline-block;
        position: relative;
        z-index: 2;
        background: ${({ theme }) => theme[theme.mainContent]['white-background']};
        color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
      }
    }
    .ant-input-affix-wrapper {
      &.ant-input-password{
        input{
          color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
        }
      }
    }
    .invoice-social-login{
      display: flex;
      align-items: center;
      justify-content: center;
      margin: -6px;
      @media only screen and (max-width: 767px){
        justify-content: center;
      }
      &.signin-social{
        li{
          a{
            background-color: #fff;
          }
        }
      }
      li{
        padding:15px 6px;
        a{
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          height: 48px;
          padding: 0 15px;
          background: ${({ theme }) => theme[theme.mainContent]['general-background']};
          color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
          font-weight: 500;
          transition: background-color 0.3s;
          @media only screen and (max-width: 1399px){
            padding: 0 12px;
          }
          @media only screen and (max-width: 379px){
            height: 44px;
          }
          span:not(.anticon){
            display: inline-block;
            margin-left: 5px;
          }
          svg,
          i{
            width: 20px;
            height: 20px;
          }
          &.google-social{
            background-color: #F0654810;
            color: #F06548;
            &:hover{
              background-color: #F06548;
              svg path{
                fill: #FFFFFF;
              }
            }
            svg path{
              fill: #F06548;
            }
            div{
              height: 20px;
            }
          }
          &.facebook-social{
            background-color: #3A589B10;
            color: #3A589B;
            &:hover{
              background-color: #3A589B;
              color: #FFFFFF;
            }
          }
          &.twitter-social{
            background-color: #03A9F410;
            color: #03A9F4;
            &:hover{
              background-color: #03A9F4;
              color: #FFFFFF;
            }
          }
          &.github-social{
            background-color: #03A9F410;
            color: #090E30;
            &:hover{
              background-color: #03A9F4;
              color: #FFFFFF;
            }
          }
        }
      }
    }
    .ant-input-affix-wrapper{
      padding: 12px 20px;
    }
  }
  .invoice-authentication-bottom{
    text-align: center;
    padding: 25px;
    border-radius: 0 0 6px 6px;
    p{
      font-size: 14px;
      font-weight: 500;
      color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
      margin-bottom: 0;
      a{
        margin-left: 6px;
        ${({ theme }) => theme['primary-color']};
      }
    }
  }
  .auth-contents{
    display: flex;
    align-items: center;
    justify-content: center;
    form{
      width: 420px;
      h1{
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 45px;
        @media only screen and (max-width: 767px){
          margin-bottom: 28px;
        }
        input::placeholder{
          color: ${({ theme }) => theme['extra-light-color']};
        }
      }
      .auth-form-action{
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        @media only screen and (max-width: 379px){
          flex-flow: column;
          .forgot-pass-link{
            margin-top: 15px;
          }
        }
      }
    }
    #forgotPass{
      .forgot-text{
        margin-bottom: 25px;
      }
      .return-text{
        margin-top: 35px;
      }
    }


  }
  .auth0-login{
    margin: -6px;
    display: flex;
    flex-wrap: wrap;
  a{
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      height: 48px;
      padding: 0 26px;
      background: ${({ theme }) => theme['bg-color-light']};
      color: ${({ theme }) => theme['text-color']};
      font-weight: 500;
      border: 0 none;
      border-radius: 5px;
      margin: 6px;
      flex: 1;
      @media (max-width:480px){
        flex: none;
        width: 100%;
      }
  }
}
`;

export { AuthFormWrap, AuthenticationWrap };
