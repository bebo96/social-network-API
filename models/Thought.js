const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reaction: {
        type: String,
        required: true,
        maxLength: 280 
      },
      username: {
          type: String, 
          required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },

    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );
  

const ThoughtSchema = new Schema(
  {
    // set custom id to avoid confusion with parent _id
    thoughtText: {
      type: String,
      required: true, 
      maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String, 
        required: true
    },
    reactions: [ReactionSchema]
    },
    {
    toJSON: {
      getters: true
    },
    id:false
  }
);

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
