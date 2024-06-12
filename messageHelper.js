var axios = require('axios');

async function sendMessage(to, body) {

    try {
      const response = await axios.post(`https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`, {
        messaging_product: "whatsapp",
        preview_url: false,
        recipient_type: "individual",
        to: to,
        type: "text",
        // template: {
        //   name: "Welcome to the demo nodejs whatsapp chat",
        //   language: {
        //     code: "en_US"
        //   }
        // }
        text:{
          body: body
        }
      }, {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          "User-Agent": "axios/1.7.2"
        }
      });
      console.log('Response:', response.data);
      return response.data
    } catch (error) {
      if (error.response) {
        console.log('Error data:', error.response.data);
      } else {
        console.log('Error:', error.message);
      }
    }
}

module.exports = {
  sendMessage: sendMessage,
};
