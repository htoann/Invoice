import UilFile from '@iconscout/react-unicons/icons/uil-file-alt';
import UilHeart from '@iconscout/react-unicons/icons/uil-heart-sign';
import propTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogCardStyleWrap } from './Style';

const BlogCard = ({
  item = {
    id: 1,
    title: 'Technology Change the World',
    content: 'Lorem Ipsum is simply dummy text of the printer took a galley of type and scrambled',
    category: 'Web Development',
    img: '1.png',
    author: 'Machel Bold',
    authorImg: '1.png',
    postDate: '15 March 2021',
    favouriteBy: '15k',
    viewedBy: '20k',
  },
  theme,
}) => {
  const { content, title, img } = item;
  return (
    <BlogCardStyleWrap>
      <figure className={`invoice-blog invoice-blog-${theme}`}>
        <div className="invoice-blog-thumb">
          <img className="invoice-blog__image" src={require(`../../static/img/blogs/${img}`)} alt="invoice Blog" />
        </div>
        <figcaption>
          {theme === 'style-1' ? (
            <div className="invoice-blog-meta invoice-blog-meta-theme-1">
              <span className="invoice-blog-meta__single invoice-date-meta">01 July 2020</span>
            </div>
          ) : theme === 'style-2' ? (
            <div className="invoice-blog-meta invoice-blog-meta-theme-2">
              <span className="invoice-blog-meta__single invoice-category-meta">Web Development</span>
              <span className="invoice-blog-meta__single invoice-date-meta">01 July 2020</span>
            </div>
          ) : theme === 'style-3' ? (
            <div className="invoice-blog-meta invoice-blog-meta-theme-3">
              <span className="invoice-blog-meta__single invoice-date-meta">01 July 2020</span>
              <span className="invoice-blog-meta__single invoice-category-meta">Web Development</span>
              <span className="invoice-blog-meta__single invoice-time-meta">6 mins read</span>
            </div>
          ) : (
            ''
          )}
          <h2 className="invoice-blog__title">
            <Link to="#">{title}</Link>
          </h2>
          <p className="invoice-blog__text">{content}</p>
          <div className="invoice-blog__bottom">
            <div className="invoice-blog__author">
              <img className="invoice-blog__author-img" src={require('../../static/img/chat-author/t1.jpg')} alt="" />
              <span className="invoice-blog__author-name">Burns Marks</span>
            </div>
            <ul className="invoice-blog__meta">
              <li className="invoice-blog__meta--item">
                <span className="like">
                  <UilHeart />
                  <span>70</span>
                </span>
              </li>
              <li className="invoice-blog__meta--item">
                <span className="view">
                  <UilFile />
                  <span>120</span>
                </span>
              </li>
            </ul>
          </div>
        </figcaption>
      </figure>
    </BlogCardStyleWrap>
  );
};

BlogCard.propTypes = {
  item: propTypes.object,
  theme: propTypes.string,
};

export default BlogCard;
