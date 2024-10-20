import Styled from 'styled-components';

const OverviewDataStyleWrap = Styled.div`
    
    &.card-mesh-wrap{
        justify-content: space-between;
        margin-bottom: 25px;
        border-radius: 10px;
        background-color: ${({ theme }) => theme[theme.mainContent]['white-background']};
        @media only screen and (max-width: 991px){
            flex-wrap: wrap;
        }
        .invoice-overview-card-single{
            flex: 0 0 auto;
            margin-bottom: 0;
            @media only screen and (max-width: 991px){
                flex: 0 0 50%;
            }
            @media only screen and (max-width: 575px){
                flex: 0 0 100%;
            }
        }

    }
`;

export { OverviewDataStyleWrap };
