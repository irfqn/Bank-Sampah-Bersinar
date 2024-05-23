/* eslint-disable react/prop-types */
// ArticleDetail.jsx

// eslint-disable-next-line no-unused-vars
import React from "react";

const ArticleDetail = ({ article }) => {
  return (
    <div className="article-detail">
      <img src={article.picture} alt={article.title} />
      <h2>{article.title}</h2>
      <p>{article.article}</p>
    </div>
  );
};

export default ArticleDetail;
