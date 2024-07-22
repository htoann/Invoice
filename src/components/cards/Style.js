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

const OverviewCardMeshWrap = Styled.div`
    &.invoice-overview-card-single{
        position: relative;
        margin-bottom: 25px;
        &:not(:last-child){
            &:after{
                position: absolute;
                width: 1px;
                height: 70px;
                right: -60px;
                top: 50%;
                transform: translateY(-50%);
                content: '';
                z-index: 10;
                background-color: ${({ theme }) => theme[theme.mainContent]['light-border']};
                @media only screen and (max-width: 1799px){
                    right: -30px;
                }
                @media only screen and (max-width: 1599px){
                    right: 0px;
                }
                @media only screen and (max-width: 1199px){
                    display: none;
                }
            }
        }
        &.invoice-icon-circle{
            .invoice-overview-card__left{
                .invoice-overview-card__left--icon{
                    border-radius: 50%;
                    &.invoice-primary{
                        background-color: ${({ theme }) => theme['primary-color']};
                        svg path,
                        i{
                            fill: ${({ theme }) => theme[theme.mainContent]['white-text']};
                            color: ${({ theme }) => theme[theme.mainContent]['white-text']};
                        }
                    }
                    &.invoice-secondary{
                        background-color: ${({ theme }) => theme['secondary-color']};
                        svg path,
                        i{
                            fill: ${({ theme }) => theme[theme.mainContent]['white-text']};
                            color: ${({ theme }) => theme[theme.mainContent]['white-text']};
                        }
                    }
                    &.invoice-info{
                        background-color: ${({ theme }) => theme['info-color']};
                        svg path,
                        i{
                            fill: ${({ theme }) => theme[theme.mainContent]['white-text']};
                            color: ${({ theme }) => theme[theme.mainContent]['white-text']};
                        }
                    }
                    &.invoice-success{
                        background-color: ${({ theme }) => theme['success-color']};
                        svg path,
                        i{
                            fill: ${({ theme }) => theme[theme.mainContent]['white-text']};
                            color: ${({ theme }) => theme[theme.mainContent]['white-text']};
                        }
                    }
                    &.invoice-warning{
                        background-color: ${({ theme }) => theme['warning-color']};
                        svg path,
                        i{
                            fill: ${({ theme }) => theme[theme.mainContent]['white-text']};
                            color: ${({ theme }) => theme[theme.mainContent]['white-text']};
                        }
                    }
                }
            }
            
        }
        .ant-card{
            border-radius: 0px;
            box-shadow: 0 0;
            background-color: ${({ theme }) => theme[theme.mainContent]['white-background']};
            .ant-card-body{
                @media only screen and (max-width: 1599px){
                    padding: 20px !important;
                }
                @media only screen and (max-width: 1399px){
                    padding: 12px !important;
                }
                @media only screen and (max-width: 991px){
                    padding: 15px !important;
                }
            }
        }
        &:first-child{
            .ant-card{
                border-radius: 10px 0 0 10px;
            }
        }
        &:last-child{
            .ant-card{
                border-radius: 0 10px 10px 0;
            }
        }
        &:not(:last-child){
            .invoice-overview-card{
                position: relative;
                &:after{
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 1px;
                    height: 100%;
                    content: '';
                    background-color: ${({ theme }) => theme[theme.mainContent].borderLight};
                }
            }
        }
    }

    .invoice-overview-card{
        display: flex;
        .invoice-overview-card__left{
            .invoice-overview-card__left--icon{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 70px;
                height: 70px;
                border-radius: 14px;
                ${({ theme }) => (!theme.rtl ? 'margin-right' : 'margin-left')}: 25px;
                @media only screen and (max-width: 1640px){
                    width: 50px;
                    height: 50px;
                    border-radius: 8px;
                    ${({ theme }) => (!theme.rtl ? 'margin-right' : 'margin-left')}: 15px;
                }
                @media only screen and (max-width: 1399px){
                    width: 40px;
                    height: 40px;
                    ${({ theme }) => (!theme.rtl ? 'margin-right' : 'margin-left')}: 10px;
                }
                @media only screen and (max-width: 991px){
                    width: 50px;
                    height: 50px;
                }
                >div{
                    line-height: 1;
                }
                svg{
                    @media only screen and (max-width: 1599px){
                        width: 20px;
                        height: 20px;
                    }
                }
                &.invoice-primary{
                    background-color: ${({ theme }) => theme['primary-color']}15;
                    svg path,
                    i{
                        fill: ${({ theme }) => theme['primary-color']};
                        color: ${({ theme }) => theme['primary-color']};
                    }
                }
                &.invoice-secondary{
                    background-color: ${({ theme }) => theme['secondary-color']}15;
                    svg path,
                    i{
                        fill: ${({ theme }) => theme['secondary-color']};
                        color: ${({ theme }) => theme['secondary-color']};
                    }
                }
                &.invoice-success{
                    background-color: ${({ theme }) => theme['success-color']}15;
                    svg path,
                    i{
                        fill: ${({ theme }) => theme['success-color']};
                        color: ${({ theme }) => theme['success-color']};
                    }
                }
                &.invoice-warning{
                    background-color: ${({ theme }) => theme['warning-color']}15;
                    svg path,
                    i{
                        fill: ${({ theme }) => theme['warning-color']};
                        color: ${({ theme }) => theme['warning-color']};
                    }
                }
                &.invoice-info{
                    background-color: ${({ theme }) => theme['info-color']}15;
                    svg path,
                    i{
                        fill: ${({ theme }) => theme['info-color']};
                        color: ${({ theme }) => theme['info-color']};
                    }
                }
                &.invoice-danger{
                    background-color: ${({ theme }) => theme['danger-color']}15;
                    svg path,
                    i{
                        fill: ${({ theme }) => theme['danger-color']};
                        color: ${({ theme }) => theme['danger-color']};
                    }
                }
            }
        }
        .invoice-overview-card__right{
            display: flex;
            .invoice-overview-card__right--content{
                ${({ theme }) => (!theme.rtl ? 'margin-right' : 'margin-left')}: 25px;
                @media only screen and (max-width: 1399px){
                    ${({ theme }) => (!theme.rtl ? 'margin-right' : 'margin-left')}: 15px;
                }
                .invoice-overview-total{
                    font-size: 30px;
                    line-height: 1.2;
                    font-weight: 600;
                    margin-bottom: 0;
                    color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
                    @media only screen and (max-width: 1599px){
                        font-size: 24px;
                    }
                    @media only screen and (max-width: 1399px){
                        font-size: 18px;
                    }
                    @media only screen and (max-width: 991px){
                        font-size: 20px;
                    }
                }
                .invoice-overview-label{
                    font-size: 16px;
                    color: ${({ theme }) => theme[theme.mainContent]['gray-text']}
                }
            }
            .invoice-overview-status{
                margin-top: 6px;
                &.invoice-status-growth{
                    .invoice-status-rate{
                        color: ${({ theme }) => theme['success-color']};
                    }
                }
                &.invoice-status-down{
                    .invoice-status-rate{
                        color: ${({ theme }) => theme['danger-color']};
                    }
                }
                .invoice-status-rate{
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    font-weight: 500;
                    svg{
                        width: 20px;
                        height: 18px;
                    }
                }
            }
        }
    }
`;

const InfoCardStyle = Styled.article`
    ${({ theme, type }) => `
        background-color: ${theme[theme.mainContent]['white-background']};
        padding: 14px 15px;
        text-align: center;
        border-radius: 10px;
        margin-bottom: 25px;
        box-shadow: 0px 5px 20px ${theme['extra-light-color']}05;

        .invoice-infocard-icon {
            width: 58px;
            height: 58px;
            background-color: ${theme[`${type}-color`]}20;
            color: ${theme[`${type}-color`]};
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            margin: 2px auto 10px;
            border-radius: 14px;
            svg{
                width: 34px;
                height: 32px;
            }

        }

        .invoice-infocard-text {
            font-size: 16px;
            margin-bottom: 0;
            color: ${theme[theme.mainContent]['gray-text']};
        }
        .invoice-infocard-label {
            font-size: 30px;
            font-weight: 500;
            margin-bottom: 4px;
            color: ${theme[theme.mainContent]['dark-text']};
        }
    `}
`;

const NewsletterStyle = Styled.figure`
    &.invoice-newsletter-theme-2{
        min-height: 135px;
        padding: 15px 0 15px 25px;
        justify-content: flex-start;
        figcaption{
            ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 15px;
        }
    }
    ${({ theme }) => `
        background-color: ${theme[theme.mainContent]['white-background']};
        padding: 25px 0 25px 25px;
        text-align: left;
        border-radius: 10px;
        box-shadow: 0px 5px 20px rgba(173,181,273,.05);
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 25px;
        min-height: 160px;
        @media only screen and (max-width: 575px){
            padding: 15px;
            flex-direction: column;
        }

        figcaption {
            margin-right: 15px;
            @media only screen and (max-width: 1699px){
                margin-right: 10px; 
            }
            @media only screen and (max-width: 575px){
                margin-top: 15px;
                ${!theme[theme.rtl] ? 'margin-right' : 'margin-left'}: 0;
                text-align: center;
            }
            h2,
            h4 {
                font-size: 24px;
                font-weight: 600;
                line-height: 1;
                margin: 0 0 10px;
                color: ${theme[theme.mainContent]['dark-text']};
                @media only screen and (max-width: 575px){
                    font-size: 20px;
                }
            }
            h4{
                font-size: 20px;
            }
            p {
                font-size: 15px;
                margin-bottom: 0;
                color: ${theme[theme.mainContent]['gray-text']}
            }
            button{
                margin-top: 14px;
            }
        }
        img{
            margin-bottom: -16px;
            margin-top: -24px;
            max-width: 150px;
            @media only screen and (max-width: 1699px){
                max-width: 100px;
            }
            @media only screen and (max-width: 575px){
                margin-bottom: 0;
                margin-top: 15px;
            }
        }
    `}
`;

const CourseCardWrap = Styled.div`
    &.invoice-course-card-single{
        margin-bottom: 25px;
        .ant-card{
            background-color: ${({ theme }) => theme[theme.mainContent]['white-background']};
        }
        .ant-card-body{
            padding: 18px !important;
        }
        .invoice-course-card-thumbnail{
            border-radius: 10px;
            margin-bottom: 15px;
            img{
                max-width: 332px;
                @media only screen and (max-width: 1599px){
                    max-width: 100%;
                    width: 100%;
                }
            }
        }
        .invoice-course-card-title{
            font-size: 20px;
            margin-bottom: 12px;
            font-weight: 600;
            @media only screen and (max-width: 1399px){
                font-size: 18px;
            }
            a{
                color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
                &:hover{
                    color: ${({ theme }) => theme['primary-color']};
                }
            }
        }
        .invoice-course-card-author{
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            img{
                max-width: 30px;
                ${({ theme }) => (!theme.rtl ? 'margin-right' : 'margin-left')}: 10px;
            }
            .invoice-course-card-author__name{
                font-size: 15px;
                color: ${({ theme }) => theme[theme.mainContent]['gray-light-text']};
            }
        }
        .invoice-course-card-meta{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .invoice-course-card-meta__pricing{
                font-size: 20px;
                font-weight: 600;
                color: ${({ theme }) => theme['success-color']};
                @media only screen and (max-width: 1399px){
                    font-size: 18px;
                }
            }
        }
        .invoice-course-card-meta__right{
            display: flex;
            align-items: center;
            margin: -5px;
            li{
                display: inline-flex;
                align-items: center;
                min-height: 32px;
                border-radius: 20px;
                padding: 0 15px;
                margin: 5px;
                @media only screen and (max-width: 1399px){
                    padding: 0 10px;
                }
                &.bg-secondary{
                    color: ${({ theme }) => theme['secondary-color']};
                    background-color: ${({ theme }) =>
                      theme.mainContent === 'lightMode' ? 'rgba(88,64,255,.15)' : '#fff'};
                }
                &.bg-primary{
                    color: ${({ theme }) => theme['primary-color']};
                    background-color: ${({ theme }) =>
                      theme.mainContent === 'lightMode' ? 'rgba(251,53,134,.15)' : '#fff'};
                }
                span{
                    font-size: 13px;
                    line-height: 1;
                    font-weight: 500;
                    @media only screen and (max-width: 1399px){
                        font-size: 12px;
                    }
                }
                svg{
                    width: 14px;
                    ${({ theme }) => (!theme.rtl ? 'margin-right' : 'margin-left')}: 3px;
                }
            }
        }
    }
`;

const ProfileCardWrapper = Styled.figure`
  ${({ theme }) => `
    width: 100%;
    min-height: 360px;
    background-color: ${theme[theme.mainContent]['white-background']};        
    text-align: center;
    border-radius: 10px;
    box-shadow: 0px 5px 20px ${theme['extra-light-color']}05;
    position: relative;
    @media only screen and (max-width: 991px){
        min-height: auto;
        margin-bottom: 25px;
    }

    figcaption {
        .invoice-profile-top-img {
            position: static;
            width: 100%;
        }
    }

    .invoice-profile-content{
        padding: 0 0 45px;
        margin-top: -75px;
        .invoice-profile-content__img{
            margin-bottom: 10px;
            img{
                padding: 5px;
                border-radius: 50%;
                max-width: 110px;
                background-color: ${theme[theme.mainContent]['white-background']};
            }
        }
        .invoice-profile-name{
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 2px;
            color: ${theme[theme.mainContent]['dark-text']};
        }
        .invoice-profile-text{
            margin-bottom: 18px;
            color: ${theme[theme.mainContent]['gray-light-text']};
        }
    }
    .invoice-profile-socials{
        display: flex;
        align-items: center;
        justify-content: center !important;
        margin: -5px;
        li{
            
            margin: 5px;
            span.fa{
                color: #fff;
                fill: #fff;
            }
            &.invoice-facebook{
                a{
                    background-color: ${theme['primary-color']};
                }
                
            }
            &.invoice-twitter{
                a{
                    background-color: ${theme['secondary-color']};
                }
            }
            &.invoice-dribble{
                a{
                    background-color: ${theme['info-color']};
                }
            }
            a{
                display: flex;
                align-items: center;
                justify-content: center;
                width: 32px;
                height: 32px;
                border-radius: 6px;
                line-height: 1;
            }
        }
    }
    
  `}
`;

const BlogCardStyleWrap = Styled.figure`
    .invoice-blog{
        padding: 25px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(173,181,217,.05);
        margin-bottom: 25px;
        background-color: ${({ theme }) => theme[theme.mainContent]['white-background']};
        &:hover{
            .invoice-blog-thumb{
                &:after{
                    height: 100%;
                }
            }
        }
        .invoice-blog-thumb{
            position: relative;
            &:after{
                position:  absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 0%;
                content: '';
                border-radius: 10px;
                transition: .35s;
                background-color: ${({ theme }) => theme['dark-color']}15;
            }
        }
        &.invoice-blog-style-3,
        &.invoice-blog-style-2{
            padding: 0px;
            .invoice-blog__title{
                margin: 15px 0 12px;
            }
            figcaption{
                padding: 0 25px 25px;
            }
            .invoice-blog-thumb{
                &:after{
                    border-radius: 10px 10px 0 0;
                }
            }
            .invoice-blog__image{
                border-radius: 10px 10px 0 0;
            }
        }
        .invoice-blog__image{
            width: 100%;
            border-radius: 10px;
        }
        .invoice-blog-meta{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
            &.invoice-blog-meta-theme-3{
                justify-content: flex-start;
                margin: 7px -3px -3px;
                .invoice-blog-meta__single{
                    position: relative;
                    margin: 3px;
                    &:before{
                        position: absolute;
                        left: 0;
                        top: calc(50% - 4px);
                        width: 4px;
                        height: 4px;
                        border-radius: 50%;
                        background-color: ${({ theme }) => theme[theme.mainContent]['light-text']};
                    }
                    &:not(:first-child){
                        padding-left: 10px;
                        &:before{
                            content: '';
                        }
                    }
                }
            }
        }
        .invoice-blog-meta__single{
            display: inline-block;
            font-size: 15px;
            color: ${({ theme }) => theme[theme.mainContent]['light-text']};
        }
        .invoice-blog__title{
            font-size: 20px;
            font-weight: 600;
            margin: 10px 0 5px;
            a{
                color: ${({ theme }) => theme[theme.mainContent]['dark-text']};
                &:hover{
                    color: ${({ theme }) => theme['primary-color']};
                }
            }
        }
        .invoice-blog__text{
            font-size: 16px;
            margin-bottom: 15px;
            color: ${({ theme }) => theme[theme.mainContent]['gray-text']};
        }
        .invoice-blog__bottom{
            display: flex;
            justify-content: space-between;
        }
        .invoice-blog__author{
            .invoice-blog__author-img{
                max-width: 32px;
                border-radius: 50%;
            }
            .invoice-blog__author-name{
                font-size: 15px;
                ${({ theme }) => (!theme.rtl ? 'margin-left' : 'margin-right')}: 10px;
                color: ${({ theme }) => theme[theme.mainContent]['gray-light-text']};
            }
        }
        .invoice-blog__meta{
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            margin: -9px;
            .invoice-blog__meta--item{
                margin: 9px;
                span{
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    line-height: 1;
                    color: ${({ theme }) => theme[theme.mainContent]['gray-light-text']};
                    svg{
                        width: 12px;
                        height: 12px;
                        ${({ theme }) => (!theme.rtl ? 'margin-right' : 'margin-left')}: 4px;
                        color: ${({ theme }) => theme[theme.mainContent]['gray-light-text']};
                    }
                }
            }
        }
    }
`;

export {
  OverviewCardWrap,
  OverviewCardMeshWrap,
  InfoCardStyle,
  NewsletterStyle,
  CourseCardWrap,
  BlogCardStyleWrap,
  ProfileCardWrapper,
};
