import SettingIcon from '@/static/img/icon/setting.svg';
import { Radio } from 'antd';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../button';
import { DrawerStyle } from './style';

const RadioGroup = Radio.Group;

const Drawer = ({
  width = 320,
  title,
  placement = 'right',
  children,
  customPlacement,
  render,
  childDrawer,
  childTitle,
  btnText = 'Open',
  btnType = 'primary',
  isBtn = true,
  closable = true,
  ...btnProps
}) => {
  const [state, setState] = useState({
    open: false,
    placement,
    childrenDrawer: false,
  });

  const showDrawer = () => {
    setState({
      ...state,
      open: true,
    });
  };

  const onClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  const onChange = (e) => {
    setState({
      ...state,
      placement: e.target.value,
    });
  };

  const showChildrenDrawer = () => {
    setState({
      ...state,
      childrenDrawer: true,
    });
  };

  const onChildrenDrawerClose = () => {
    setState({
      ...state,
      childrenDrawer: false,
    });
  };

  return (
    <>
      {customPlacement && (
        <RadioGroup style={{ marginRight: 8 }} defaultValue={placement} onChange={onChange}>
          <Radio value="top">top</Radio>
          <Radio value="right">right</Radio>
          <Radio value="bottom">bottom</Radio>
          <Radio value="left">left</Radio>
        </RadioGroup>
      )}

      {render && <p>Render in this</p>}
      {isBtn ? (
        <Button type={btnType} size="default" onClick={showDrawer} {...btnProps}>
          {btnText}
        </Button>
      ) : (
        <Link className="invoice-nav-action-link">
          <img src={SettingIcon} alt="My Icon" onClick={showDrawer} {...btnProps} />
        </Link>
      )}
      <DrawerStyle
        title={title}
        placement={state.placement}
        closable={closable}
        onClose={onClose}
        open={state.open}
        getContainer={false}
        style={{ position: !render ? 'fixed' : 'absolute' }}
        width={width}
      >
        {!childDrawer ? (
          children
        ) : (
          <>
            <Button type="primary" onClick={showChildrenDrawer}>
              Two-level drawer
            </Button>

            <DrawerStyle
              title={childTitle}
              width={width}
              closable={false}
              onClose={onChildrenDrawerClose}
              open={state.childrenDrawer}
            >
              {childDrawer}
            </DrawerStyle>
            {children}

            <div
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e8e8e8',
                padding: '10px 16px',
                textAlign: 'right',
                left: 0,
                background: '#fff',
                borderRadius: '0 0 4px 4px',
              }}
            >
              <Button
                style={{
                  marginRight: 8,
                }}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button onClick={onClose} type="primary">
                Submit
              </Button>
            </div>
          </>
        )}
      </DrawerStyle>
    </>
  );
};

Drawer.propTypes = {
  title: PropTypes.string,
  placement: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.node, PropTypes.array]),
  customPlacement: PropTypes.bool,
  render: PropTypes.bool,
  childDrawer: PropTypes.object,
  childTitle: PropTypes.string,
  btnText: PropTypes.string,
  width: PropTypes.number,
};

export { Drawer };
