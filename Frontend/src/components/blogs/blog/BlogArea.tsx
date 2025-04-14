import React from 'react';

interface BlogAreaProps {
  style_1: boolean;
}

const BlogArea: React.FC<BlogAreaProps> = ({ style_1 }) => {
  return (
    <div className={`blog-area ${style_1 ? 'style-1' : ''}`}>
      <h2>Articles récents</h2>
      {/* Ton contenu de blog ici */}
      <div className="blog-post">
        <h3>Article 1</h3>
        <p>Contenu de l'article 1</p>
      </div>
      <div className="blog-post">
        <h3>Article 2</h3>
        <p>Contenu de l'article 2</p>
      </div>
    </div>
  );
};

export default BlogArea;
