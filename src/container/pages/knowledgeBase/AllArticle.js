import React, { useState } from 'react';
import { Collapse } from 'antd';
import { Link } from 'react-router-dom';
import GeneralKnowledgeTop from './overview/GeneralKnowledgeTop';
import { KnowledgebaseArticleWrap, ArticleListWrap, CtaWrap } from './style';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Button } from '../../../components/buttons/buttons';
import { Main } from '../../styled';

const { Panel } = Collapse;
function AllArticle() {
  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'All Article',
    },
  ];
  const [state, setstate] = useState({
    key: 0,
  });
  const callback = (key) => {
    setstate({ ...state, key });
  };
  return (
    <>
      <PageHeader className="invoice-page-header-main" title="All Article" routes={PageRoutes} />
      <Main>
        <GeneralKnowledgeTop />
        <KnowledgebaseArticleWrap>
          <div className="knowledgebase-article-container theme-2">
            <div className="invoice-paginaion">
              <ul>
                <li>
                  <Link className="active" to="/knowledgebase/plugins">
                    Doc Home
                  </Link>
                </li>
                <li>
                  <span>Plugins</span>
                </li>
              </ul>
            </div>
            <ArticleListWrap>
              <div className="invoice-articlelist">
                <div className="invoice-articlelist__single">
                  <div className="invoice-articlelist__single--left">
                    <h2 className="invoice-article-category-title">Introduction to Plugin</h2>
                  </div>
                  <div className="invoice-articlelist__single--right">
                    <div className="invoice-article-category-links">
                      <ul>
                        <li>
                          <Link to="/knowledgebaseSingle/1">
                            Log in and out of plugins view your success and other stats
                          </Link>
                        </li>
                        <li>
                          <Link to="/knowledgebaseSingle/1">Log in and out of Plugins</Link>
                        </li>
                        <li>
                          <Link to="/knowledgebaseSingle/1">Switch between accounts</Link>
                        </li>
                        <li>
                          <Collapse onChange={callback}>
                            <Panel header={<Link to="#">Switch between accounts</Link>} key="1">
                              <ul>
                                <li>
                                  <Link to="#">Log in and out of Plugins</Link>
                                </li>
                                <li>
                                  <Link to="#">Change your email</Link>
                                </li>
                                <li>
                                  <Link to="#">Reactivate your account</Link>
                                </li>
                                <li>
                                  <Link to="#">Change your email</Link>
                                </li>
                              </ul>
                            </Panel>
                          </Collapse>
                        </li>
                        <li>
                          <Link to="/knowledgebaseSingle/1">Switch between accounts</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="invoice-articlelist__single">
                  <div className="invoice-articlelist__single--left">
                    <h2 className="invoice-article-category-title">Productivity tools for your Plugin admin</h2>
                  </div>
                  <div className="invoice-articlelist__single--right">
                    <div className="invoice-article-category-links">
                      <ul>
                        <li>
                          <Link to="/knowledgebaseSingle/1">
                            Log in and out of plugins view your success and other stats
                          </Link>
                        </li>
                        <li>
                          <Link to="/knowledgebaseSingle/1">Log in and out of Plugins</Link>
                        </li>
                        <li>
                          <Link to="/knowledgebaseSingle/1">Switch between accounts</Link>
                        </li>
                        <li>
                          <Collapse onChange={callback}>
                            <Panel header={<Link to="#">Switch between accounts</Link>} key="1">
                              <ul>
                                <li>
                                  <Link to="#">Log in and out of Plugins</Link>
                                </li>
                                <li>
                                  <Link to="#">Change your email</Link>
                                </li>
                                <li>
                                  <Link to="#">Reactivate your account</Link>
                                </li>
                                <li>
                                  <Link to="#">Change your email</Link>
                                </li>
                              </ul>
                            </Panel>
                          </Collapse>
                        </li>
                        <li>
                          <Link to="/knowledgebaseSingle/1">Switch between accounts</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="invoice-articlelist__single">
                  <div className="invoice-articlelist__single--left">
                    <h2 className="invoice-article-category-title">Manage your account</h2>
                  </div>
                  <div className="invoice-articlelist__single--right">
                    <div className="invoice-article-category-links">
                      <ul>
                        <li>
                          <Link to="/knowledgebaseSingle/1">
                            Log in and out of plugins view your success and other stats
                          </Link>
                        </li>
                        <li>
                          <Link to="/knowledgebaseSingle/1">Log in and out of Plugins</Link>
                        </li>
                        <li>
                          <Link to="/knowledgebaseSingle/1">Switch between accounts</Link>
                        </li>
                        <li>
                          <Collapse onChange={callback}>
                            <Panel header={<Link to="#">Switch between accounts</Link>} key="1">
                              <ul>
                                <li>
                                  <Link to="#">Log in and out of Plugins</Link>
                                </li>
                                <li>
                                  <Link to="#">Change your email</Link>
                                </li>
                                <li>
                                  <Link to="#">Reactivate your account</Link>
                                </li>
                                <li>
                                  <Link to="#">Change your email</Link>
                                </li>
                              </ul>
                            </Panel>
                          </Collapse>
                        </li>
                        <li>
                          <Link to="/knowledgebaseSingle/1">Switch between accounts</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="invoice-articlelist__single">
                  <div className="invoice-articlelist__single--left">
                    <h2 className="invoice-article-category-title">Manage your account</h2>
                  </div>
                  <div className="invoice-articlelist__single--right">
                    <div className="invoice-article-category-links">
                      <ul>
                        <li>
                          <Link to="/knowledgebaseSingle/1">
                            Log in and out of plugins view your success and other stats
                          </Link>
                        </li>
                        <li>
                          <Link to="/knowledgebaseSingle/1">Log in and out of Plugins</Link>
                        </li>
                        <li>
                          <Link to="/knowledgebaseSingle/1">Switch between accounts</Link>
                        </li>
                        <li>
                          <Collapse onChange={callback}>
                            <Panel header={<Link to="#">Switch between accounts</Link>} key="1">
                              <ul>
                                <li>
                                  <Link to="#">Log in and out of Plugins</Link>
                                </li>
                                <li>
                                  <Link to="#">Change your email</Link>
                                </li>
                                <li>
                                  <Link to="#">Reactivate your account</Link>
                                </li>
                                <li>
                                  <Link to="#">Change your email</Link>
                                </li>
                              </ul>
                            </Panel>
                          </Collapse>
                        </li>
                        <li>
                          <Link to="/knowledgebaseSingle/1">Switch between accounts</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <CtaWrap>
                <div className="invoice-knowledgebase-cta">
                  <h2 className="invoice-knowledgebase-cta__title">Still no luck? We can help!</h2>
                  <p>Contact us and we’ll get back to you as soon as possible.</p>
                  <Button className="btn-rqSubmit" type="primary" size="large">
                    Submit a Request
                  </Button>
                </div>
              </CtaWrap>
            </ArticleListWrap>
          </div>
        </KnowledgebaseArticleWrap>
      </Main>
    </>
  );
}

export default AllArticle;
