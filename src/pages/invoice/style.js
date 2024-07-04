import Styled from 'styled-components';

export const BorderLessHeading = Styled.div`
    .ant-card{
        .ant-card-head{
            border: 0 none;
            min-height: 0;
        }
        .ant-card-body{
            padding-top: 0 !important;
        }
    }
`;
