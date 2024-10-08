import propTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import { ProfileCardWrapper } from './Style';

const ProfileCard = ({
  image = 'static/img/users/1.png',
  bgImage = 'static/img/banner/BG.png',
  title = 'Robert Clinton',
  tag = 'Best Seller of the last month',
}) => {
  return (
    <ProfileCardWrapper>
      <figcaption>
        <img className="invoice-profile-top-img" src={require(`@/${bgImage}`)} alt="banner" />
        <div className="invoice-profile-content">
          <div className="invoice-profile-content__img">
            <img className="profile" src={require(`@/${image}`)} alt="profile" />
          </div>
          <h4 className="invoice-profile-name">{title}</h4>
          <p className="invoice-profile-text">{tag}</p>
          <ul className="invoice-profile-socials">
            <li className="invoice-facebook">
              <Link to="#">
                <FontAwesome name="facebook" />
              </Link>
            </li>
            <li className="invoice-twitter">
              <Link to="#">
                <FontAwesome name="twitter" />
              </Link>
            </li>
          </ul>
        </div>
      </figcaption>
    </ProfileCardWrapper>
  );
};

ProfileCard.propTypes = {
  image: propTypes.string,
  bgImage: propTypes.string,
  title: propTypes.string,
  tag: propTypes.string,
};

export default ProfileCard;
