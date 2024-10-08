import { Tag } from 'antd';
import Styled from 'styled-components';

const TagStyle = Styled(Tag)`
    &.invoice-tag-new{
        .ant-tag{
            background-color: ${({ theme }) => theme[theme.mainContent]['white-background']};
        }
    }
`;

export { TagStyle };
