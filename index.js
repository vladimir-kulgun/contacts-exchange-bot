const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');

dotenv.config();

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

const mainMenu = 'Главная';
const createMeeting = 'Создать встречу';
const listMeetings = 'Мои встречи';
const about = 'О программе';

bot.on('text', async msg => {
    try {
        const chatId = msg.chat.id;
        const text = msg.text;

        if(text.startsWith('/start')) {
            const options = [createMeeting, listMeetings, about].map(o =>
                [{ text: o, callback_data: o }]
            );
            await bot.sendMessage(chatId, mainMenu, {
                reply_markup: {
                    inline_keyboard: options,
                    resize_keyboard: true
                }
            })
        }
    }
    catch(error) {
        console.log(error);
    }
})

bot.on('callback_query', async (callbackQuery) => {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    const chatId = msg.chat.id;

    if (action === mainMenu) {
        const options = [createMeeting, listMeetings, about].map(o =>
            [{ text: o, callback_data: o }]
        );
        await bot.sendMessage(chatId, mainMenu, {
            reply_markup: {
                inline_keyboard: options,
                resize_keyboard: true
            }
        })
    }
    else if (action === createMeeting) {
        const options = [mainMenu].map(o =>
            [{ text: o, callback_data: o }]
        );
        await bot.sendMessage(chatId, createMeeting, {
            reply_markup: {
                inline_keyboard: options,
                resize_keyboard: true,
            }
        })
    }
    else if (action === listMeetings) {
        const options = [mainMenu].map(o =>
            [{ text: o, callback_data: o }]
        );
        await bot.sendMessage(chatId, listMeetings, {
            reply_markup: {
                inline_keyboard: options,
                resize_keyboard: true,
            }
        })
    }
    else if (action === about) {
        const options = [mainMenu].map(o =>
            [{ text: o, callback_data: o }]
        );
        await bot.sendMessage(chatId, about, {
            reply_markup: {
                inline_keyboard: options,
                resize_keyboard: true,
            }
        })
    }
});
