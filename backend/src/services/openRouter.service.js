const axios = require('axios');

const Askai = async (messages) => {
    try {
        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            throw new Error('Messages must be a non-empty array');
        }

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions', 
            {
                model: 'openai/gpt-4o-mini',
                messages: messages
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                 
                    'HTTP-Referer': 'https://github.com/ItsTechUtsav/Aira.AI', 
                    'X-Title': 'Aira.AI' 
                },
            }
        );

        const content = response?.data?.choices?.[0]?.message?.content;
        if (!content) {
            throw new Error('No content received from AI');
        }

        return content;

    } catch (error) {

        console.error('Error asking AI:', error?.response?.data || error.message);
        throw new Error('open router error');
    }
};

module.exports = { Askai };