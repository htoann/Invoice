import React, { useState } from 'react';
import UilThumbsUp from '@iconscout/react-unicons/icons/uil-thumbs-up';
import UilCommentAlt from '@iconscout/react-unicons/icons/uil-comment-alt';
import UilShareAlt from '@iconscout/react-unicons/icons/uil-share-alt';
import UilSmile from '@iconscout/react-unicons/icons/uil-smile';
import UilImage from '@iconscout/react-unicons/icons/uil-image';
import UilPaperclip from '@iconscout/react-unicons/icons/uil-paperclip';
import UilMessage from '@iconscout/react-unicons/icons/uil-message';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { Input, Upload, message, Comment, Avatar } from 'antd';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { LightBox } from 'react-lightbox-pack';
// eslint-disable-next-line import/no-unresolved
// import 'react-lightbox-pack/dist/index.css';
import { AllPosts, BackShadowEmoji, Title } from './style';
import { Cards } from '../../../../../components/cards/frame/cards-frame';
import { Button } from '../../../../../components/buttons/buttons';
import { likeUpdate, commentUpdate, postDelete } from '../../../../../redux/profile/actionCreator';

const dataImages = [
  {
    id: 1,
    image: require('../../../../../static/img/profile/post/506.png'),
  },
  {
    id: 2,
    image: require('../../../../../static/img/profile/post/907.png'),
  },
  {
    id: 3,
    image: require('../../../../../static/img/profile/post/brightland_3744.png'),
  },
  {
    id: 4,
    image: require('../../../../../static/img/profile/post/70.png'),
  },
  {
    id: 5,
    image: require('../../../../../static/img/profile/post/165.png'),
  },
];

function ExampleComment({ children, replay }) {
  return (
    <Comment
      actions={[
        <span className="com-like" key="comment-nested-reply-to">
          Like{' '}
        </span>,
        <span className="com-reply" key="comment-nested-reply-to">
          Reply{' '}
        </span>,
        <span className="com-time" key="comment-nested-reply-to">
          {moment(parseInt(replay.time, 10)).fromNow()}
        </span>,
      ]}
      author={<span>{replay.name}</span>}
      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
      content={<p>{replay.text}</p>}
    >
      {children}
    </Comment>
  );
}

ExampleComment.propTypes = {
  children: PropTypes.node,
  replay: PropTypes.object,
};

function Posts({ postId, from, time, img, like, comment, content, author }) {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => {
    return {
      posts: state.Profile.posts,
    };
  });

  const [state, setState] = useState({
    inputValue: '',
    fileList: [],
    fileList2: [],
  });

  const [pickerShow, setPickerShow] = useState(false);
  const [textValue, setTextValue] = useState('');

  const onEmojiClick = (event, emojiObject) => {
    setTextValue(textValue + emojiObject.emoji);
  };

  const onPickerShow = () => {
    setPickerShow(!pickerShow);
  };

  const onTextChange = (e) => {
    setTextValue(e.target.value);
  };

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    listType: 'picture-card',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
        setState({
          ...state,
          fileList: info.fileList,
        });
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const attachment = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
        setState({
          ...state,
          fileList2: info.fileList,
        });
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onLikeUpdate = (id) => {
    return dispatch(likeUpdate(posts, id));
  };

  const onCommentUpdate = (id) => {
    dispatch(commentUpdate(posts, id, textValue));
    setTextValue('');
  };

  const onPostDelete = (id) => {
    dispatch(postDelete(posts, id));
  };

  // State
  const [toggle, setToggle] = React.useState(false);
  const [sIndex, setSIndex] = React.useState(0);

  // Handler
  const lightBoxHandler = (status, value) => {
    setToggle(status);
    setSIndex(value);
  };

  return (
    <AllPosts>
      <Cards
        title={
          <Title>
            <img src={require(`../../../../../${author}`)} alt="" />
            <p>
              {from} <span>{moment(parseInt(time, 10)).fromNow()}</span>
            </p>
          </Title>
        }
        more={
          <>
            <Link onClick={() => onPostDelete(postId)} to="#">
              Delete
            </Link>
          </>
        }
      >
        <div className="post-content">
          <div className="gallery">
            {img.length ? (
              <>
                <Masonry
                  breakpointCols={img.length <= 2 ? img.length : 2}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {img.map((src, key) => {
                    return (
                      key <= 1 && (
                        <Link
                          key={key + 1}
                          onClick={() => {
                            lightBoxHandler(true, key);
                          }}
                        >
                          <img key={key + 1} style={{ width: '100%' }} src={require(`../../../../../${src}`)} alt="" />
                        </Link>
                      )
                    );
                  })}
                </Masonry>
                {img.length > 2 && (
                  <Masonry
                    breakpointCols={img.length <= 2 ? img.length : 3}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  >
                    {img.map((src, key) => {
                      return (
                        key > 1 && (
                          <Link
                            key={key + 1}
                            onClick={() => {
                              lightBoxHandler(true, key);
                            }}
                          >
                            <img
                              key={key + 1}
                              style={{ width: '100%' }}
                              src={require(`../../../../../${src}`)}
                              alt=""
                            />
                          </Link>
                        )
                      );
                    })}
                  </Masonry>
                )}
              </>
            ) : null}
          </div>

          <LightBox
            state={toggle}
            event={lightBoxHandler}
            data={dataImages}
            imageWidth="600px"
            imageHeight="500px"
            thumbnailHeight={50}
            thumbnailWidth={50}
            setImageIndex={setSIndex}
            imageIndex={sIndex}
          />
          <div className="post-text">
            <p>{content}</p>
          </div>
          <div className="post-actions">
            <span>
              <Link onClick={() => onLikeUpdate(postId)} to="#">
                <UilThumbsUp />
              </Link>
              {like}
            </span>
            <span>
              <Link to="#">
                <UilCommentAlt />
              </Link>
              {comment.length}
            </span>

            <Link to="#">
              <UilShareAlt />
              Share
            </Link>
          </div>

          <div className="post-comments">
            <div className="commentArea">
              <div className="comment-form">
                <img src={require('../../../../../static/img/chat-author/t2.jpg')} alt="" />
                <Input.TextArea onChange={onTextChange} value={textValue} placeholder="Write comment...." />
                <div className="chatbox-reply-action d-flex">
                  <span className="smile-icon">
                    {pickerShow && (
                      <>
                        <BackShadowEmoji onClick={() => setPickerShow(false)} />
                      </>
                    )}
                    <Link onClick={onPickerShow} to="#">
                      <UilSmile />
                    </Link>
                  </span>

                  <Link to="#">
                    <Upload {...props}>
                      <UilImage />
                    </Upload>
                  </Link>
                  <Link to="#">
                    <Upload {...attachment}>
                      <UilPaperclip />
                    </Upload>
                  </Link>
                </div>
              </div>
              <Button
                onClick={() => (textValue === '' ? alert('Please input your comment...') : onCommentUpdate(postId))}
                type="primary"
                className="btn-send"
              >
                <UilMessage />
              </Button>
            </div>
          </div>
          {comment.length ? (
            <div className="commentReplay">
              <ExampleComment
                replay={{
                  time: comment[0].time,
                  name: comment[0].from,
                  text: comment[0].text,
                }}
              >
                {comment.length > 1
                  ? comment.map((item, key) => {
                      return (
                        key >= 1 && (
                          <ExampleComment
                            replay={{
                              time: item.time,
                              name: item.name,
                              text: item.text,
                            }}
                          />
                        )
                      );
                    })
                  : null}
              </ExampleComment>
            </div>
          ) : null}
        </div>
      </Cards>
    </AllPosts>
  );
}

Posts.propTypes = {
  postId: PropTypes.number,
  from: PropTypes.string,
  time: PropTypes.string,
  img: PropTypes.array,
  like: PropTypes.number,
  comment: PropTypes.array,
  content: PropTypes.string,
  author: PropTypes.string,
};

export default Posts;
