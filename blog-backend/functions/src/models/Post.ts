import { Schema, model, Model } from 'mongoose';

interface PostModel extends Model<any> {
  getLastPostId(): number;
}

const post = new Schema({
  id: Number,
  title: String,
  body: String,
  createdAt: Date,
});

post.statics.getLastPostId = async function() {
  const lastPost = await this.findOne(
    {},
    {},
    {
      sort: {
        createdAt: -1,
      },
    }
  );

  return lastPost ? lastPost.id : 0;
};

export const Post: PostModel = model<any, PostModel>('Post', post);

export default Post;
