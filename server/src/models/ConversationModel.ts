import mongoose from "mongoose";

const MessageSchema=new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,  
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,  
    }
    ,
    content: {
        type: String,
        required: true,
    
    },

    
},{
    timestamps: true,
})

const ConversationSchema=new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,  
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        required: true,
    }],
})

const Conversation=mongoose.model('Conversation',ConversationSchema)
const Message=mongoose.model('Message',MessageSchema)
export{
    Conversation,
    Message,
 
}