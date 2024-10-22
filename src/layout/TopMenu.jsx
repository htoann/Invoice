import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { menuItems } from './const';
import { TopMenuStyle } from './Style';
import { WithPermission } from './withPermission';

export const TopMenu = () => {
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const active = document.querySelector('.invoice-top-menu a.active');
    const activeDefault = () => {
      const megaMenu = active.closest('.megaMenu-wrapper');
      const hasSubMenuLeft = active.closest('.has-subMenu-left');
      if (!megaMenu) {
        active.closest('ul').previousSibling.classList.add('active');
        if (hasSubMenuLeft) hasSubMenuLeft.closest('ul').previousSibling.classList.add('active');
      } else {
        active.closest('.megaMenu-wrapper').previousSibling.classList.add('active');
      }
    };
    window.addEventListener('load', active && activeDefault);
    return () => window.removeEventListener('load', activeDefault);
  }, []);

  // const addParentActive = (event) => {
  //   document.querySelectorAll('.parent').forEach((element) => {
  //     element.classList.remove('active');
  //   });

  //   const hasSubMenuLeft = event.currentTarget.closest('.has-subMenu-left');
  //   const megaMenu = event.currentTarget.closest('.megaMenu-wrapper');
  //   if (!megaMenu) {
  //     event.currentTarget.closest('ul').previousSibling.classList.add('active');
  //     if (hasSubMenuLeft) hasSubMenuLeft.closest('ul').previousSibling.classList.add('active');
  //   } else {
  //     event.currentTarget.closest('.megaMenu-wrapper').previousSibling.classList.add('active');
  //   }
  // };

  return (
    <TopMenuStyle>
      <div className="invoice-top-menu">
        <ul>
          {menuItems.map((menu) => (
            <WithPermission permissions={menu.permission} key={menu.key}>
              <li className={menu.subMenu ? 'has-subMenu' : ''}>
                <Link to={menu.to || '#'} className="parent">
                  {t(menu.text)}
                </Link>

                {menu.subMenu && (
                  <ul className="subMenu">
                    {menu.subMenu.map((subMenu) => (
                      <WithPermission key={subMenu.key} permissions={subMenu.permission}>
                        <li>
                          <Link to={subMenu.to}>{t(subMenu.text)}</Link>
                        </li>
                      </WithPermission>
                    ))}
                  </ul>
                )}
              </li>
            </WithPermission>
          ))}
        </ul>
      </div>
    </TopMenuStyle>
  );
};
