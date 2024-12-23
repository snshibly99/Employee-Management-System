const CommentSection = ({ announcementId, comments, addComment }) => {
    const [comment, setComment] = useState('');
  
    const handleAddComment = (e) => {
      e.preventDefault();
      addComment(announcementId, comment);
      setComment('');
    };
  
    return (
      <div className="mt-4">
        <h4 className="font-medium text-gray-800">Comments</h4>
        <div className="space-y-2 mt-2">
          {comments.map((c, index) => (
            <p key={index} className="text-gray-600">
              - {c}
            </p>
          ))}
        </div>
        <form onSubmit={handleAddComment} className="flex mt-4 gap-2">
          <input
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Comment
          </button>
        </form>
      </div>
    );
  };
  