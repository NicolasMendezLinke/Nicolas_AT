import React, { useEffect, useState } from 'react';
import { FaTh, FaList } from "react-icons/fa";
import FetchData from './API/FetchData/FetchData';
import './styles.css';
import User from './components/User/User';
import Post from './components/Post/Post';
import Comment from './components/Comment/Comment';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedPosts, setSelectedPosts] = useState(null);
  const [isGridView, setIsGridView] = useState(true);

  useEffect(() => {
    const fetchDados = async () => {
      const users = await FetchData.fetchUsers();
      setUsers(users);
      const posts = await FetchData.fetchPosts(users[0]?.id);
      setPosts(posts);
    };
    fetchDados();
  }, []);

  const handleUserClick = async (userId) => {
    setSelectedUser(userId);
    const userPosts = await FetchData.fetchPosts(userId);
    setPosts(userPosts);
  };

  const handlePostClick = async (postId) => {
    setSelectedPosts(postId);
    const postComments = await FetchData.fetchComments(postId);
    setComments(postComments);
  };

  const toggleLayout = () => {
    setIsGridView(!isGridView);
  };

  const handleDeleteComment = (commentId) => {
    const confirmed = window.confirm('Tem certeza que deseja excluir?');
    if (confirmed) {
      setComments(comments.filter(comment => comment.id !== commentId));
    }
  };

  return (
    <div className="App">
      <header>
        <h1 className="chat-arq">Chat Archive</h1>
      </header>
      <main>
        <button className="toggle-layout-btn" onClick={toggleLayout}>
          {isGridView ? <FaList /> : <FaTh />}
          {isGridView ? "Alternar para lista" : "Alternar para grade"}
        </button>
        {selectedPosts ? (
          <>
            <button className="btn-back" onClick={() => setSelectedPosts(null)}>
              Voltar
            </button>
            <div className="comments-grid">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  name={comment.name}
                  email={comment.email}
                  body={comment.body}
                  onDelete={() => handleDeleteComment(comment.id)}
                />
              ))}
            </div>
          </>
        ) : selectedUser ? (
          <>
            <button className="btn-back" onClick={() => setSelectedUser(null)}>
              Voltar
            </button>
            <div className={isGridView ? "post-grid" : "post-list"}>
              {posts.map((post) => (
                <Post
                  key={post.id}
                  title={post.title}
                  body={post.body}
                  onClick={() => handlePostClick(post.id)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className={isGridView ? "user-grid" : "user-list"}>
            {users.map((user) => (
              <User
                key={user.id}
                name={user.name}
                catchPhrase={user.company.catchPhrase}
                onClick={() => handleUserClick(user.id)}
              />
            ))}
          </div>
        )}
      </main>
      <footer>
        <p>Nicolas Mendez Martins - AT - Fundamentos de React</p>
      </footer>
    </div>
  );
}

export default App;
