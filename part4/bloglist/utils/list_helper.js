const lodash = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sum, post) => sum + post.likes, 0);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const mostBlogsCounter = lodash.countBy(blogs, "author");

  const mostAuthor = Object.keys(mostBlogsCounter).reduce((a, b) => {
    return mostBlogsCounter[a] > mostBlogsCounter[b] ? a : b;
  });

  return {
    author: mostAuthor,
    blogs: mostBlogsCounter[mostAuthor],
  };
};

const favoriteBlog = (blogs) => {
    const mostLiked = blogs.reduce((previous, current) => {
        return previous.likes > current.likes ? previous : current;
      });
    
      return {
        title: mostLiked.title,
        author: mostLiked.author,
        likes: mostLiked.likes,
      };
}

const mostLikes = (blogs) => { 
  

  const likesCount = lodash(blogs)
    .groupBy("author")
    .map((objects, key) => ({
      author: key,
      likes: lodash.sumBy(objects, "likes"),
    }))
    .value();

  return likesCount.reduce((a, b) => {
    return a.likes > b.likes ? a : b;
  })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes 
};
