/* eslint-disable react/prop-types */
export default function Post({ post, children }) {
  return (
    <div className="w-full bg-indigo-700 shadow-lg rounded-lg shadow-lg p-5 overflow-hidden hover:overflow-auto">
      <div className="flex w-full justify-between items-center text-sm font-bold">
        <p className="uppercase text-green-400 tracking-widest">{new Date(post.createdAt).toLocaleDateString()}</p>
        <div>{children}</div>
      </div>
      <h3 className="text-2xl font-extrabold text-indigo-50 leading-snug mb-2">
        {post.title}
      </h3>
      <p className="text-indigo-200">{post.body}</p>
    </div>
  );
}
