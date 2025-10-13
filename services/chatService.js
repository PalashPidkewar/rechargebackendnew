const User = require('../model/chatbotuserdetails');
const Conversation = require('../model/conversation');

async function handleUserMessage(userId, message) {
    let convo = await Conversation.getConversationByUser(userId);

    if (!convo) {
        // New conversation
        const convId = await Conversation.createConversation(userId);
        convo = {
            id: convId,
            user_id: userId,
            step: 1,
            last_message: '',
        };
    }

    const userMessage = message.trim();

    switch (convo.step) {
        case 1:
            // Expecting name
            await User.updateUser(userId, { name: userMessage });
            await Conversation.updateConversation(convo.id, { step: 2, last_message: userMessage });
            return { messages: [`Hi ${userMessage}! Please provide your email id.`] };

        case 2:
            // Expecting email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(userMessage)) {
                return { messages: ['Please provide a valid email address.'] };
            }
            await User.updateUser(userId, { email: userMessage });
            await Conversation.updateConversation(convo.id, { step: 3, last_message: userMessage });
            const userName = (await User.getUserById(userId)).name;
            return { messages: [`Thank you ${userName} for sharing your email. Please provide your 10-digit contact number.`] };

        case 3:
            // Expecting phone
            const digits = userMessage.replace(/\D/g, '');
            if (digits.length !== 10) {
                return { messages: ['Seems like an incorrect number. Please provide a 10-digit number.'] };
            }
            await User.updateUser(userId, { phone: digits });
            await Conversation.updateConversation(convo.id, { step: 4, last_message: userMessage });
            return { messages: [
                `Thank you ${digits} for sharing your contact number.`,
                'Hello! How may I help you today?',
                'Choose an option:\n a. Path Recharge Locations\n b. Lease Details for Path Recharge\n c. What We Offer (Solutions)\n d. Path Recharge Social Media & Contact\n e. Other Businesses'
            ]};

        case 4:
            // Options a-e
            let reply = '';
            let file = '';
            const opt = userMessage.toLowerCase();

            
            if (['a', 'path recharge locations'].includes(opt)) {
                reply = `You selected <a href="https://www.google.com/maps/d/u/0/embed?mid=1QJ-NmazxDkAN89b56TnYBnnrEl--nLI" class="text-blue-600 underline" target="_blank" rel="noopener noreferrer">Path Recharge Location SiteMap </a>`;
                file = 'path-recharge.pdf';
            }  else if (['b', 'lease details for path recharge'].includes(opt)) {
                reply = `Email: anjul@pathltd.com \nContact: 07324-350-100`;
                file = 'path-recharge.pdf';
            } else if (['c', 'what we offer (solutions)'].includes(opt)) {
                reply = `Fuel Pump\n Food Court\n EV Stations\n Child Play Area\n Parking\n Vehicle Repairing\n Medical Room\n Restroom\n Washroom`;
                file = 'path-recharge.pdf';
            }else if (['d', 'path recharge social media & contact'].includes(opt)) {
  reply = `
  Follow us on:<br>

  <span style="display:inline-flex;align-items:center;gap:4px">
    <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" width="16" height="16" style="vertical-align:middle;filter:invert(43%) sepia(87%) saturate(4042%) hue-rotate(320deg) brightness(99%) contrast(101%)"/>
    <a href="https://www.instagram.com/path_india/?hl=en" target="_blank" class="text-blue-600 underline">Instagram</a>
  </span><br>

  <span style="display:inline-flex;align-items:center;gap:4px">
    <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" width="16" height="16" style="vertical-align:middle;filter:invert(31%) sepia(60%) saturate(3591%) hue-rotate(191deg) brightness(95%) contrast(97%)"/>
    <a href="https://www.linkedin.com/company/path-india-ltd-/?originalSubdomain=in" target="_blank" class="text-blue-600 underline">LinkedIn</a>
  </span><br>

  <span style="display:inline-flex;align-items:center;gap:4px">
  <img
    src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg"
    width="16"
    height="16"
    style="vertical-align:middle; filter: invert(8%) sepia(88%) saturate(7475%) hue-rotate(352deg) brightness(96%) contrast(101%);"
  />
  <a
    href="https://www.youtube.com/@Path_Recharge"
    target="_blank"
    rel="noopener noreferrer"
    class="text-blue-600 underline"
  >
    YouTube
  </a>
</span>
<br>


  Contact: +91 7324-350100 \n 8839968009 \n 8827753128 \n 7771879777
  `;
  file = 'path-recharge.pdf';
}

            
            
            else if (['e', 'other businesses'].includes(opt)) {
                reply = `Other Businesses:\n Path Highways\n Path Logistic\n Path Recharge\n Path Crash Barriers\n Path GFRP Rebars\n Path Thermoplastic Paints \n Path Foundation`;
                file = 'Path Other Business.pdf';
            } else {
                await Conversation.updateConversation(convo.id, { last_message: userMessage });
                return { messages: ['Sorry, I did not understand. Please choose a, b, c, d, or e.'] };
            }

            await Conversation.updateConversation(convo.id, { step: 5, last_message: userMessage });

            return { messages: [
                reply,
                `📄 [Download Brochure](http://localhost:5000/brochures/${file})`,
                '☎️ Sales & marketing number: 986532741'
            ]};

        case 5:
            return { messages: ['Thank you for contacting us!'] };

        default:
            return { messages: ['Thank you for contacting us!'] };
    }
}

module.exports = {
    handleUserMessage,
};



// else if (['d', 'path recharge social media & contact'].includes(opt)) {
//                 reply = `Follow us on:<br>
// <a href="https://www.instagram.com/path_india/?hl=en">Instagram</a><br>
// <a href="https://www.linkedin.com/company/path-india-ltd-/?originalSubdomain=in">LinkedIn</a><br>
// Contact: +91 7324-350100`;
//                 file = 'path-recharge.pdf';
//             }