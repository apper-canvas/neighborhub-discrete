const PostMedia = ({ mediaUrls }) => {
  if (!mediaUrls || mediaUrls.length === 0) return null

  return (
    <div className="mb-4 grid grid-cols-2 gap-2">
      {mediaUrls.slice(0, 4).map((mediaUrl, idx) => (
        <img
          key={idx}
          src={mediaUrl}
          alt=""
          className="w-full h-48 object-cover rounded-lg"
        />
      ))}
    </div>
  )
}

export default PostMedia