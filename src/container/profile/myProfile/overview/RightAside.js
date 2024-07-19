import UilCheck from '@iconscout/react-unicons/icons/uil-check';
import UilPlay from '@iconscout/react-unicons/icons/uil-play';
import { Col, Row } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '../../../../components/buttons/buttons';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import { profileFriendsChangeStatus } from '../../../../redux/profile/actionCreator';
import { RightAsideWrapper } from './Style';
import './video-modal.css';

function RightAside() {
  const dispatch = useDispatch();
  const { friends, gallery } = useSelector((state) => {
    return {
      friends: state.Profile.friends,
      gallery: state.gallery.data,
    };
  });

  const [isOpen, setOpen] = useState(false);

  return (
    <RightAsideWrapper>
      <Cards title="Friends">
        <ul className="ff-widget">
          {friends.map(({ name, key, designation, status, img }) => {
            return (
              <li key={key}>
                <div className="ff-info">
                  <img src={require(`../../../../${img}`)} alt="" />
                  <p>
                    {name} <span>{designation}</span>
                  </p>
                </div>
                <Button
                  className="btn-ff"
                  onClick={() => dispatch(profileFriendsChangeStatus(key))}
                  outlined={!status}
                  type={status ? 'primary' : 'white'}
                >
                  {!status ? (
                    'Follow'
                  ) : (
                    <>
                      <UilCheck />
                      Following
                    </>
                  )}
                </Button>
              </li>
            );
          })}

          <Link to="#" className="btn-loadMore">
            Load more friends
          </Link>
        </ul>
      </Cards>
      <Cards
        isButton={
          <Link className="btn-seeAll" to="/pages/gallery">
            See All
          </Link>
        }
        title="Photos"
      >
        <div className="widget-photo-list">
          <Row gutter={10}>
            {gallery.map(({ img, id }) => {
              return (
                id <= 6 && (
                  <Col key={id} xxl={8} lg={12} md={8} sm={8} xs={8}>
                    <img style={{ width: '100%' }} src={require(`../../../../${img}`)} alt="" />
                  </Col>
                )
              );
            })}
          </Row>
        </div>
      </Cards>
      <Cards
        isButton={
          <Link className="btn-seeAll" to="#">
            See All
          </Link>
        }
        title="Videos"
      >
        <div className="widget-video-list">
          <Row gutter={10}>
            {gallery.map(({ img, id }) => {
              return (
                id <= 6 && (
                  <Col key={id} xxl={8} lg={12} md={8} sm={6} xs={8}>
                    <Link onClick={() => setOpen(true)} className="video" to="#">
                      <img style={{ width: '100%' }} src={require(`../../../../${img}`)} alt="" />
                      <span>
                        <UilPlay />
                      </span>
                    </Link>
                  </Col>
                )
              );
            })}
          </Row>
        </div>
      </Cards>
    </RightAsideWrapper>
  );
}

export default RightAside;
