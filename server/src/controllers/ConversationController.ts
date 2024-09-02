import { Request, Response } from "express";
import { Conversation, Message } from "../models/ConversationModel";
import { GoogleGenerativeAI } from "@google/generative-ai";


interface CustomRequest extends Request {
    id?: string;
  }


//get conversation  
export const getConversation = async (req: CustomRequest, res: Response) => {
    const userId = req.id;
    try {
        const userConversations = await Conversation.find({
            participants: userId
        }).sort({ updatedAt: -1 }).populate('messages');

        const conversations = userConversations.map((conv) => ({
            _id: conv._id,
            messages: conv.messages || [],
            createdAt: conv.createdAt,
            titleMsg: conv.messages[0] || null
        }));

        return res.status(200).json({ conversations, success:true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error", error: true });
    }
};

//new message
export const newMessage = async (req: Request, res: Response) => {
    const {
        conversationId,
        sender,
        recipient,
        message,
        userId
    } = req.body;

    try {
        let conversation = await Conversation.findById(conversationId).populate('messages');
        if (message&&!conversation) {
            const createConversation = new Conversation({
                participants: [userId,process.env.BOT_ID],
                messages: []
            });
            conversation = await createConversation.save();
        }
        if (message) {
            const newMessage = new Message({
                content:message,
                sender: sender  ,
                recipient:recipient
            });
            await newMessage.save();  
           if (conversation) {
        conversation.messages.push(newMessage._id);
        await conversation.save();
    };
        }

        res.status(200).json(conversation);
    }  catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server Error", error: true });
    }
};


//ai Response
export const ai = async (req: Request, res: Response) => {
    const genAI = new GoogleGenerativeAI(process.env.API_key_GEMINI!);
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    if(!req.body.prompt){
throw new Error
    ('No prompt provided. Please provide a prompt.');

    }
    const prompt = req.body.prompt  ;

    const result = await model.generateContentStream(prompt);

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        res.write(`data: ${JSON.stringify({ text: chunkText })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error:unknown) {
    console.error('Error:', error);
    res.status(500).json('An error occurred' );
  }
};

 
