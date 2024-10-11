import Styled from 'styled-components';

const DataTableStyleWrap = Styled.div`
    .invoice-datatable-filter{
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 25px;
        margin-top: 25px;
        flex-direction: column;
        @media only screen and (max-width: 767px){
            flex-direction: column;
            align-items: flex-start;
        }
        .invoice-datatable-filter__left{
            display: inline-flex;
            width: 100%;
            align-items: center;
            @media only screen and (max-width: 767px){
                margin-bottom: 20px;
            }
            @media only screen and (max-width: 475px){
                flex-direction: column;
                align-items: flex-start;
            }
            .ant-form{
                display: inline-flex;
                width: 100%;
                align-items: center;
            }
            span.label{
                margin-right: 8px;
                color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
            }
            .invoice-datatable-filter__input{
                display: flex;
                flex-direction: column;
                padding-right: 20px;
                @media only screen and (max-width: 475px){
                    margin-bottom: 15px;
                    padding-right: 0;
                    width: 100%;
                }
                .ant-input{
                    height: 40px;
                }
                .ant-select{
                    @media only screen and (max-width: 475px){
                        width: 100% !important;
                    }
                },
                .label{
                    margin-bottom: 8px;
                    font-size: 14px;
                }
            }
        }
        .invoice-datatable-filter__right{
            min-width: 280px;
            @media only screen and (max-width: 475px){
                min-width: 100%;
            }
            .ant-input-affix-wrapper{
                padding: 7.22px 20px;
                border-radius: 6px;
                .ant-input-prefix{
                    svg{
                        width: 16px;
                        height: 16px;
                        color: ${({ theme }) => theme[theme.mainContent]['light-text']};
                    }
                }
            }
        }
    }
`;
export { DataTableStyleWrap };
