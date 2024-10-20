import { Steps } from 'antd';
import Styled from 'styled-components';

const StepsStyle = Styled(Steps)`
    .anticon {
        &.anticon-check {
            &.ant-steps-finish-icon{
                svg{
                    color: ${({ theme }) => theme['primary-color']};
                }
            }
        }
        &.ant-steps-error-icon{
            svg{
                    color: ${({ theme }) => theme['danger-color']};
                }
        }
    }
    .steps-action{
        margin-top: 40px;
        button{
            height: 44px;
        }
    }
`;

const ActionWrapper = Styled.div`
    width: 100%;
    .step-action-wrap{
        display: flex;
        justify-content: center;
        .step-action-inner{
            width: 580px;
            padding: 0 25px;
            @media only screen and (max-width: 575px){
                width: 100%;
                padding: 0;
            }
        }
    }
    .steps-action{
        margin-top: 38px;
        width: 100%;
        float: right;
        display: flex;
        justify-content: space-between;
        @media only screen and (max-width: 991px){
            margin-top: 25px;
        }
        @media only screen and (max-width: 379px){
            flex-flow: column;
        }
        button{
            display: flex;
            align-items: center;
            height: 44px;
            padding: 0 20px;
            @media only screen and (max-width: 379px){
                justify-content: center;
            }
            &.ant-btn-light{
                color: ${({ theme }) => theme[theme.mainContent]['gray-light-text']};
                border: 1px solid ${({ theme }) => theme[theme.mainContent]['border-color-default']};
            }
            &.btn-next{
                svg{
                    margin-left: 10px;
                }
            }
            &.btn-prev{
                svg{
                    margin-right: 10px;
                }
            }
        }
        button + button {
            @media only screen and (max-width: 379px){
                margin-top: 15px;
            }
        }
    }
`;

export { ActionWrapper, StepsStyle };
