import Styled from 'styled-components';

const DataTableStyleWrap = Styled.div`
    .invoice-datatable-filter{
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin: 20px 0 25px 0;
        @media only screen and (max-width: 767px){
            flex-direction: column;
            align-items: flex-start;
        }
        .invoice-datatable-filter__left{
            display: inline-flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px 20px;

            // Responsive header
            display: grid;
            grid-template-columns: repeat(6, minmax(0, 1fr));
            width: 100%;

            @media (max-width: 1468px) {
                grid-template-columns: repeat(3, 1fr) !important;
            }
            // End responsive header

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
            .invoice-datatable-filter__action{
                margin-top: 20px;
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
