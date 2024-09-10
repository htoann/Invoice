import * as Unicons from '@tooni/iconscout-unicons-react';
import PropTypes from 'prop-types';
import { Child, TabBasic } from './style';

function Tab(props) {
  const { data, tabPosition, type, color, onChange, prop } = props;
  let counter = 0;

  return (
    <TabBasic
      className={`invoice-tab-${type}`}
      color={color && color}
      defaultActiveKey="1"
      tabPosition={tabPosition !== undefined ? tabPosition : 'top'}
      onChange={onChange}
      {...prop}
    >
      {data.map((item) => {
        const { title, content, icon, tabTitle, key, disabled } = item;
        const IconTag = Unicons[icon];
        counter += 1;
        return (
          <Child
            color={color && color}
            tab={
              icon === undefined ? (
                tabTitle
              ) : (
                <span>
                  <IconTag />
                  {tabTitle}
                </span>
              )
            }
            key={key || counter}
            disabled={disabled}
          >
            {title && <h2>{title}</h2>}
            {content && <p>{content}</p>}
          </Child>
        );
      })}
    </TabBasic>
  );
}

Tab.propTypes = {
  color: PropTypes.string,
  type: PropTypes.string,
  tabPosition: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
};

export { Tab };
