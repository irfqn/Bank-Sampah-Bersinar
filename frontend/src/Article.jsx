/* eslint-disable react/prop-types */
// ArticleDetail.jsx

// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Article.css"

const ArticleDetail = ({ article }) => {
  return (
    <div className="article-detail">
      <img src={article.picture} alt={article.title} />
      <h2>{article.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: article.article }}></div>
    </div>
  );
};

export default ArticleDetail;
