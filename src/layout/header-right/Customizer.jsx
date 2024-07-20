import { Drawer } from '@/components/drawer/drawer';
import { changeMenuMode } from '@/redux/themeLayout/actionCreator';
import Left from '@/static/img/layouts/side.png';
import Top from '@/static/img/layouts/top.png';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

const Customizer = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const changeNavbar = (topMode) => {
    const html = document.querySelector('html');
    if (topMode) {
      html.classList.add('invoice-topMenu');
    } else {
      html.classList.remove('invoice-topMenu');
    }
    dispatch(changeMenuMode(topMode));
  };

  return (
    <Drawer title={t('User_Settings')} isBtn={false} outlined size="extra-small" shape="circle" type="light">
      <div className="customizer__body">
        {/* <div className="customizer__single">
          <h4>Layout Type</h4>
          <ul className="customizer-list d-flex layout">
            <li className="customizer-list__item active">
              <a
                onClick={() => {
                  changeLayoutDirection(true);
                }}
              >
                <img src={LTR} alt="" />
                <i className="fa fa-check-circle"></i>
              </a>
            </li>
            <li className="customizer-list__item">
              <a
                onClick={() => {
                  changeLayoutDirection(false);
                }}
              >
                <img src={RTL} alt="" />
                <i className="fa fa-check-circle"></i>
              </a>
            </li>
          </ul>
        </div> */}
        {/* <div className="customizer__single">
          <h4>Website Mode</h4>
          <ul className="customizer-list d-flex l_sidebar">
            <li className="customizer-list__item active">
              <a
                onClick={() => {
                  darkModeDeactivated();
                  changeLayout('lightMode');
                }}
              >
                <img src={Light} alt="" />
              </a>
            </li>
            <li className="customizer-list__item">
              <a
                onClick={() => {
                  darkModeActivated();
                  changeLayout('darkMode');
                }}
              >
                <img src={Dark} alt="" />
              </a>
            </li>
          </ul>
        </div> */}
        <div className="customizer__single">
          <h4>{t('Menu_Direction')}</h4>
          <ul className="customizer-list d-flex l_navbar">
            <li className="customizer-list__item active">
              <a
                onClick={() => {
                  changeNavbar(false);
                }}
              >
                <img src={Left} alt="" />
              </a>
            </li>
            <li className="customizer-list__item">
              <a
                onClick={() => {
                  changeNavbar(true);
                }}
              >
                <img src={Top} alt="" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Drawer>
  );
};

export default Customizer;
