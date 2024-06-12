const express = require('express');
const cors = require('cors')
require('dotenv').config();
const { sendMessage } = require("./messageHelper");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, multipart: true }));

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  }

app.use(cors(corsOptions))

app.post('/', async (req, res) => {
    try {
        const response = await sendMessage(process.env.RECIPIENT_WAID, "This is an automated response from Impact Weaver");
        res.status(200).send(response);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send(error);
    }
});

app.get('/', (req, res) => {
    res.send("This is a Chatbot application")
})

app.get('/webhook', (req, res) => {
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
    console.log(VERIFY_TOKEN)
    const mode = req.query['hub.mode'];
    console.log(mode)
    const token = req.query['hub.verify_token'];
    console.log(token)
    const challenge = req.query['hub.challenge'];
    console.log(challenge)

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

app.post('/webhook', async (req, res) => {
    const body = req.body;
    console.log(JSON.stringify(body))
    if (body.object === 'whatsapp_business_account') {
        body.entry.forEach(async (entry) => {
            const changes = entry.changes;
            changes.forEach(async (change) => {
                if (change.value.messages) {
                    const messages = change.value.messages;
                    for (const message of messages) {
                        if (message.type === 'text') {
                            const from = message.from;
                            const text = message.text.body;

                            // You can process the received message and send a response
                            await sendMessage(from, "This is an automated response from Impact Weaver");

                            console.log(`Received message: ${text} from: ${from}`);
                        }
                    }
                }
            });
        });

        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is listening on PORT:${process.env.PORT || 3000}`);
});
