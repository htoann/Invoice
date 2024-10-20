import Styled from 'styled-components';

const OverviewCardWrap = Styled.div`
    margin-bottom: 25px;
    .ant-card {
        background-color: ${({ theme }) => theme[theme.mainContent]['white-background']};
        &.invoice-overview-halfCircle-card{
            overflow: hidden;
            .ant-card-body {
                padding: 24px 25px 12px !important;
                .invoice-overview-card {
                    .invoice-overview-card__bottom {
                        margin-top: 0;
                        .invoice-overview-status{
                            background-color: transparent;
                            padding: 0;
                        }
                    }
                    .invoice-overview-card__top--icon{
                        position: absolute;
                        top: -9px;
                        right: -38%;
                        width: 230px;
                        height: 168px;
                        border-radius: 100%;
                        padding: 0 30px;
                        justify-content: flex-start;
                        @media only screen and (max-width: 1699px){
                            right: -48%;
                        }
                        @media only screen and (max-width: 1599px){
                            right: -20%;
                            top: -12px;
                        }
                        @media only screen and (max-width: 1399px){
                            right: -24%;
                            top: -15px;
                        }
                        @media only screen and (max-width: 991px){
                            right: -35%;
                        }
                        @media only screen and (max-width: 767px){
                            right: -46%;
                            padding: 0 18px;
                        }
                        @media only screen and (max-width: 650px){
                            right: -56%;
                        }
                        @media only screen and (max-width: 575px){
                            right: -30%;
                        }
                        @media only screen and (max-width: 475px){
                            right: -44%;
                            top: -17px;
                        }
                        @media only screen and (max-width: 375px){
                            right: -48%;
                        }
                        svg{
                            width: 40px;
                            @media only screen and (max-width: 767px){
                                width: 30px;
                            }
                        }
                    }
                    .invoice-overview-card__top--content{
                        .invoice-overview-label{
                            display: block;
                            margin-bottom: 4px;
                            font-size: 15px;
                            font-weight: 500;
                        }
                    }
                }
            }
        }
    }
    .ant-card-body{
        padding: 25px !important;
        @media only screen and (max-width: 767px){
            padding: 20px !important;
        }
        @media only screen and (max-width: 575px){
            padding: 15px !important;
        }
        .invoice-overview-total {
            color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
        }
        .invoice-overview-card{
            .invoice-overview-card__top{
                .invoice-overview-card__top--icon{
                    width: 58px;
                    height: 58px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 14px;
                    @media only screen and (max-width: 767px){
                        width: 48px;
                        height: 48px;
                    }
                    div{
                        line-height: 1;
                    }
                    svg,
                    img{
                        width: 24px;
                        height: 24px;
                    }
                    &.invoice-primary{
                        background-color: ${({ theme }) => theme['primary-color']}15;
                        svg path,
                        i{
                            fill: ${({ theme }) => theme['primary-color']};
                        }
                    }
                    &.invoice-secondary{
                        background-color: ${({ theme }) => theme['secondary-color']}15;
                        svg path,
                        i{
                            fill: ${({ theme }) => theme['secondary-color']};
                        }
                    }
                    &.invoice-success{
                        background-color: ${({ theme }) => theme['success-color']}15;
                        svg path,
                        i{
                            fill: ${({ theme }) => theme['success-color']};
                        }
                    }
                    &.invoice-warning{
                        background-color: ${({ theme }) => theme['warning-color']}15;
                        svg path,
                        i{
                            fill: ${({ theme }) => theme['warning-color']};
                        }
                    }
                    &.invoice-info{
                        background-color: ${({ theme }) => theme['info-color']}15;
                        svg path,
                        i{
                            fill: ${({ theme }) => theme['info-color']};
                        }
                    }
                }
                .invoice-overview-card__top--content{
                    .invoice-overview-total{
                        font-size: 30px;
                        line-height: 1.45;
                        font-weight: 600;
                        margin-bottom: 0;
                        color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
                        @media only screen and (max-width: 1599px){
                            font-size: 24px;
                        }
                        @media only screen and (max-width: 1399px){
                            font-size: 20px;
                        }
                    }
                    .invoice-overview-label{
                        font-size: 15px;
                        font-weight: 400;
                        color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
                        @media only screen and (max-width: 767px){
                            font-size: 15px;
                        }
                    }
                }
                &.invoice-overview-card-theme-2{
                    .invoice-overview-card__top--icon{
                        order: 2;
                    }
                }
            }
            .invoice-overview-card__bottom{
                margin-top: 12px;
                .invoice-overview-status{
                    display: inline-flex;
                    align-items: center;
                    width: 100%;
                    padding: 0 10px;
                    min-height: 44px;
                    border-radius: 8px;
                    background-color: ${({ theme }) => theme[theme.mainContent]['status-background']};
                    span{
                        font-size: 14px;
                    }
                    .invoice-status-label{
                        ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 0px;
                        color: ${({ theme }) => theme[theme.mainContent]['gray-light-text']};
                    }
                    .invoice-status-rate{
                        display: flex;
                        align-items: center;
                        font-weight: 500;
                        svg,
                        img{
                            width: 20px;
                            ${({ theme }) => (!theme.rtl ? 'margin-right' : 'margin-left')}: -1px;
                        }
                    }
                    &.invoice-status-growth{
                        .invoice-status-rate{
                            color: ${({ theme }) => theme['success-color']};
                        }
                    }
                    &.invoice-status-down{
                        .invoice-status-rate{
                            color: ${({ theme }) => theme['danger-color']}
                        }
                    }
                }
            }
        }
    }
    &.invoice-overview-card-support{
        .ant-card-body{
            padding: 40.5px 25px !important;
        }
    }
`;

export { OverviewCardWrap };
