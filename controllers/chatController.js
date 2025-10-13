const User = require('../model/chatbotuserdetails');
const Conversation = require('../model/conversation');
const chatService = require('../services/chatService');

// Start new chat
async function startChat(req, res) {
    try {
        const userId = await User.createUser({ name: '', email: '', phone: '' });
        const conversationId = await Conversation.createConversation(userId);

        res.json({
            conversationId, // frontend needs this
            message: 'Please could you provide your name.'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to start chat' });
    }
}

// Send user message
async function sendMessage(req, res) {
    const { userId, message } = req.body;

    if (!userId || !message) {
        return res.status(400).json({ error: 'userId and message required' });
    }

    try {
        const reply = await chatService.handleUserMessage(userId, message);
        // reply is { messages: [...] }
        res.json({ message: reply.messages });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
}

module.exports = {
    startChat,
    sendMessage
};
